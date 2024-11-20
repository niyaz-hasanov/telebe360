/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: 'dist', 
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.com/api/:path*',
      },
    ];
  },
};

const transpiledModules = require('next-transpile-modules')(["react-icons"]);
module.exports = transpiledModules(nextConfig);
