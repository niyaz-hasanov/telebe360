/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*', // Bu kısmı değiştirmeyin
            destination: 'http://209.38.40.216:8000/api/:path*', // Gerçek API URL'si
          },
        ];
      },
}
const transpiledModules = require('next-transpile-modules')(["react-icons"]);
module.exports = nextConfig
