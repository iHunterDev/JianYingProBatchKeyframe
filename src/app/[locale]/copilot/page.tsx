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
    <section className="relative">
      <img
        src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f68133fc5cb4e29ed28f2_Background%20Image1%20(1).svg"
        alt=""
        className="absolute -z-10 inline-block h-full w-full object-cover"
      />
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-20 lg:grid-cols-2">
          <div className="max-w-[720px]">
            <h1 className="mb-3 pb-4 text-4xl font-bold text-white md:text-6xl">
              {t("FastSimpleAndSecure")}
            </h1>
            <p className="mb-6 max-w-[528px] text-xl text-[#aeaeae] md:mb-10">
              {t("CopilotDescription")}
            </p>
            <a
              href="./copilot/download"
              className="mr-5 inline-block rounded-full bg-brand px-6 py-4 text-center font-bold text-black transition hover:border-black hover:bg-white md:mr-6 lg:mr-8"
            >
              {t("DownloadClient")}
            </a>
            <a
              href="https://github.com/iHunterDev/JianYingProBatchKeyframeCopilot"
              className="inline-block rounded-full text-white border border-solid border-muted px-6 py-4 font-bold"
            >
              {t("GetSourceCode")}
            </a>
          </div>
          <div>
            <img
              src="/client_hero.png"
              alt=""
              className="mx-auto inline-block h-full w-full max-w-[640px] rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>

      <section className="relative">
        <img
          src="https://assets.website-files.com/646f65e37fe0275cfb808405/646f68133fc5cb4e29ed28f9_How%20It%20Works%20BG.svg"
          alt=""
          className="absolute inset-[0%] -z-[1] inline-block h-full w-full object-cover"
        />
        <div className="mx-auto w-full max-w-7xl px-5 pb-16 md:px-10 md:pb-24 lg:pb-32">
          <div className="mx-auto max-w-3xl text-center md:my-12 lg:my-16">
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

      <section className="relative w-3/5 mx-auto py-10">
        <h2 className="mb-4 mt-6 text-3xl font-extrabold text-white md:text-5xl text-center">
          {t("HowUse")}
        </h2>
        <iframe
          src="//player.bilibili.com/player.html?isOutside=true&aid=112620736676126&bvid=BV1vSViepEyU&cid=500001583118850&p=1"
          scrolling="no"
          className="w-full h-96"
        />
      </section>
    </section>
  );
}
