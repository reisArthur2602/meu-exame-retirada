import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactCompiler: true,
    experimental: {
        serverActions: {
            // PDFs de exame podem ter até 20 MB
            bodySizeLimit: '25mb',
        },
    },
};

export default nextConfig;
