import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/i18n-config";
import { NextIntlClientProvider, createTranslator } from "next-intl";
import Navbar from "@/components/Navbar";
import { FooterComponent } from './components/Footer';
import NextTopLoader from "nextjs-toploader";
import PlausibleProvider from "next-plausible";
import TawkChat from "@/components/TawkChat";
import NativeBanner from "@/components/Monetag/NativeBanner";
import InPagePush from "@/components/Monetag/InPagePush";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  params: { locale: string };
};
export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const messages = (await import(`../../i18n/locales/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });

  return {
    title: t("Home.Title"),
    description: t("Home.Description"),
    keywords: t("Home.Keywords"),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
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
        <PlausibleProvider
          domain="keyframeai.top"
          customDomain="https://plausible.talkloop.top"
        >
          <NextTopLoader />
          <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar></Navbar>

            {children}
          <FooterComponent></FooterComponent>

          </NextIntlClientProvider>
          <GoogleAnalytics />
        </PlausibleProvider>
        <TawkChat />
        <NativeBanner />
        {/* <InPagePush /> */}
      </body>
    </html>
  );
}
