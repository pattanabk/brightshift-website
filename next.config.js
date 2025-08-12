// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove or comment out 'output: 'export',' if it exists
  // output: 'export', // <-- DELETE THIS LINE OR COMMENT IT OUT

  // If you had basePath or assetPrefix for GitHub Pages, remove them too
  // basePath: '/your-repo-name', // <-- DELETE THIS LINE OR COMMENT IT OUT
  // assetPrefix: '/your-repo-name/', // <-- DELETE THIS LINE OR COMMENT IT OUT

  // Your i18n configuration remains the same
  i18n: {
    defaultLocale: 'th', // As per your previous request
    locales: ['en', 'th']
  }
};

module.exports = nextConfig;