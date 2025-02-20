/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.swimacademy.ir",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/states", // درخواست‌های فرانت‌اند به این مسیر هدایت می‌شود
        destination: "https://iran-locations-api.ir/api/v1/fa/states", // مقصد API اصلی
      },
      {
        source: "/api/cities",
        destination: "https://iran-locations-api.ir/api/v1/fa/cities", // Proxy for cities API
      },
    ];
  },
};

module.exports = nextConfig;
