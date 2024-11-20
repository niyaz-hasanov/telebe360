/** @type {import('next').NextConfig} */

const nextConfig = {
   async rewrites() {
        return [
          {
            source: '/api/:path*', // Bu kısmı değiştirmeyin
            destination: 'https://api.com/api/:path*',
          },
        ];
  },
};

const transpiledModules = require('next-transpile-modules')(["react-icons"]);
module.exports = nextConfig
