import SelectDraft from "./components/SelectDraft";
import { useTranslations } from "next-intl";
import Image from "next/image";
import FAQSection from "./components/FAQSection";


export default function Home() {
  const t = useTranslations("Home");

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
              <p className="text-xl text-[#636262]">{t("Description")}</p>
            </div>

            <SelectDraft></SelectDraft>
          </div>

          <section className="relative">
            <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-24">
              <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12 lg:mb-16">
                <p className="text-sm font-bold uppercase text-[#c9fd02]">
                  {t("TutorialStep")}
                </p>
                <h2 className="mb-4 mt-6 text-3xl font-extrabold text-white md:text-5xl">
                  {t("HowUse")}
                </h2>
                {/* <p className="mx-auto mt-4 max-w-[528px] text-[#aeaeae]">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                  aliquam,purus sit amet luctus magna fringilla urna
                </p> */}
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                <div className="grid grid-cols-1 gap-4 rounded-xl bg-[#131313] p-8">
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-[#c9fd02]">
                    <p className="text-xl font-bold">1</p>
                  </div>
                  <p className="text-xl font-semibold text-white">
                    {t("TutorialStep1Title")}
                  </p>
                  <p className="text-sm text-[#636262]">
                    {t("TutorialStep1Description")}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 rounded-xl bg-[#131313] p-8">
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-[#c9fd02]">
                    <p className="text-xl font-bold">2</p>
                  </div>
                  <p className="text-xl font-semibold text-white">
                    {t("TutorialStep2Title")}
                  </p>
                  <p className="text-sm text-[#636262]">
                    {t("TutorialStep2Description")}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 rounded-xl bg-[#131313] p-8">
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-[#c9fd02]">
                    <p className="text-xl font-bold">3</p>
                  </div>
                  <p className="text-xl font-semibold text-white">
                    {t("TutorialStep3Title")}
                  </p>
                  <p className="text-sm text-[#636262]">
                    {t("TutorialStep3Description")}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <FAQSection></FAQSection>
        </div>
      </div>
    </header>
  );
}
