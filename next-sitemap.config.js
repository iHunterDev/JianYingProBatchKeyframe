const fs = require('fs');
const path = require('path');

function getRoutes(dir, basePath = '') {
  let routes = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 递归遍历子目录
      routes = routes.concat(getRoutes(filePath, path.join(basePath, file)));
    } else if (file.endsWith('page.js') || file.endsWith('page.tsx')) {
      // 找到页面文件
      let route = basePath.replace(/\\/g, '/');
      if (file === 'page.js' || file === 'page.tsx') {
        routes.push(route || '/');
      }
    }
  }

  return routes;
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://keyframeai.top',
  generateRobotsTxt: true,
  // ... 其他选项 ...
  additionalPaths: async (config) => {
    const result = [];

    // 定义支持的语言
    const languages = ['', 'en_US']; // 空字符串表示默认语言（根路径）

    // 从 app 目录获取路由
    const appDir = path.join(process.cwd(), 'src/app/[locale]');
    const routes = getRoutes(appDir);

    // 生成所有语言和路由的组合
    for (const lang of languages) {
      for (const route of routes) {
        const path = lang ? `/${lang}/${route}` : route;
        result.push({
          loc: path,
          priority: route === '/' ? 1.0 : Math.max(0.1, 0.9 - (route.split('/').length - 1) * 0.1), // 首页优先级为1，其他页面按层级递减0.1，最低为0.1
        });
      }
    }

    return result;
  },
};