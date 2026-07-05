/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.adidas.com',
      },
    ],
  },
  allowedDevOrigins: ['192.168.1.2'], 
};

export default nextConfig;