import type { RequestInit } from "next/dist/server/web/spec-extension/request";
import { cookies } from "next/headers";
const BASE_URL = process.env.CMS_BASE_URL || "http://localhost:3000";

export const cmsClient = {
  // Public/anonymous-safe call. Attempts to forward the current user's
  // session cookies if one exists (so a logged-in admin viewing the site
  // can see draft/unpublished content per the collection's read access
  // rule) — but works fine with no cookies at all for scripts, cron jobs,
  // or genuinely logged-out visitors.
  get: async (path: string, options: RequestInit = {}) => {
    let cookieString = "";
    try {
      const cookieStore = await cookies();
      cookieString = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");
    } catch {
      // Not in a request-scoped context (standalone script, cron, etc.) —
      // proceed with no cookies. Public/published-only access still works.
    }

    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        ...options.headers,
        ...(cookieString ? { Cookie: cookieString } : {}),
      },
    });
    if (!res.ok) throw new Error(`CMS request failed: ${res.status}`);
    return res.json();
  },

  // Admin/service-level call using a stable API key — not tied to any
  // user's session, safe to call from scripts/cron/build steps.
  getAuthenticated: async (path: string) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        Authorization: `users API-Key ${process.env.PAYLOAD_API_KEY}`,
      },
    });
    if (!res.ok) throw new Error(`CMS request failed: ${res.status}`);
    return res.json();
  },
};
