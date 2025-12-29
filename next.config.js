/** @type {import('next').NextConfig} */

const nextConfig = {
  // distDir: 'dist', // ❌ BUNU KALDIR
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.com/api/:path*',
      },
    ];
  },
  images: {
    domains: ['api.telebe360.com'],
  },
};

const transpiledModules = require('next-transpile-modules')(['react-icons']);
module.exports = transpiledModules(nextConfig);
