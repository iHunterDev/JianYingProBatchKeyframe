import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Home");
  return (
    <footer className="bg-center text-white bg-zinc-950">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        <div className="flex flex-col items-center">
          {/* <a href="#" className="mb-8 inline-block max-w-full">
                  <img
                    src="https://assets.website-files.com/63904f663019b0d8edf8d57c/6399728d302d2471f18b229f_Group%2047874%20(2).svg"
                    alt=""
                    className="inline-block max-h-10"
                  />
                </a> */}
          {/* <div className="text-center font-semibold max-[991px]:ml-0 max-[991px]:mr-0 max-[991px]:py-1">
                  <a
                    href="#"
                    className="inline-block px-6 py-2 font-normal transition hover:text-[#d6a701]"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="inline-block px-6 py-2 font-normal transition hover:text-[#d6a701]"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="inline-block px-6 py-2 font-normal transition hover:text-[#d6a701]"
                  >
                    Works
                  </a>
                  <a
                    href="#"
                    className="inline-block px-6 py-2 font-normal transition hover:text-[#d6a701]"
                  >
                    Support
                  </a>
                  <a
                    href="#"
                    className="inline-block px-6 py-2 font-normal transition hover:text-[#d6a701]"
                  >
                    Help
                  </a>
                </div> */}
          <div className="mb-8 mt-8 w-48 border-b border-solid border-b-white"></div>
          <div className="flex gap-1">
            <Link
              className="font-inter rounded-lg hover:text-[#c9fd02] lg:px-6 lg:py-4"
              href="./"
            >
              {t("JianyingProOneClickKeyframe")}
            </Link>
            <Link
              className="font-inter rounded-lg hover:text-[#c9fd02] lg:px-6 lg:py-4"
              href="./"
            >
              {t("JianyingProBatchKeyframeinOneSecond")}
            </Link>
            <Link
              className="font-inter rounded-lg hover:text-[#c9fd02] lg:px-6 lg:py-4"
              href="./"
            >
              {t("JianyingProAutomaticKeyframing")}
            </Link>
          </div>

          {/* <div className="mb-12 grid w-full max-w-[208px] grid-flow-col grid-cols-4 gap-3">
                  <a
                    href="#"
                    className="ifont-bold mx-auto flex max-w-[24px] flex-col"
                  >
                    <img
                      src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639972bc5e36f4a882999413_Frame%205479.svg"
                      alt=""
                      className="inline-block"
                    />
                  </a>
                  <a
                    href="#"
                    className="mx-auto flex max-w-[24px] flex-col font-bold"
                  >
                    <img
                      src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639972bf093252f2b2114050_Frame%205480.svg"
                      alt=""
                      className="inline-block"
                    />
                  </a>
                  <a
                    href="#"
                    className="ifont-bold mx-auto flex max-w-[24px] flex-col"
                  >
                    <img
                      src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639972bde1a389ee15d86fc6_Frame%205481-1.svg"
                      alt=""
                      className="inline-block"
                    />
                  </a>
                  <a
                    href="#"
                    className="mx-auto flex max-w-[24px] flex-col font-bold"
                  >
                    <img
                      src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639972bf10337117b26b8e51_Frame%205481.svg"
                      alt=""
                      className="inline-block"
                    />
                  </a>
                </div> */}
          <p className="max-[479px]:text-sm">
            Made with 😆 by{" "}
            <a href="https://twitter.com/iHunterDev" target="_blank">
              iHunterDev
            </a>
            . Powered by{" "}
            <a href="https://vercel.com/" target="_blank">
              Vercel
            </a>
            ,{" "}
            <a href="https://www.cloudflare.com/" target="_blank">
              Cloudflare
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
