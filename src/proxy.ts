import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Runs before a request is completed
// Used to redirect from the admin route if CMS is disabled to avoid errors relating to payload
export function proxy(request: NextRequest) {
  if (
    process.env.CMS_ENABLED === "false" &&
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
