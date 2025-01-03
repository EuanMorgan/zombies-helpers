import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* We lint / typecheck in CI */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
