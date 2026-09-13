import { syncInstagramPosts } from "@/cms/scripts/getInstagramMedia";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { profile, posts } = await syncInstagramPosts();

  return NextResponse.json({
    updated: {
      postsLength: posts.length,
      profile: profile.username,
    },
  });
}
