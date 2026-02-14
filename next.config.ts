import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google Drive thumbnails often redirect here
      },
      {
        protocol: "https",
        hostname: "doc-0s-40-docs.googleusercontent.com", // Another common Google Drive redirect domain
      },
    ],
  },
};

export default nextConfig;
