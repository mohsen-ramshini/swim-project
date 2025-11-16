/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // اضافه کردن دامنه‌های خارجی برای بارگذاری تصاویر
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.swimacademy.ir",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // اضافه کردن برای تصاویر Unsplash
      },
      {
        protocol: "https",
        hostname: "images.pexels.com", // در صورت استفاده از Pexels
      },
    ],
  },

  // بازنویسی مسیرهای API
  async rewrites() {
    return [
      {
        source: "/api/states",
        destination: "https://iran-locations-api.ir/api/v1/fa/states",
      },
      {
        source: "/api/cities",
        destination: "https://iran-locations-api.ir/api/v1/fa/cities",
      },
    ];
  },

  // غیرفعال کردن ESLint هنگام Build
  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
