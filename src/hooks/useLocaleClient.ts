import { usePathname } from 'next/navigation';
import { locales, defaultLocale } from '@/i18n/i18n-config';

export function useLocale() {
  const pathname = usePathname();
  const segments = pathname.split('/');

  // 检查第一个路径段是否是有效的语言代码
  const localeFromPath = segments[1];
  const currentLocale = locales.includes(localeFromPath) ? localeFromPath : defaultLocale;

  const getLocalizedHref = (path: string) => {
    return currentLocale === defaultLocale ? path : `/${currentLocale}${path}`;
  };

  return { currentLocale, getLocalizedHref };
}