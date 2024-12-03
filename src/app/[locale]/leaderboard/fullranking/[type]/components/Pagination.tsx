import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  type: string;
  days: number;
}

export default function Pagination({ currentPage, hasNextPage, type, days }: PaginationProps) {
  const t = useTranslations('Pagination');

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      {currentPage > 1 && (
        <Link
          href={`/leaderboard/fullranking/${type}?page=${currentPage - 1}&days=${days}`}
          className="px-6 py-2 bg-[#131313] text-[#c9fd02] rounded-lg hover:bg-[#1a1a1a] flex items-center gap-2"
        >
          <span>←</span>
          <span>{t('previous')}</span>
        </Link>
      )}
      
      {hasNextPage && (
        <Link
          href={`/leaderboard/fullranking/${type}?page=${currentPage + 1}&days=${days}`}
          className="px-6 py-2 bg-[#131313] text-[#c9fd02] rounded-lg hover:bg-[#1a1a1a] flex items-center gap-2"
        >
          <span>{t('next')}</span>
          <span>→</span>
        </Link>
      )}
    </div>
  );
} 