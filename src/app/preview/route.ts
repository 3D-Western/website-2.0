import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// This is the /preview API route referenced by the Payload "preview" button
// (see the Blogs collection's admin.preview config). It authenticates the
// request, then enables Next.js draft mode and redirects to the actual
// page so editors can view unpublished/draft content on the live frontend.
export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  const previewSecret = searchParams.get("previewSecret");

  // Verify secret
  // Confirms the request actually came from Payload's preview link and not
  // some random person hitting this endpoint directly
  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response("You are not allowed to preview this page", {
      status: 403,
    });
  }

  if (!path) {
    return new Response("Insufficient search params", { status: 404 });
  }

  // Guard against open-redirect abuse: only allow relative paths
  // (e.g. "/blogs/my-post"), never a full external URL
  if (!path.startsWith("/")) {
    return new Response("This endpoint is only for relative previews", {
      status: 500,
    });
  }

  try {
    // Forward the incoming request's cookies to the CMS's "/api/users/me"
    // endpoint to check whether the person making this request is actually
    // logged into Payload (as opposed to just knowing the preview secret)
    const userRes = await fetch(`${process.env.CMS_BASE_URL}/api/users/me`, {
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
    });

    if (!userRes.ok) {
      return new Response("You are not allowed to preview this page.", {
        status: 403,
      });
    }

    const user = await userRes.json();
    // Payload's /users/me returns { user: null } (not a non-ok status) when
    // there's no authenticated session, so this checks the payload body
    // itself rather than relying solely on the HTTP status
    if (!user.user) {
      return new Response("You are not allowed to preview this page", {
        status: 403,
      });
    }
  } catch {
    // Covers network failures, CMS being down, JSON parse errors, etc.
    return new Response("Error verifying user", { status: 500 });
  }

  // Enable draft mode
  // Sets a cookie that tells Next.js to fetch draft/unpublished content
  // instead of only published content for subsequent requests
  const draft = await draftMode();
  draft.enable();

  // Redirect to preview
  redirect(path);
}
