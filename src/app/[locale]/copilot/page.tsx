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
              href="#"
              className="mr-5 inline-block rounded-full bg-[#c9fd02] px-6 py-4 text-center font-bold text-black transition hover:border-black hover:bg-white md:mr-6 lg:mr-8"
            >
              {t("ComingSoon")}
            </a>

            <a
              href="#"
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
    </section>
  );
}
