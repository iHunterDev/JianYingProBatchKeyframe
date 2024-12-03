"use client";

import { Footer } from "flowbite-react";
import { useTranslations } from "next-intl";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { useLocale } from "@/hooks/useLocaleClient";


export function FooterComponent() {
  const t = useTranslations("Footer");
  // 服务端获取当前语言
  const { getLocalizedHref } = useLocale();

  return (
    <Footer container className="rounded-none bg-black text-white">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            {/* <Footer.Brand
              href="https://flowbite.com"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite Logo"
              name="Flowbite"
              className="text-white"
            /> */}
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            {/* <div>
              <Footer.Title title={t("about")} className="text-white" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="text-white hover:text-[#c9fd02]">Flowbite</Footer.Link>
                <Footer.Link href="#" className="text-white hover:text-[#c9fd02]">Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div> */}
            <div>
              <Footer.Title title={t("followUs")} className="text-white" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://github.com/iHunterDev/JianYingProBatchKeyframe" className="text-white hover:text-[#c9fd02]">Github</Footer.Link>
                <Footer.Link href={getLocalizedHref('/roadmap')} className="text-white hover:text-[#c9fd02]">{t("Roadmap")}</Footer.Link>
                <Footer.Link href={getLocalizedHref('/donate')} className="text-white hover:text-[#c9fd02]">{t("Donate")}</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title={t("legal")} className="text-white" />
              <Footer.LinkGroup col>
                <Footer.Link href={getLocalizedHref('/privacy-policy')} className="text-white hover:text-[#c9fd02]">{t("privacyPolicy")}</Footer.Link>
                <Footer.Link href={getLocalizedHref('/terms-conditions')} className="text-white hover:text-[#c9fd02]">{t("termsConditions")}</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="my-6 border-gray-700" />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="https://keyframeai.top/" by="KeyframeAi™" year={2023} className="text-white" />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            {/* <Footer.Icon href="#" icon={BsFacebook} className="text-white hover:text-[#c9fd02]" /> */}
            {/* <Footer.Icon href="#" icon={BsInstagram} className="text-white hover:text-[#c9fd02]" /> */}
            <Footer.Icon href="https://twitter.com/iHunterDev" icon={BsTwitter} className="text-white hover:text-[#c9fd02]" />
            <Footer.Icon href="https://github.com/iHunterDev/JianYingProBatchKeyframe" icon={BsGithub} className="text-white hover:text-[#c9fd02]" />
            {/* <Footer.Icon href="#" icon={BsDribbble} className="text-white hover:text-[#c9fd02]" /> */}
          </div>
        </div>
      </div>
    </Footer>
  );
}
