import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
      remotePatterns: [new URL("https://www.example.com/**"), new URL("https://cdn.cruxplanner.ca/**")],
  }
};

export default withPayload(nextConfig);
