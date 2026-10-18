import {getRequestConfig} from 'next-intl/server';
import {defaultLocale, locales} from './i18n-config';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = requested && locales.includes(requested) ? requested : defaultLocale;
  return {locale: locale.replace("_", "-"), messages: (await import(`./locales/${locale}.json`)).default};
});
