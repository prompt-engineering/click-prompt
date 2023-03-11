/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    // TODO https://beta.nextjs.org/docs/configuring/typescript#statically-typed-links
    // typedRoutes: true,
  },
  transpilePackages: ["react-syntax-highlighter"],
  images: {
    domains: ["prompt-engineering.github.io"],
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
