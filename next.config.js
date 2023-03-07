/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  transpilePackages: ["react-syntax-highlighter"],
  images: {
    domains: ["prompt-engineering.github.io"],
  },

  i18n: {
    locales: ["en-US", "zh-CN"],
    defaultLocale: "en-US",
    domains: [
      {
        domain: "www.clickprompt.org",
        defaultLocale: "zh-CN",
        locales: ["zh-CN"],
      },
      {
        domain: "en.clickprompt.org",
        defaultLocale: "en-US",
        locales: ["en-US", "en-GB"],
      },
    ],
  },

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
