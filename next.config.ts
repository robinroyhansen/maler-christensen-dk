import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/forside",
        destination: "/",
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qdphnqduwgnnwvmpksrr.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "cduloscitjydjelqayhs.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "maler-christensen.dk",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
}

export default nextConfig
