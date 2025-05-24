import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Required for Docker/Prisma deployment
  output: "standalone",
  
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Important for Prisma in standalone mode
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
    outputFileTracingIncludes: {
      // Ensure Prisma engine files are included in the standalone output
      "/*": ["./node_modules/prisma/libquery_engine-debian-openssl-3.0.x.so.node"],
      "/api/**": ["./node_modules/prisma/libquery_engine-debian-openssl-3.0.x.so.node"]
    },
  },
};

export default nextConfig;