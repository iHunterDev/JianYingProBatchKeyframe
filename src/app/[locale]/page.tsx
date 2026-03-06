import SelectDraft from "./components/SelectDraft";
import { useTranslations } from "next-intl";
import Image from "next/image";
import FAQSection from "./components/FAQSection";
import DraftSetting from "./components/DraftSetting";
import NovelList from "./components/NovelList";
import TutorialSteps from "./components/TutorialSteps";

export default function Home() {
  const t = useTranslations("Home");

  const steps = [
    { title: t("TutorialStep1Title"), description: t("TutorialStep1Description") },
    { title: t("TutorialStep2Title"), description: t("TutorialStep2Description") },
    { title: t("TutorialStep3Title"), description: t("TutorialStep3Description") },
  ];

  return (
    <header className="relative">
      <div className="flex justify-center items-center min-h-screen">
        <Image
          src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a26e_Background%20Hero.svg"
          alt=""
          width={100}
          height={100}
          className="absolute -z-10 inline-block h-full w-full object-cover"
        />

        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 pb-4 text-4xl font-bold text-white md:text-6xl">
              {t("Title")}
            </h1>
            <div className="mx-auto mb-3 max-w-[528px] md:mb-6 lg:mb-8">
              <p className="text-xl text-muted">{t("Description")}</p>
            </div>

            <SelectDraft />
            <DraftSetting />
          </div>

          <section className="relative">
            <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-24">
              <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12 lg:mb-16">
                <p className="text-sm font-bold uppercase text-brand">
                  {t("TutorialStep")}
                </p>
                <h2 className="mb-4 mt-6 text-3xl font-extrabold text-white md:text-5xl">
                  {t("HowUse")}
                </h2>
              </div>
              <TutorialSteps steps={steps} />
            </div>
          </section>
          <FAQSection />
          <NovelList />
        </div>
      </div>
    </header>
  );
}
