import { locales, defaultLocale } from '@/i18n/i18n-config';

export function useLocale(currentLocale: string) {
  const getLocalizedHref = (path: string) => {
    return currentLocale === defaultLocale ? path : `/${currentLocale}${path}`;
  };

  return { currentLocale, getLocalizedHref };
}