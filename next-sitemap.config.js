/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://keyframeai.top',
  generateRobotsTxt: true, // (optional)
  // ...other options
  additionalPaths: async (config) => [
    // 手动添加国际化路由
    { loc: '/', priority: 0.9 },
    { loc: '/en_US', priority: 0.9 },
  ],
}