import SelectDraft from "./components/SelectDraft";
import { useTranslations } from "next-intl";
import FAQSection from "./components/FAQSection";
import DraftSetting from "./components/DraftSetting";
import TutorialSteps from "./components/TutorialSteps";

export default function Home() {
  const t = useTranslations("Home");

  const steps = [
    { title: t("TutorialStep1Title"), description: t("TutorialStep1Description") },
    { title: t("TutorialStep2Title"), description: t("TutorialStep2Description") },
    { title: t("TutorialStep3Title"), description: t("TutorialStep3Description") },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-end bg-grid-subtle overflow-hidden">
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d0d0d] to-transparent pointer-events-none" />
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-px h-64 bg-gradient-to-b from-brand/40 to-transparent" />
        <div className="absolute top-0 right-0 w-64 h-px bg-gradient-to-l from-brand/40 to-transparent" />

        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 pb-20 md:pb-28">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-16">
            {/* Title block */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="block w-6 h-px bg-brand" />
                <span className="font-display text-brand text-xs font-bold uppercase tracking-[0.25em]">
                  JianyingPro / 剪映
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95] text-white tracking-tight mb-8">
                {t("Title")}
              </h1>
              <p className="text-base text-white/40 max-w-sm leading-relaxed">
                {t("Description")}
              </p>
            </div>

            {/* CTA block */}
            <div className="flex flex-col gap-3 items-start lg:items-end lg:pb-1">
              <SelectDraft />
              <DraftSetting />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* Tutorial Steps */}
        <section className="py-24 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
            <div>
              <span className="font-display text-brand text-xs font-bold uppercase tracking-[0.25em]">
                {t("TutorialStep")}
              </span>
              <h2 className="font-display mt-3 text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                {t("HowUse")}
              </h2>
            </div>
          </div>
          <TutorialSteps steps={steps} />
        </section>

        <FAQSection />
      </div>
    </main>
  );
}
