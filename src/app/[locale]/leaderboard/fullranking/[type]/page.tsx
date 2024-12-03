import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import BackToTop from '../../../components/BackToTop';
import TimeFilter from '../../components/TimeFilter';
import Pagination from './components/Pagination';

// 类型定义
interface NovelItem {
  id: string;
  date_created: string;
  hot_index: number;
  nickname: string;
  description?: string;
  topic_link: string;
  topic_like?: number;
  topic_comment?: number;
  topic_collect?: number;
  topic_share?: number;
  topic_created_time?: string;
}

interface PageProps {
  params: {
    type: string;
  };
  searchParams: {
    page?: string;
    days?: string;
  };
}

// 生成元数据
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = await getTranslations('Leaderboard');
  
  const rankingTypes: { [key: string]: string } = {
    hot: t('hotRanking'),
    likes: t('likesRanking'),
    comments: t('commentsRanking'),
    favorites: t('favoritesRanking'),
    shares: t('sharesRanking'),
    latest: t('latestRanking'),
  };

  return {
    title: `${rankingTypes[params.type] || t('fullRanking')} - ${t('pageTitle')}`,
    description: t('pageDescription'),
  };
}

// 获取数据的函数
async function getNovelData(type: string, page: number = 1, days: number = 7) {
  const apiUrl = "https://directus.keyframeai.top";
  const limit = 20; // 每页显示数量
  const offset = (page - 1) * limit;
  
  // 计算日期范围
  const endDate = new Date().toISOString();
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  
  try {
    const response = await fetch(
      `${apiUrl}/items/datas?limit=${limit}&offset=${offset}&sort[]=-${type}&sort[]=-topic_created_time&filter[date_created][_between]=${startDate},${endDate}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      items: data.data || [],
      total: data.meta?.total_count || 0,
    };
  } catch (error) {
    console.error('Error fetching novel data:', error);
    return { items: [], total: 0 };
  }
}

export default async function FullRankingPage({ params, searchParams }: PageProps) {
  const t = await getTranslations('Leaderboard');
  
  const currentPage = Number(searchParams?.page) || 1;
  const days = Number(searchParams?.days) || 7;
  const validDays = [7, 14, 30].includes(days) ? days : 7;
  
  const { type } = params;
  const validTypes = ['hot', 'likes', 'comments', 'favorites', 'shares', 'latest'];
  if (!validTypes.includes(type)) {
    return <div className="text-center text-white py-12">{t('invalidRankingType')}</div>;
  }

  const fieldMapping: { [K in typeof type]: keyof NovelItem } = {
    hot: 'hot_index',
    likes: 'topic_like',
    comments: 'topic_comment',
    favorites: 'topic_collect',
    shares: 'topic_share',
    latest: 'topic_created_time',
  } as const;

  const titleMapping = {
    hot: t('hotRanking'),
    likes: t('likesRanking'),
    comments: t('commentsRanking'),
    favorites: t('favoritesRanking'),
    shares: t('sharesRanking'),
    latest: t('latestRanking'),
  };

  const { items, total } = await getNovelData(fieldMapping[type as keyof typeof fieldMapping], currentPage, validDays);
  const hasNextPage = items.length === 20; // 如果当前页面有20条数据，说明可能还有下一页

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/leaderboard" 
            className="text-[#c9fd02] hover:underline"
          >
            ← {t('backToLeaderboard')}
          </Link>
          <h1 className="text-4xl font-bold text-white">
            {titleMapping[type as keyof typeof titleMapping]}
          </h1>
        </div>

        <TimeFilter currentDays={validDays} />

        <div className="overflow-x-auto rounded-lg bg-[#131313] mt-8">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                <th className="text-[#c9fd02] font-bold">{t('ranking')}</th>
                <th className="text-[#c9fd02] font-bold">{t('nickname')}</th>
                <th className="text-[#c9fd02] font-bold">{t('description')}</th>
                <th className="text-[#c9fd02] font-bold">{t('hotIndex')}</th>
                {type !== 'hot' && (
                  <th className="text-[#c9fd02] font-bold">
                    {titleMapping[type as keyof typeof titleMapping]}
                  </th>
                )}
                <th className="text-[#c9fd02] font-bold">{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: NovelItem, index: number) => (
                <tr key={item.id} className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a]">
                  <td className="font-bold text-[#c9fd02]">
                    #{(currentPage - 1) * 20 + index + 1}
                  </td>
                  <td className="text-[#636262]">{item.nickname}</td>
                  <td className="text-[#636262]">
                    {item.description?.slice(0, 45)}
                    {(item.description?.length ?? 0) > 45 ? '...' : ''}
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
                  {type !== 'hot' && (
                    <td className="text-[#636262] font-medium">
                      {type === 'latest' 
                        ? new Date(item[fieldMapping[type as keyof typeof fieldMapping]] || Date.now()).toLocaleString()
                        : item[fieldMapping[type as keyof typeof fieldMapping]]?.toLocaleString()}
                    </td>
                  )}
                  <td>
                    <div className="flex gap-2">
                      <a
                        href={item.topic_link}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="font-medium text-[#c9fd02] hover:underline"
                      >
                        {t('link')}
                      </a>
                      <Link
                        href=""
                        className="font-medium text-[#c9fd02] hover:underline"
                      >
                        {t('details')}
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {items.length > 0 && (
          <Pagination 
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            type={type}
            days={validDays}
          />
        )}
      </div>
      <BackToTop />
    </div>
  );
}
