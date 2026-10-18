import { useLocale, useTranslations } from "next-intl";
import type { Metadata } from "next";
import { createTranslator } from "next-intl";
import TutorialSteps from "../components/TutorialSteps";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../i18n/locales/${locale}.json`)).default;
  const t = createTranslator({ locale: locale.replace("_", "-"), messages });

  return {
    title: t("Home.Copilot") + " - " + t("Home.Title"),
    description: t("Home.Copilot") + " - " + t("Home.Title"),
  };
}

import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight, Play } from "lucide-react";
export default function Copilot() {
  const t = useTranslations("Copilot");
  const locale = useLocale();
  const en = locale === "en-US";
  const local = (path: string) => en ? `/en_US${path}` : path;
  const steps = [1, 2, 3].map(i => ({title: t(`TutorialStep${i}Title`), description: t(`TutorialStep${i}Description`)}));
  return <main id="main-content">
    <section className="page-shell section-space grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="eyebrow mb-5">KeyframeAi Copilot</p>
        <h1 className="page-title">{en ? t("FastSimpleAndSecure") : t("FastSimpleAndSecure").split("，").map((part, index) => <span className="inline-block" key={part}>{index > 0 ? "，" : ""}{part}</span>)}</h1>
        <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">{t("CopilotDescription")}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href={local('/copilot/download')} className="action-primary"><ArrowDownToLine className="size-4" aria-hidden="true"/>{t("DownloadClient")}</Link>
          <a href="https://github.com/iHunterDev/JianYingProBatchKeyframeCopilot" className="action-secondary">{t("GetSourceCode")}<ArrowUpRight className="size-4" aria-hidden="true"/></a>
        </div>
        <Link href={local('/copilot/dashboard')} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline">{en ? 'Open dashboard' : '打开控制台'}<ArrowUpRight className="size-4" aria-hidden="true"/></Link>
      </div>
      <div className="min-w-0 rounded-[28px] border bg-card p-4 shadow-[0_24px_80px_-40px_#315b8a50] sm:p-7">
        <Image src="/client_hero.png" width={1280} height={960} priority alt={en ? 'KeyframeAi Copilot desktop client' : 'KeyframeAi Copilot 桌面客户端界面'} className="h-auto w-full rounded-xl"/>
      </div>
    </section>
    <section className="border-y bg-card"><div className="page-shell section-space">
      <p className="eyebrow mb-3">{t("TutorialStep")}</p><h2 className="section-title mb-12">{t("HowUse")}</h2>
      <TutorialSteps steps={steps}/>
    </div></section>
    <section className="page-shell section-space">
      <div className="mb-8 flex items-center gap-3"><Play className="size-5 text-primary" aria-hidden="true"/><h2 className="section-title">{en ? 'Watch the walkthrough' : '跟着视频，轻松上手'}</h2></div>
      <div className="overflow-hidden rounded-2xl border bg-card">
        <iframe src="https://player.bilibili.com/player.html?isOutside=true&aid=112620736676126&bvid=BV1vSViepEyU&cid=500001583118850&p=1" title={en ? 'Copilot video tutorial on Bilibili' : 'Copilot 使用教程（哔哩哔哩）'} loading="lazy" allowFullScreen className="aspect-video w-full"/>
      </div>
      <a href="https://www.bilibili.com/video/BV1vSViepEyU" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-primary hover:underline">{en ? 'Watch on Bilibili' : '在哔哩哔哩观看'}<ArrowUpRight className="size-4" aria-hidden="true"/></a>
    </section>
  </main>;
}
