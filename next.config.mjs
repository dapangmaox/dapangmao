/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MY_SECRET_TOKEN: process.env.MY_SECRET_TOKEN,
    MY_GITHUB_TOKEN: process.env.MY_GITHUB_TOKEN,
  },
};

export default nextConfig;
