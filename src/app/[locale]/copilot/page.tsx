import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { createTranslator } from "next-intl";
import TutorialSteps from "../components/TutorialSteps";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const messages = (await import(`../../../i18n/locales/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });

  return {
    title: t("Home.Copilot") + " - " + t("Home.Title"),
    description: t("Home.Copilot") + " - " + t("Home.Title"),
  };
}

export default function Copilot() {
  const t = useTranslations("Copilot");

  const steps = [
    { title: t("TutorialStep1Title"), description: t("TutorialStep1Description") },
    { title: t("TutorialStep2Title"), description: t("TutorialStep2Description") },
    { title: t("TutorialStep3Title"), description: t("TutorialStep3Description") },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-grid-subtle overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d0d0d] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-px h-64 bg-gradient-to-b from-brand/40 to-transparent" />
        <div className="absolute top-0 right-0 w-64 h-px bg-gradient-to-l from-brand/40 to-transparent" />

        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:py-36">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="block w-6 h-px bg-brand" />
                <span className="font-display text-brand text-xs font-bold uppercase tracking-[0.25em]">
                  Desktop Client
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white leading-[0.95] tracking-tight mb-6">
                {t("FastSimpleAndSecure")}
              </h1>
              <p className="mb-10 max-w-md text-base text-white/40 leading-relaxed">
                {t("CopilotDescription")}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="./copilot/download"
                  className="inline-flex items-center gap-2 bg-brand px-6 py-3.5 font-display font-bold text-black text-sm tracking-wide uppercase transition-all hover:bg-white active:scale-[0.98]"
                >
                  {t("DownloadClient")}
                </a>
                <a
                  href="https://github.com/iHunterDev/JianYingProBatchKeyframeCopilot"
                  className="inline-flex items-center gap-2 border border-white/15 px-6 py-3.5 font-display font-bold text-white/60 text-sm tracking-wide uppercase transition-colors hover:border-white/30 hover:text-white"
                >
                  {t("GetSourceCode")}
                </a>
              </div>
            </div>
            <div>
              <img
                src="/client_hero.png"
                alt=""
                className="mx-auto w-full max-w-[640px] rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* Tutorial Steps */}
        <section className="py-24 border-t border-white/[0.06]">
          <div className="mb-16">
            <span className="font-display text-brand text-xs font-bold uppercase tracking-[0.25em]">
              {t("TutorialStep")}
            </span>
            <h2 className="font-display mt-3 text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
              {t("HowUse")}
            </h2>
          </div>
          <TutorialSteps steps={steps} />
        </section>

        {/* Video tutorial */}
        <section className="py-24 border-t border-white/[0.06]">
          <h2 className="font-display mb-10 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t("HowUse")}
          </h2>
          <div className="w-full max-w-3xl">
            <iframe
              src="//player.bilibili.com/player.html?isOutside=true&aid=112620736676126&bvid=BV1vSViepEyU&cid=500001583118850&p=1"
              scrolling="no"
              className="w-full h-96"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
