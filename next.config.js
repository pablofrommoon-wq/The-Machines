/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  experimental: {
    webpackBuildWorker: false,
  },
  webpack: (config, { dev, isServer }) => {
    // Use memory-only caching to prevent .pack.gz ENOENT errors
    config.cache = { type: 'memory' };
    
    // Optimize memory usage for WebAssembly
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    };
    
    return config;
  },
};

module.exports = nextConfig;