/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic configuration for stability
  reactStrictMode: true,
  
  // Image optimization
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Webpack configuration for better module resolution
  webpack: (config, { isServer }) => {
    // Improve module resolution
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    return config;
  },
}

export default nextConfig