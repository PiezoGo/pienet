import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
  remotePatterns: [
    { protocol: 'http', hostname: 'localhost', port: '8000' },
    { protocol: 'https', hostname: 'pienet-backend.onrender.com' },
  ],
},
}

export default nextConfig
