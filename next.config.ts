import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com','picsum.photos',"i.pravatar.cc","ui-avatars.com","fastly.picsum.photos","www.frenchskill.com","frenchskill.com","localhost", "tngxhsrytkeatuefwpgp.supabase.co"],
  },
    typescript: {
    ignoreBuildErrors: true,
  },
  crossOrigin: "anonymous",
  async redirects() {
    return [
      
    ];
  },
};

export default nextConfig;
