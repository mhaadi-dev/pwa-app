import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default withPWA({
  dest: 'public', 
  ...nextConfig,
});
