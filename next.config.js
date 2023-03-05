/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ["react-syntax-highlighter"],
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/chatgpt-general",
        permanent: true,
      },
    ];
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.yml/,
      use: "yaml-loader",
    });

    return config;
  },
};

module.exports = nextConfig;
