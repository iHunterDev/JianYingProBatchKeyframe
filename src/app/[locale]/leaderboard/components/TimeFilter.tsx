import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface TimeFilterProps {
  currentDays: number;
}

export default async function TimeFilter({ currentDays }: TimeFilterProps) {
  const t = await getTranslations('Leaderboard');
  
  const timeOptions = [
    { days: 7, label: t('last7Days') },
    { days: 14, label: t('last14Days') },
    { days: 30, label: t('last30Days') },
  ];

  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-[#636262]">{t('timeRange')}:</span>
      <div className="flex gap-2">
        {timeOptions.map((option) => (
          <Link
            key={option.days}
            href={`?days=${option.days}`}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentDays === option.days
                ? 'bg-[#c9fd02] text-black font-medium'
                : 'bg-[#131313] text-[#c9fd02] hover:bg-[#1a1a1a]'
            }`}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
} 