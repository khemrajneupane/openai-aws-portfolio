import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {},
  reactStrictMode: true,
  devIndicators: false,
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
  /*experimental: {
    serverComponentsExternalPackages: ["@aws-sdk/client-lambda"],
  },*/
};

export default nextConfig;
