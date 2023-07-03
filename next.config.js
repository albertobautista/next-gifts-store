/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["avatars.githubusercontent.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
