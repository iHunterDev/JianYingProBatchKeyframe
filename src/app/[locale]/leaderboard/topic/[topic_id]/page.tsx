import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import BackButton from '../../components/BackButton'

// 定义作品数据接口
interface TopicDetail {
  id: number
  status: string
  user_created: string
  date_created: string
  date_updated: string
  description: string
  topic_link: string
  hot_index: number
  topic_like: number
  topic_comment: number
  topic_collect: number
  topic_share: number
  topic_id: string
  nickname: string
  topic_created_time: string
}

// 获取作品详情数据
async function fetchTopicDetail(id: string): Promise<TopicDetail | null> {
  try {
    const apiUrl = "https://directus.keyframeai.top"
    const response = await fetch(
      `${apiUrl}/items/datas/${id}`,
      { next: { revalidate: 3600 } }
    )
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching topic detail:', error)
    return null
  }
}

// 生成元数据
export async function generateMetadata({
  params: { locale, topic_id }
}: {
  params: { locale: string; topic_id: string }
}): Promise<Metadata> {
  const topic = await fetchTopicDetail(topic_id)
  const t = await getTranslations('Leaderboard')

  if (!topic) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.'
    }
  }

  // 截取描述到合适长度，确保标题不超过50个字符
  const truncatedDesc = topic.description.length > 20 
    ? topic.description.slice(0, 20) + '...' 
    : topic.description

  return {
    title: `${truncatedDesc} - ${t('details')}`,
    description: topic.description,
    openGraph: {
      title: `${truncatedDesc} - ${t('details')}`,
      description: topic.description,
      type: 'article',
      publishedTime: topic.topic_created_time,
      modifiedTime: topic.date_updated || topic.date_created,
    }
  }
}

export default async function TopicDetailPage({
  params: { locale, topic_id }
}: {
  params: { locale: string; topic_id: string }
}) {
  const topic = await fetchTopicDetail(topic_id)
  const t = await getTranslations('Leaderboard.topicDetails')

  if (!topic) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <BackButton />
        </div>

        <article className="max-w-4xl mx-auto bg-[#131313] rounded-lg p-8">
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-4 text-white">{topic.description}</h1>
            <div className="flex items-center justify-between text-[#636262] mb-4">
              <div className="flex items-center gap-2">
                <span className="text-white">{t('author')}:</span>
                <span>{topic.nickname}</span>
              </div>
              <time dateTime={topic.topic_created_time}>
                {t('published')}: {new Date(topic.topic_created_time).toLocaleString()}
              </time>
            </div>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-[#1a1a1a] rounded">
              <div className="font-bold text-[#c9fd02]">{topic.topic_like.toLocaleString()}</div>
              <div className="text-sm text-[#636262]">{t('likes')}</div>
            </div>
            <div className="text-center p-4 bg-[#1a1a1a] rounded">
              <div className="font-bold text-[#c9fd02]">{topic.topic_comment.toLocaleString()}</div>
              <div className="text-sm text-[#636262]">{t('comments')}</div>
            </div>
            <div className="text-center p-4 bg-[#1a1a1a] rounded">
              <div className="font-bold text-[#c9fd02]">{topic.topic_collect.toLocaleString()}</div>
              <div className="text-sm text-[#636262]">{t('collects')}</div>
            </div>
            <div className="text-center p-4 bg-[#1a1a1a] rounded">
              <div className="font-bold text-[#c9fd02]">{topic.topic_share.toLocaleString()}</div>
              <div className="text-sm text-[#636262]">{t('shares')}</div>
            </div>
          </div>

          <div className="border-t border-[#2a2a2a] pt-4">
            <div className="mb-2 text-[#636262]">
              <span className="font-semibold text-white">{t('hotIndex')}: </span>
              <span className={`font-bold ${
                topic.hot_index > 5000 
                  ? 'text-red-500' 
                  : topic.hot_index > 3000 
                  ? 'text-orange-500' 
                  : topic.hot_index > 1000 
                  ? 'text-yellow-500' 
                  : 'text-[#636262]'
              }`}>
                {topic.hot_index.toLocaleString()}
              </span>
            </div>
            <div className="mb-2 text-[#636262]">
              <span className="font-semibold text-white">{t('topicId')}: </span>
              {topic.topic_id}
            </div>
            <div className="mb-2 text-[#636262]">
              <span className="font-semibold text-white">{t('link')}: </span>
              <a href={topic.topic_link} 
                 target="_blank" 
                 rel="noopener noreferrer nofollow" 
                 className="text-[#c9fd02] hover:underline break-all">
                {topic.topic_link}
              </a>
            </div>
            <div className="text-sm text-[#636262]">
              {t('lastUpdated')}: {new Date(topic.date_updated || topic.date_created).toLocaleString()}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
