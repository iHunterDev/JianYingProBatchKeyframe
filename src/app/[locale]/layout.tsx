import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Analytics } from '@vercel/analytics/react'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import {notFound} from 'next/navigation';
import { locales } from '@/i18n/i18n-config'
import {NextIntlClientProvider} from 'next-intl';
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '剪映一键关键帧',
  description: '一键设定剪映视频关键帧，轻松添加转场动画。',
}

export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode,
  params: {locale: string}
}) {
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  let messages;
  try {
    messages = (await import(`../../i18n/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Navbar></Navbar>
        <NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
