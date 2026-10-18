import type { Metadata } from "next";

import "../globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/i18n-config";
import { NextIntlClientProvider, createTranslator } from "next-intl";
import Navbar from "@/components/Navbar";
import { FooterComponent } from './components/Footer';
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";
import Chatway from "@/components/Chatway";
import NativeBanner from "@/components/Monetag/NativeBanner";
import InPagePush from "@/components/Monetag/InPagePush";


type Props = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  const messages = (await import(`../../i18n/locales/${locale}.json`)).default;
  const t = createTranslator({ locale: locale.replace("_", "-"), messages });

  return {
    title: t("Home.Title"),
    description: t("Home.Description"),
    keywords: t("Home.Keywords"),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  let messages;
  try {
    messages = (await import(`../../i18n/locales/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale.replace("_", "-")}>
      <body className="font-sans">
        <Script defer data-domain="keyframeai.top" src="https://plausible.talkloop.top/js/script.js" strategy="afterInteractive" />
          <NextTopLoader />
          <NextIntlClientProvider locale={locale.replace("_", "-")} messages={messages}>
          <Navbar></Navbar>

            {children}
          <FooterComponent></FooterComponent>

          </NextIntlClientProvider>
          <GoogleAnalytics />

        <Chatway />
        <NativeBanner />
        <InPagePush />
      </body>
    </html>
  );
}
