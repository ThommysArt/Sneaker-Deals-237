/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['files.edgestore.dev'],
        remotePatterns: ['files.edgestore.dev'],
    },
};

export default nextConfig;
