/**
 * @type {import("next-sitemap").IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const config = require('./src/configs/configBasic.js');

module.exports = {
  // Base URL of your website
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  siteUrl: config.url.production,
  // siteUrl: process.env.SITE_URL || 'https://example.com',

  // Generate robots.txt
  generateRobotsTxt: true,

  // robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },

  // Exclude paths from sitemap
  exclude: [
    '/api/*',
    '/server-sitemap.xml', // Exclude dynamic sitemap
    '/admin/*',
  ],

  // Generate sitemap index
  generateIndexSitemap: true,

  // Size of a single sitemap file
  sitemapSize: 5000,

  // Automatically generate lastmod
  autoLastmod: true,

  // Page priority
  priority: 0.7,

  // Change frequency
  changefreq: 'daily',
};
