const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;
    config.experiments = { topLevelAwait: true };
    config.plugins.push(
      new NextFederationPlugin({
        name: 'chat',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          home: `home@http://localhost:3001/_next/static/${
            isServer ? 'ssr' : 'chunks'
          }/remoteEntry.js`,
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
        extraOptions: {
          exposePages: true,
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
