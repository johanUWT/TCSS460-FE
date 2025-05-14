/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}'
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}'
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '**'
      }
    ]
  },
  env: {
    NEXT_APP_VERSION: process.env.REACT_APP_VERSION,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET_KEY,
    NEXTAUTH_SECRET_KEY: process.env.NEXTAUTH_SECRET_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    WEB_API_URL: process.env.WEB_API_URL,
    NEXT_APP_JWT_SECRET: process.env.REACT_APP_JWT_SECRET,
    NEXT_APP_JWT_TIMEOUT: process.env.REACT_APP_JWT_TIMEOUT,
    NEXT_APP_GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  }
};

module.exports = nextConfig;
