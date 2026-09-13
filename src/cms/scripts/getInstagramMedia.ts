import { getPayload } from "payload";
import config from "@payload-config";

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN!; // long-lived token, ~60 day expiry
const API_VERSION = "v26.0";
const BASE_URL = `https://graph.instagram.com/${API_VERSION}`;

interface InstagramProfile {
  user_id: string;
  username: string;
  name?: string;
  account_type: "BUSINESS" | "MEDIA_CREATOR";
  profile_picture_url: string;
  followers_count: number;
  media_count: number;
}

// ---------------------------------------------------------------------------
// 1. Get the account's own profile info (username, avatar, follower count)
// ---------------------------------------------------------------------------
async function getProfile(): Promise<InstagramProfile> {
  const fields = [
    "user_id",
    "username",
    "name",
    "account_type",
    "profile_picture_url",
    "followers_count",
    "media_count",
  ].join(",");

  const url = `${BASE_URL}/me?fields=${fields}&access_token=${ACCESS_TOKEN}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch profile: ${res.status} ${await res.text()}`,
    );
  }

  return res.json();
}

interface MediaListResponse {
  data: { id: string }[];
  paging?: {
    cursors: { before: string; after: string };
    next?: string;
  };
}

// ---------------------------------------------------------------------------
// 2. Get the list of media IDs on the account
// ---------------------------------------------------------------------------
async function getMediaIds(limit = 10): Promise<string[]> {
  const url = `${BASE_URL}/me/media?fields=id&limit=${limit}&access_token=${ACCESS_TOKEN}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch media list: ${res.status} ${await res.text()}`,
    );
  }

  const json: MediaListResponse = await res.json();
  return json.data.map((item) => item.id);
}

interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

// ---------------------------------------------------------------------------
// 3. Get the actual fields you care about for each media object
// ---------------------------------------------------------------------------
async function getMediaDetails(mediaId: string): Promise<InstagramMedia> {
  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "permalink",
    "timestamp",
    "like_count",
    "comments_count",
  ].join(",");

  const url = `${BASE_URL}/${mediaId}?fields=${fields}&access_token=${ACCESS_TOKEN}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch media ${mediaId}: ${res.status} ${await res.text()}`,
    );
  }

  return res.json();
}

const payload = await getPayload({ config });

// Generic upsert type
interface UpsertOptions<TData extends Record<string, unknown>> {
  collection: string;
  matchField: string;
  matchValue: string | number;
  data: TData;
  file?: {
    data: Buffer;
    mimetype: string;
    name: string;
    size: number;
  };
  draft?: boolean;
  logLabel?: string;
}

async function upsert<TData extends Record<string, unknown>>({
  collection,
  matchField,
  matchValue,
  data,
  file,
  draft = false,
  logLabel = collection,
}: UpsertOptions<TData>): Promise<number> {
  const existing = await payload.find({
    collection: collection as any,
    where: { [matchField]: { equals: matchValue } },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    const updated = await payload.update({
      collection: collection as any,
      id: existing.docs[0].id,
      draft,
      ...(file && { file }),
      data: data as any,
    });
    console.log(`\tUpdated ${logLabel}:`, matchValue);
    return updated.id;
  }

  const created = await payload.create({
    collection: collection as any,
    ...(draft !== undefined && { draft }),
    ...(file && { file }),
    data: data as any,
  });
  console.log(`\tCreated ${logLabel}:`, matchValue);
  return created.id;
}

async function upsertAvatar(profile: InstagramProfile): Promise<number> {
  const avatarId = Number(profile.user_id);

  const res = await fetch(profile.profile_picture_url);
  if (!res.ok) {
    throw new Error(`Failed to download avatar: ${res.status}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());

  return upsert({
    collection: "avatars",
    draft: false,
    matchField: "author-name",
    matchValue: profile.username,
    logLabel: "avatar",
    file: {
      data: buffer,
      mimetype: res.headers.get("content-type") ?? "image/jpeg",
      name: `avatar-${profile.username}`,
      size: buffer.byteLength,
    },
    data: {
      id: avatarId,
      alt: profile.username,
      "author-name": profile.username,
    },
  });
}

async function upsertThumbnail(
  imageUrl: string,
  filename: string,
  mediaId: number,
): Promise<number> {
  const res = await fetch(imageUrl);
  if (!res.ok) {
    throw new Error(`Failed to download image: ${res.status}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());

  return upsert({
    collection: "instagram-thumbnails",
    matchField: "id",
    matchValue: mediaId,
    draft: false,
    logLabel: "thumbnail",
    file: {
      data: buffer,
      mimetype: res.headers.get("content-type") ?? "image/jpeg",
      name: filename,
      size: buffer.byteLength,
    },
    data: { id: mediaId, alt: filename },
  });
}

async function upsertPost(
  profile: InstagramProfile,
  post: InstagramMedia,
  avatarId: number,
) {
  const postId = Number(post.id);
  const thumbnailId = await upsertThumbnail(
    post.media_url,
    `ig-${postId}`,
    postId,
  );

  await upsert({
    collection: "instagram-posts",
    matchField: "id",
    matchValue: postId,
    draft: false,
    logLabel: "post",
    data: {
      id: postId,
      username: profile.username,
      caption: post.caption ?? "",
      likes: post.like_count ?? 0,
      permalink: post.permalink ?? "",
      postImage: thumbnailId,
      avatar: avatarId,
    },
  });
}

// Purge old posts, not in the new fetch
async function purgeStalePosts() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const stalePosts = await payload.find({
    collection: "instagram-posts",
    where: {
      updatedAt: { less_than: startOfToday.toISOString() },
    },
    limit: 0,
  });

  const staleThumbnails = await payload.find({
    collection: "instagram-thumbnails",
    where: {
      updatedAt: { less_than: startOfToday.toISOString() },
    },
    limit: 0,
  });

  for (const post of stalePosts.docs) {
    await payload.delete({
      collection: "instagram-posts",
      id: post.id,
    });

    console.log("\tRemoved post: ", post.id);
  }

  for (const thumbnail of staleThumbnails.docs) {
    await payload.delete({
      collection: "instagram-posts",
      id: thumbnail.id,
    });

    console.log("\tRemoved post: ", thumbnail.id);
  }
}

async function feedData(profile: InstagramProfile, posts: InstagramMedia[]) {
  const avatarId = await upsertAvatar(profile);
  for (const post of posts) {
    await upsertPost(profile, post, avatarId);
  }
}

// ---------------------------------------------------------------------------
// 4. Put it together: fetch from instagram and feed posts into payload
// ---------------------------------------------------------------------------
export async function syncInstagramPosts() {
  const profile = await getProfile();
  const mediaIds = await getMediaIds(10);

  const posts: InstagramMedia[] = [];
  for (const id of mediaIds) {
    const media = await getMediaDetails(id);
    posts.push(media);
  }

  // Shorten ids so payload can store
  let newProfile = {
    ...profile,
    user_id: profile.user_id.slice(0, 5),
  };
  let newPosts = posts.map((post) => ({
    ...post,
    id: post.id.slice(0, 5),
  }));

  feedData(newProfile, newPosts);
  purgeStalePosts();

  return { profile, posts };
}

async function test() {
  const { profile, posts } = await syncInstagramPosts();
  console.log(profile);
  console.log(posts);
}
