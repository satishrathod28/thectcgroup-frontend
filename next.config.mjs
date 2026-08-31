/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dimerse.com',
            },
            {
                protocol: 'https',
                hostname: 'techmatrick.com',
            },
            {
                protocol: 'https',
                hostname: 'api.thectcgroup.in', 
            },
        ],
    },
};

export default nextConfig;
