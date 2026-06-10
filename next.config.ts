import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'picsum.photos', "i.pravatar.cc", "ui-avatars.com", "fastly.picsum.photos", "www.frenchskill.com", "frenchskill.com", "localhost", "tngxhsrytkeatuefwpgp.supabase.co"],
    remotePatterns: [
      { protocol: "https", hostname: "tngxhsrytkeatuefwpgp.supabase.co", pathname: "/storage/v1/object/public/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "i.pravatar.cc", pathname: "/**" },
      { protocol: "https", hostname: "ui-avatars.com", pathname: "/**" },
    ],
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
