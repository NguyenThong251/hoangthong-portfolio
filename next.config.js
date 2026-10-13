/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/cham-soc-website',
        destination: '/website-care',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
