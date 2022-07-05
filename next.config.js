/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'], // got this hostname from the error after loading image
  },
};

module.exports = nextConfig;
