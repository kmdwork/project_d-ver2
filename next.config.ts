import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',  // TMDb の画像ドメイン
        pathname: '/t/p/**',         // 画像のパスパターン（任意）
      },
    ],
  },
};

export default nextConfig;
