/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ["react-syntax-highlighter"],
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.yml/,
      use: "yaml-loader",
    });

    config.module.rules.push({
      test: /\.svg$/i,
      type: "asset",
      resourceQuery: /url/, // *.svg?url
    });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
