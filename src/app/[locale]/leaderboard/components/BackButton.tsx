'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function BackButton() {
  const router = useRouter()
  const t = useTranslations('Leaderboard.topicDetails')

  return (
    <button
      onClick={() => router.back()}
      className="text-[#c9fd02] hover:underline"
    >
      ← {t('backToPrevious')}
    </button>
  )
} 