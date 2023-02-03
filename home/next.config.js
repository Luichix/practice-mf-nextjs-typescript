const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;
    config.experiments = { topLevelAwait: true };
    config.plugins.push(
      new NextFederationPlugin({
        name: 'home',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          chat: `chat@http://localhost:3002/_next/static/${
            isServer ? 'ssr' : 'chunks'
          }/remoteEntry.js`,
        },
        exposes: {
          './navbar': './src/components/Navbar.tsx',
          './footer': './src/components/Footer.tsx',
        },
        shared: {
          'styled-jsx/style': {
            eager: true,
            singleton: true,
            requiredVersion: false,
          },
          'next/link': {
            eager: true,
            singleton: true,
          },
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
