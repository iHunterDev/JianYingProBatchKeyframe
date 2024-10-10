import { useTranslations } from "next-intl";

import type { Metadata } from "next";
import { createTranslator } from "next-intl";

type Props = {
  params: { locale: string };
};
export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const messages = (await import(`../../../../i18n/locales/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });

  return {
    title: t("Copilot.DownloadClient") + " - " + t("Home.Title"),
    description: t("Copilot.CopilotDescription") + " - " + t("Copilot.DownloadClient") + " - " + t("Home.Title"),
  };
}
export default function Copilot() {
  const tCopilot = useTranslations("Copilot");
  const tCopilotDwonload = useTranslations("CopilotDwonload");
  return (
    <>
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
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 pb-4 text-4xl font-bold text-white md:text-6xl">
              {tCopilot("DownloadClient")}
            </h1>
            <div className="mx-auto mb-3 max-w-[528px] md:mb-6 lg:mb-8">
              <p className="text-xl text-[#636262]">
                {tCopilot("CopilotDescription")}
              </p>
            </div>

            <div className="flex gap-10">
              <div className="w-full rounded-xl bg-[#131313] p-8">
                <div className="flex cursor-pointer justify-between">
                  <p className="mb-4 text-xl font-bold text-[#ffffff]">
                    Windows
                  </p>
                </div>
                <a
                  href="https://s3.keyframeai.top/jianyingpro-batch-keyframe-copilot/windows/prod/x64/jianyingpro-batch-keyframe-copilot-amd64-installer.exe"
                  target="_blank"
                  className="w-full block rounded-full bg-[#c9fd02] px-6 py-2 text-center font-bold text-black transition hover:border-black hover:bg-white"
                >
                  {tCopilotDwonload("Download")}
                </a>
              </div>
              <div className="w-full rounded-xl bg-[#131313] p-8">
                <div className="flex cursor-pointer justify-between">
                  <p className="mb-4 text-xl font-bold text-[#ffffff]">
                    MacOS (Apple silicon)
                  </p>
                </div>
                <a
                  href="https://s3.keyframeai.top/jianyingpro-batch-keyframe-copilot/macos/prod/arm64/jianyingpro-batch-keyframe-copilot.zip"
                  target="_blank"
                  className="w-full block rounded-full bg-[#c9fd02] px-6 py-2 text-center font-bold text-black transition hover:border-black hover:bg-white"
                >
                  {tCopilotDwonload("Download")}
                </a>
              </div>
              <div className="w-full rounded-xl bg-[#131313] p-8">
                <div className="flex cursor-pointer justify-between">
                  <p className="mb-4 text-xl font-bold text-[#ffffff]">
                    MacOS (Intel)
                  </p>
                </div>
                <a
                  href="https://s3.keyframeai.top/jianyingpro-batch-keyframe-copilot/macos/prod/amd64/jianyingpro-batch-keyframe-copilot.zip"
                  target="_blank"
                  className="w-full block rounded-full bg-[#c9fd02] px-6 py-2 text-center font-bold text-black transition hover:border-black hover:bg-white"
                >
                  {tCopilotDwonload("Download")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
