import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "zfaqhhzqfnwuvtrxsxtf.supabase.co",
        pathname: "/storage/v1/object/public/meme-uploads/**",
      },
    ],
  },
};

export default nextConfig;
