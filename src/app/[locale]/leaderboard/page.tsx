import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import BackToTop from '../components/BackToTop';
import TimeFilter from './components/TimeFilter';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Leaderboard');
  
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    openGraph: {
      title: t('pageTitle'),
      description: t('pageDescription'),
    },
  };
}

async function getNovelData(type: string, days: number = 7) {
  const apiUrl = "https://directus.keyframeai.top";
  
  // 计算日期范围
  const endDate = new Date().toISOString();
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  
  try {
    const response = await fetch(
      `${apiUrl}/items/datas?limit=10&sort[]=-${type}&sort[]=-topic_created_time&filter[date_created][_between]=${startDate},${endDate}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching novel data:', error);
    return []; // 返回空数组作为默认值
  }
}

export default async function LeaderboardPage({
  searchParams = { days: '7' },
}: {
  searchParams?: { days?: string };
}) {
  const t = await getTranslations('Leaderboard');
  
  const days = Number(searchParams?.days) || 7;
  const validDays = [7, 14, 30].includes(days) ? days : 7;

  const rankings = [
    {
      id: "hot",
      title: t('hotRanking'),
      data: await getNovelData('hot_index', validDays),
      showField: 'hot_index',
      fieldTitle: t('hotIndex'),
      hideField: true
    },
    {
      id: "likes",
      title: t('likesRanking'),
      data: await getNovelData('topic_like', validDays),
      showField: 'topic_like',
      fieldTitle: t('likes')
    },
    {
      id: "comments",
      title: t('commentsRanking'),
      data: await getNovelData('topic_comment', validDays),
      showField: 'topic_comment',
      fieldTitle: t('comments')
    },
    {
      id: "favorites",
      title: t('favoritesRanking'),
      data: await getNovelData('topic_collect', validDays),
      showField: 'topic_collect',
      fieldTitle: t('collects')
    },
    {
      id: "shares",
      title: t('sharesRanking'),
      data: await getNovelData('topic_share', validDays),
      showField: 'topic_share',
      fieldTitle: t('shares')
    },
    {
      id: "latest",
      title: t('latestRanking'),
      data: await getNovelData('topic_created_time', validDays),
      showField: 'topic_created_time',
      fieldTitle: t('publishTime')
    }
  ];

  const lastUpdateTime = rankings.reduce((latestTime, ranking) => {
    const rankingLatestTime = ranking.data.reduce((maxTime, item) => {
      const itemTime = new Date(item.date_created);
      return maxTime > itemTime ? maxTime : itemTime;
    }, new Date(0));
    
    return latestTime > rankingLatestTime ? latestTime : rankingLatestTime;
  }, new Date(0));

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">{t('pageTitle')}</h1>
        
        <div className="text-[#636262] mb-8">
          {t('lastUpdateTime')}: {lastUpdateTime.toLocaleString()}
        </div>
        
        {/* Time Filter */}
        <TimeFilter currentDays={validDays} />
        
        {/* Navigation */}
        <nav className="flex flex-wrap gap-4 mb-12">
          {rankings.map((ranking) => (
            <a
              key={ranking.id}
              href={`#${ranking.id}`}
              className="px-4 py-2 bg-[#131313] hover:bg-[#1a1a1a] text-[#c9fd02] border border-[#c9fd02] rounded-lg transition-colors"
            >
              {ranking.title}
            </a>
          ))}
        </nav>

        {/* Rankings */}
        <div className="space-y-16">
          {rankings.map((ranking) => (
            <section
              key={ranking.id}
              id={ranking.id}
              className="scroll-mt-20"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">
                {ranking.title}
              </h2>
              <div className="overflow-x-auto rounded-lg bg-[#131313]">
                <table className="table w-full">
                  <thead>
                    <tr className="border-b border-[#2a2a2a]">
                      <th className="text-[#c9fd02] font-bold">排名</th>
                      <th className="text-[#c9fd02] font-bold">{t('nickname')}</th>
                      <th className="text-[#c9fd02] font-bold">{t('description')}</th>
                      <th className="text-[#c9fd02] font-bold">{t('hotIndex')}</th>
                      {!ranking.hideField && (
                        <th className="text-[#c9fd02] font-bold">{ranking.fieldTitle}</th>
                      )}
                      <th className="text-[#c9fd02] font-bold">{t('action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranking.data.map((item: any, index: number) => (
                      <tr key={item.id} className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a]">
                        <td className="font-bold text-[#c9fd02]">#{index + 1}</td>
                        <td className="text-[#636262]">{item.nickname}</td>
                        <td className="text-[#636262]">
                          {item.description?.slice(0, 45)}
                          {item.description?.length > 45 ? '...' : ''}
                        </td>
                        <td className={`${
                          item.hot_index > 5000 
                            ? 'text-red-500' 
                            : item.hot_index > 3000 
                            ? 'text-orange-500' 
                            : item.hot_index > 1000 
                            ? 'text-yellow-500' 
                            : 'text-[#636262]'
                        } font-bold`}>
                          {item.hot_index}
                        </td>
                        {!ranking.hideField && (
                          <td className="text-[#636262] font-medium">
                            {ranking.id === 'latest' 
                              ? new Date(item[ranking.showField]).toLocaleString()
                              : item[ranking.showField]?.toLocaleString()}
                          </td>
                        )}
                        <td className="flex items-center gap-2">
                          <a
                            href={item.topic_link}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="font-medium text-[#c9fd02] hover:underline"
                          >
                            {t('link')}
                          </a>
                          <a
                            href="#"
                            className="font-medium text-[#c9fd02] hover:underline"
                          >
                            {t('detail')}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex items-center justify-center text-sm">
                <a href="#" className="text-[#c9fd02] hover:underline">
                  {t('viewFullRanking')}
                </a>
                <span className="text-[#636262] text-xs italic">
                  {t('fullRankingComingSoon')}
                </span>
              </div>
            </section>
          ))}
        </div>
      </div>
      <BackToTop />
    </div>
  );
}
