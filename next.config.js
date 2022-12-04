/**
 * @type {import('next').NextConfig}
 */

// const ContentSecurityPolicy = `
//   default-src 'self';
//   script-src 'self';
//   font-src 'self';
// `
const nextTranslate = require('next-translate');

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // {
  //   key: 'Content-Security-Policy',
  //   value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  // }
];

const nextConfig = {
  /* Security headers */
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },

  /* Languages */
};

module.exports = nextTranslate({
  webpack: (nextConfig, { isServer, webpack }) => {
    return nextConfig;
  },
});
