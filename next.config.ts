import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {},
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  /*experimental: {
    serverComponentsExternalPackages: ["@aws-sdk/client-lambda"],
  },*/
};

export default nextConfig;
