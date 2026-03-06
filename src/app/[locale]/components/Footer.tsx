"use client";

import { useTranslations } from "next-intl";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { useLocale } from "@/hooks/useLocaleClient";

export function FooterComponent() {
  const t = useTranslations("Footer");
  const { getLocalizedHref } = useLocale();

  return (
    <footer className="bg-black text-white px-6 py-10 lg:px-20">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div />
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-white">{t("followUs")}</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <a href="https://github.com/iHunterDev/JianYingProBatchKeyframe" className="text-white hover:text-brand transition-colors">
                    Github
                  </a>
                </li>
                <li>
                  <a href={getLocalizedHref('/roadmap')} className="text-white hover:text-brand transition-colors">
                    {t("Roadmap")}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedHref('/donate')} className="text-white hover:text-brand transition-colors">
                    {t("Donate")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-white">{t("legal")}</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <a href={getLocalizedHref('/privacy-policy')} className="text-white hover:text-brand transition-colors">
                    {t("privacyPolicy")}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedHref('/terms-conditions')} className="text-white hover:text-brand transition-colors">
                    {t("termsConditions")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <span className="text-white">
            © 2023{" "}
            <a href="https://keyframeai.top/" className="hover:text-brand transition-colors">
              KeyframeAi™
            </a>
          </span>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <a
              href="https://twitter.com/iHunterDev"
              className="text-white hover:text-brand transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitter className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/iHunterDev/JianYingProBatchKeyframe"
              className="text-white hover:text-brand transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsGithub className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
