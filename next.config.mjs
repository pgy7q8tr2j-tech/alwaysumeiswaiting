/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    '@modelcontextprotocol/sdk',
    '@neondatabase/serverless',
  ],
};
export default nextConfig;
