import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* Fix for monorepo root detection issue blocking build - DISABLED for Vercel remote builds */
  // outputFileTracingRoot: path.join(__dirname, "../../"),
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
