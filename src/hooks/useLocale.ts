import { usePathname } from 'next/navigation';
import { locales, defaultLocale } from '@/i18n/i18n-config';

export function useLocale() {
  const pathname = usePathname();
  const segments = pathname.split('/');

  // 检查第一个路径段是否是有效的语言代码
  const localeFromPath = segments[1];
  if (locales.includes(localeFromPath)) {
    return localeFromPath;
  }

  // 如果路径中没有有效的语言代码，返回默认语言
  return defaultLocale;
}