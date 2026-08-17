/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.adidas.com",
      },
    ],
  },
  allowedDevOrigins: ["192.168.1.2", "192.168.1.10", "192.168.1.20"],
};

export default nextConfig;
