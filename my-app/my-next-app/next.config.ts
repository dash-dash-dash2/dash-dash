import type { NextConfig } from "next";
import WorkboxPlugin from "workbox-webpack-plugin";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [ "v0.blob.com",'example.com', // Example of a domain
      'i.pinimg.com', // Pinterest
      'images.unsplash.com', // Unsplash
      'cdn.example.com', // Another example
      'mycdn.com', // Custom CDN
      'assets.example.com', 
      'images.pexels.com',
      'res.cloudinary.com',
    ],
  },  

  // Configure headers for static assets
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|css|js|woff|woff2)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding',
          },
        ],
      },
    ];
  },

  // Configure webpack to generate service worker
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new WorkboxPlugin.InjectManifest({
          swSrc: './public/service-worker.ts',
          swDest: '../public/service-worker.js',
        })
      );
    }
    return config;
  },
};

export default nextConfig;
