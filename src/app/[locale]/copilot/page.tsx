import { useTranslations } from "next-intl";

export default function Copilot() {
  const t = useTranslations("Copilot");
  return (
    <section className="relative">
      {/* BG Image */}
      <img
        src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f68133fc5cb4e29ed28f2_Background%20Image1%20(1).svg"
        alt=""
        className="absolute -z-10 inline-block h-full w-full object-cover"
      />
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        {/* Component */}
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-20 lg:grid-cols-2">
          {/* Heading Content */}
          <div className="max-w-[720px]">
            <h1 className="mb-3 pb-4 text-4xl font-bold text-white md:text-6xl">
              {t("FastSimpleAndSecure")}
            </h1>
            <p className="mb-6 max-w-[528px] text-xl text-[#aeaeae] md:mb-10">
              {t("CopilotDescription")}
            </p>
            <a
              href="./copilot/download"
              className="mr-5 inline-block rounded-full bg-[#c9fd02] px-6 py-4 text-center font-bold text-black transition hover:border-black hover:bg-white md:mr-6 lg:mr-8"
            >
              {t("DownloadClient")}
            </a>

            <a
              href="https://github.com/iHunterDev/JianYingProBatchKeyframeCopilot"
              className="inline-block rounded-full text-white border border-solid border-[#636262] px-6 py-4 font-bold"
            >
              {t("GetSourceCode")}
            </a>

            {/* <div className="flex items-center">
              <a
                href="#"
                className="] mr-5 inline-block rounded-full bg-[#c9fd02] px-6 py-4 text-center font-bold text-black transition hover:border-black hover:bg-white md:mr-6 lg:mr-8"
              >
                Let's Talk
              </a>
              <a
                href="#"
                className="flex max-w-full flex-row rounded-full border border-solid border-[#636262] px-6 py-4 font-bold"
              >
                <img
                  src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f68133fc5cb4e29ed28f1_PlayCircle.svg"
                  alt=""
                  className="mr-2 inline-block w-5"
                />
                <p className="text-white">View Showreel</p>
              </a>
            </div> */}
          </div>
          {/* Image Div */}
          <div>
            <img
              src="https://img2.imgtp.com/2024/05/15/CfrozGkY.png"
              alt=""
              className="mx-auto inline-block h-full w-full max-w-[640px] rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>

      <section className="relative">
        {/* Background Image */}
        <img
          src="https://assets.website-files.com/646f65e37fe0275cfb808405/646f68133fc5cb4e29ed28f9_How%20It%20Works%20BG.svg"
          alt=""
          className="absolute inset-[0%] -z-[1] inline-block h-full w-full object-cover"
        />
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-5 pb-16 md:px-10 md:pb-24 lg:pb-32">
          {/* Heading Div */}
          <div className="mx-auto max-w-3xl text-center md:my-12 lg:my-16">
            <p className="text-sm font-bold uppercase text-[#c9fd02]">
              {t("TutorialStep")}
            </p>
            <h2 className="mb-4 mt-6 text-3xl font-extrabold text-white md:text-5xl">
              {t("HowUse")}
            </h2>
          </div>
          {/* How it Works */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {/* Item */}
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
            {/* Item */}
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
            {/* Item */}
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

      <section className="relative w-3/5 mx-auto py-10">
        <h2 className="mb-4 mt-6 text-3xl font-extrabold text-white md:text-5xl text-center">{t("HowUse")}</h2>
        <iframe
          src="//player.bilibili.com/player.html?isOutside=true&aid=112620736676126&bvid=BV1vSViepEyU&cid=500001583118850&p=1"
          scrolling="no"
          className="w-full h-96"
        ></iframe>
      </section>
    </section>
  );
}
