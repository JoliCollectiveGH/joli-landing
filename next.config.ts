import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.jolicollective.net' }],
        destination: 'https://jolicollective.net/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
