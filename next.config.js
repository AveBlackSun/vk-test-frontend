/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API: "https://5344-82-118-29-139.ngrok-free.app",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
