/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['src/styles'],
    prependData: `@import './src/styles/default/';`
  },
  images: { unoptimized: true }
};

export default nextConfig;
