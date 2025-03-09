const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  runtimeCaching: [
    {
      urlPattern: ({ url }:{url:URL}) => url.pathname === '/',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'html-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: ({ url }:{url:URL}) => /\.(css|js|woff2|woff|ttf)$/.test(url.pathname),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: ({ url }:{url:URL}) => true, // Handle all failed requests
      handler: 'NetworkOnly',
      options: {
        cacheName: 'fallback-cache',
      },
    },
  ],
  fallbacks: {
    document: '/', // Ensure offline page is used
  },
});

const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = withPWA(nextConfig);
