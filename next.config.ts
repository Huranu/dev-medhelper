import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
    // Remove outputFileTracingIncludes and use this instead:
    outputFileTracingExports: {},
    turbo: {
      rules: {
        '*.node': {
          next: {
            // Ensure Prisma engine files are included
            require: ['@prisma/client', 'prisma']
          }
        }
      }
    }
  }
};

export default nextConfig;