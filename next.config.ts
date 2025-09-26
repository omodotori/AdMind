import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // allowedDevOrigins was here, but it's not a valid experimental feature in this Next.js version at this level.
  },
  // Moved allowedDevOrigins to the top level as required.
  allowedDevOrigins: [
    "https://6000-firebase-studio-1758186816246.cluster-l6vkdperq5ebaqo3qy4ksvoqom.cloudworkstations.dev"
  ],
};

export default nextConfig;
