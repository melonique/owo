/** @type {import('next').NextConfig} */

const path = require('path')

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

  const nextConfig = {
    reactStrictMode: false,
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
    },
  };
module.exports = nextConfig;
