/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/ChatGptGeneral",
        permanent: true,
      },
    ];
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
