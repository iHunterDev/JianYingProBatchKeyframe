import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { createTranslator } from "next-intl";

type Props = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../i18n/locales/${locale}.json`)).default;
  const t = createTranslator({ locale: locale.replace("_", "-"), messages });

  return {
    title: t("Donate.BuyTheAuthorACupOfCoffee") + " - " + t("Home.Title"),
    description: t("Donate.BuyTheAuthorACupOfCoffee") + " - " + t("Home.Title"),
  };
}

import {ArrowUpRight} from "lucide-react";
export default function DonatePage() {
  const t = useTranslations("Donate");
  const options = [
    {title: t('OneCoffee'), description: t('DonateOneCoffeeDescription'), amount: '$5'},
    {title: t('OneMilkyTea'), description: t('DonateOneMilkyTeaDescription'), amount: '$5'},
    {title: t('Custom'), description: t('DonateCustomDescription'), amount: '$999'},
  ];
  return <main id="main-content" className="page-shell section-space">
    <header className="max-w-3xl"><p className="eyebrow mb-5">KeyframeAi</p><h1 className="page-title">{t('BuyTheAuthorACupOfCoffee')}</h1></header>
    <div className="mt-14 overflow-hidden rounded-3xl border bg-card">
      {options.map(option=><section key={option.title} className="grid gap-7 border-b p-6 last:border-b-0 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
        <div><h2 className="text-2xl font-semibold tracking-tight">{option.title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{option.description}</p><p className="mt-5 text-3xl font-medium tracking-tight">{option.amount}<span className="ml-1 text-sm font-normal text-muted-foreground">/{t('DonateUnit')}</span></p></div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><a className="action-primary" href="https://afdian.net/a/iHunterDev/plan">{t('DonatePlatformAfdian')}<ArrowUpRight className="size-4" aria-hidden="true"/></a><a className="action-secondary" href="https://buymeacoffee.com/ihunter">{t('DonatePlatformBuyMeACoffee')}<ArrowUpRight className="size-4" aria-hidden="true"/></a></div>
      </section>)}
    </div>
  </main>;
}
