import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {},
  reactStrictMode: true,
  devIndicators: false,
  images: {
    domains: [
      "ui-avatars.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
  /*experimental: {
    serverComponentsExternalPackages: ["@aws-sdk/client-lambda"],
  },*/
};

export default nextConfig;
