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
};

module.exports = nextConfig;
