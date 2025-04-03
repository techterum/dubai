/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.dubai-escorts.me',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: [
    '/server-sitemap.xml',
    '/admin*',
    '/api*',
    '/ListingDetails',
    '/BlogPostDetails',
    '/ListingDetails/*',
    '/BlogPostDetails/*',
    '/CreateListing',
    '/CreateListing/*',
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      // 'https://www.dubai-escorts.me/server-sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    const defaultConfig = {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };

    if (path === '/') {
      return {
        ...defaultConfig,
        changefreq: 'daily',
        priority: 1.0,
      };
    }

    if (path === '/about' || path === '/footer') {
      return {
        ...defaultConfig,
        changefreq: 'monthly',
        priority: 0.8,
      };
    }

    if (path.startsWith('/blog') || path.startsWith('/listings')) {
      return {
        ...defaultConfig,
        changefreq: 'daily',
        priority: 0.9,
      };
    }

    return defaultConfig;
  },
}

