import { useLocale, useTranslations } from "next-intl";

import type { Metadata } from "next";
import { createTranslator } from "next-intl";

type Props = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../i18n/locales/${locale}.json`)).default;
  const t = createTranslator({ locale: locale.replace("_", "-"), messages });

  return {
    title: t("Copilot.DownloadClient") + " - " + t("Home.Title"),
    description: t("Copilot.CopilotDescription") + " - " + t("Copilot.DownloadClient") + " - " + t("Home.Title"),
  };
}
import Link from "next/link";
import { Download, Monitor, Laptop, ArrowUpRight } from "lucide-react";
const releases = [
  {name: "Windows", architecture: "x64", format: ".exe", icon: Monitor, href: "https://s3.keyframeai.top/jianyingpro-batch-keyframe-copilot/windows/prod/x64/jianyingpro-batch-keyframe-copilot-amd64-installer.exe"},
  {name: "macOS", architecture: "Apple silicon", format: ".zip", icon: Laptop, href: "https://s3.keyframeai.top/jianyingpro-batch-keyframe-copilot/macos/prod/arm64/jianyingpro-batch-keyframe-copilot.zip"},
  {name: "macOS", architecture: "Intel", format: ".zip", icon: Laptop, href: "https://s3.keyframeai.top/jianyingpro-batch-keyframe-copilot/macos/prod/amd64/jianyingpro-batch-keyframe-copilot.zip"},
];

export default function CopilotDownload() {
  const t = useTranslations("Copilot");
  const download = useTranslations("CopilotDwonload");
  const en = useLocale() === "en-US";
  return <main id="main-content" className="page-shell section-space">
    <header className="max-w-3xl">
      <p className="eyebrow mb-5">KeyframeAi Copilot</p>
      <h1 className="page-title">{t("DownloadClient")}</h1>
      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t("CopilotDescription")}</p>
    </header>
    <section className="mt-14 overflow-hidden rounded-3xl border bg-card" aria-label={en ? 'Choose your platform' : '选择你的系统'}>
      {releases.map(({name, architecture, format, icon: Icon, href}) => <div key={href} className="grid gap-6 border-b px-6 py-8 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center sm:px-9">
        <div className="flex items-center gap-5"><Icon className="size-8 shrink-0 text-muted-foreground stroke-[1.25]" aria-hidden="true"/><div><h2 className="text-xl font-semibold tracking-tight">{name} <span className="ml-1 text-base font-normal text-muted-foreground">{architecture}</span></h2><p className="mt-1 text-sm text-muted-foreground">{format}</p></div></div>
        <a href={href} className="action-primary" aria-label={`${download("Download")} ${name} ${architecture}`}><Download className="size-4" aria-hidden="true"/>{download("Download")}</a>
      </div>)}
    </section>
    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">{en ? 'Download and start Copilot, then open the dashboard to select a draft.' : '下载并启动客户端后，打开控制台选择草稿，即可开始处理。'}</p>
      <Link href={en ? '/en_US/copilot/dashboard' : '/copilot/dashboard'} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline">{en ? 'Open dashboard' : '打开控制台'}<ArrowUpRight className="size-4" aria-hidden="true"/></Link>
    </div>
  </main>;
}
