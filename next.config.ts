// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // پیکربندی مجاز برای بارگذاری تصاویر از دامنه خارجی
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.swimacademy.ir",
      },
    ],
  },

  // بازنویسی مسیرهای API برای پروکسی کردن به سرویس‌های خارجی
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

  // غیرفعال‌سازی بررسی‌های eslint هنگام build (مثلاً برای build در Vercel یا production)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // مسیرهایی که توسط middleware بررسی می‌شوند
  // (می‌تونی بسته به نیاز بیشتر اضافه یا کم کنی)
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;

// اگر middleware داری، تنظیم زیر رو در فایل middleware.ts باشه نه اینجا:
// export const config = { matcher: [...] }
