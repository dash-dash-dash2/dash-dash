import type { NextConfig } from "next";

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
};

export default nextConfig;
