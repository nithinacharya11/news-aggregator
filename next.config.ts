import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
    GUARDIAN_API_KEY: process.env.GUARDIAN_API_KEY,
    NYT_API_KEY: process.env.NYT_API_KEY
  },
  images: {
    domains: ['ichef.bbci.co.uk', 'example.com'], // Add other trusted domains here
  },
};

export default nextConfig;
