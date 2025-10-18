import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
});

const nextConfig: NextConfig = {
  images: {
    domains: ['openweathermap.org'],
  },
};

// export default nextConfig;
module.exports = withPWA(nextConfig);