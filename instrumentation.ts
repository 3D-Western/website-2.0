// instrumentation.ts
import type { MSWServer } from "@/mocks/server";

declare global {
  var __mswServer: MSWServer | undefined;
}
// Initializes the MSW right before the app starts IF the CMS is disabled.
export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NEXT_PUBLIC_CMS_ENABLED === "false"
  ) {
    // Guard against double-registration across dev-server reloads
    if (globalThis.__mswServer) {
      console.log("MSW already listening, skipping re-init");
      return;
    }
    // create server
    const { server } = await import("@/mocks/server");

    // listen server
    server.listen({ onUnhandledRequest: "bypass" });
    globalThis.__mswServer = server;

    // success log
    console.log("✓ MSW enabled (CMS_ENABLED=false)");
    console.log("msw done", Date.now());
  }
}
