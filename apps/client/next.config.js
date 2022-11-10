/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: true,
    transpilePackages: ["ui"],
  },
  reactStrictMode: true,
  images: {
    domains: ["s.ppy.sh", "flagpictures.imgix.net", "a.ppy.sh"],
  },
};
