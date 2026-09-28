// Initializes the MSW right before the app starts IF the CMS is disabled.
export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.CMS_ENABLED === "false"
  ) {
    // create server
    const { server } = await import("@/mocks/server");

    // listen server
    server.listen({ onUnhandledRequest: "bypass" });

    // success log
    console.log("✓ MSW enabled (CMS_ENABLED=false)");
    console.log("msw done", Date.now());
  }
}
