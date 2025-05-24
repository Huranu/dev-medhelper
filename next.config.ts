import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
    // Add only this for Prisma engine
    outputFileTracingIncludes: {
      '/*': ['./node_modules/prisma/libquery_engine-debian-openssl-3.0.x.so.node']
    }
  }
};

export default nextConfig;