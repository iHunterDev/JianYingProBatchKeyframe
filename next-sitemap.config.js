const fs = require('fs');
const path = require('path');

function getRoutes(dir, basePath = '') {
  let routes = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    // 跳过以 [ 开头的动态路由目录
    if (file.startsWith('[')) {
      continue;
    }

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

// 生成排行榜动态路由
function generateLeaderboardRoutes() {
  const rankingTypes = ['hot', 'likes', 'comments', 'favorites', 'shares', 'latest'];
  const routes = [];

  // 基础排行榜页面
  routes.push('/leaderboard');

  // 完整排行榜页面
  for (const type of rankingTypes) {
    routes.push(`/leaderboard/fullranking/${type}`);
  }

  return routes;
}

// 新增：获取所有话题ID的函数
async function fetchAllTopicIds() {
  try {
    const apiUrl = "https://directus.keyframeai.top";
    const response = await fetch(
      `${apiUrl}/items/datas?fields=id&limit=-1`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      console.error('Failed to fetch topic IDs');
      return [];
    }
    
    const data = await response.json();
    return data.data.map(item => item.id);
  } catch (error) {
    console.error('Error fetching topic IDs:', error);
    return [];
  }
}

// 新增：生成话题路由
async function generateTopicRoutes() {
  const topicIds = await fetchAllTopicIds();
  return topicIds.map(id => `/leaderboard/topic/${id}`);
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://keyframeai.top',
  generateRobotsTxt: true,
  // ... 其他选项 ...
  additionalPaths: async (config) => {
    const result = [];

    // 定义支持的语言
    const languages = ['', 'en_US'];

    // 从 app 目录获取路由
    const appDir = path.join(process.cwd(), 'src/app/[locale]');
    const routes = getRoutes(appDir);

    // 生成排行榜相关的动态路由
    const leaderboardRoutes = generateLeaderboardRoutes();
    routes.push(...leaderboardRoutes);

    // 获取话题详情页路由
    const topicRoutes = await generateTopicRoutes();
    routes.push(...topicRoutes);

    // 生成所有语言和路由的组合
    for (const lang of languages) {
      for (const route of routes) {
        const path = lang ? `/${lang}${route}` : route;
        result.push({
          loc: path,
          priority: route === '/' ? 1.0 : Math.max(0.1, 0.9 - (route.split('/').length - 1) * 0.1),
          // 话题详情页和排行榜的更新频率设置为每天
          changefreq: (route.includes('/leaderboard/') || route.includes('/topic/')) ? 'daily' : 'weekly',
          // 为话题详情页设置较低的优先级，因为内容可能会过时
          ...(route.includes('/topic/') && { priority: 0.6 }),
        });
      }
    }

    return result;
  },
};