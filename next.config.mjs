/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/uploads/**', 
      },
            {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
       
        
      },
       {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
       
        
      },
    ],
  },
};

export default nextConfig;
