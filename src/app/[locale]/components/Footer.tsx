"use client";

import { useTranslations } from "next-intl";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { useLocale } from "@/hooks/useLocaleClient";

export function FooterComponent() {
  const t = useTranslations("Footer");
  const { getLocalizedHref } = useLocale();

  return (
    <footer className="border-t border-white/[0.06] bg-[#0d0d0d] text-white px-6 py-12 lg:px-10 xl:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <span className="font-display font-bold text-sm">剪映一键关键帧</span>
            </div>
            <p className="text-xs text-white/25 max-w-[180px] leading-relaxed">
              Batch keyframe processing for JianyingPro drafts.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10">
            <div>
              <h3 className="font-display mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">{t("followUs")}</h3>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a href="https://github.com/iHunterDev/JianYingProBatchKeyframe" className="text-sm text-white/50 hover:text-brand transition-colors">
                    Github
                  </a>
                </li>
                <li>
                  <a href={getLocalizedHref('/roadmap')} className="text-sm text-white/50 hover:text-brand transition-colors">
                    {t("Roadmap")}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedHref('/donate')} className="text-sm text-white/50 hover:text-brand transition-colors">
                    {t("Donate")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">{t("legal")}</h3>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a href={getLocalizedHref('/privacy-policy')} className="text-sm text-white/50 hover:text-brand transition-colors">
                    {t("privacyPolicy")}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedHref('/terms-conditions')} className="text-sm text-white/50 hover:text-brand transition-colors">
                    {t("termsConditions")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-xs text-white/20">
            © 2023{" "}
            <a href="https://keyframeai.top/" className="hover:text-brand transition-colors">
              KeyframeAi™
            </a>
          </span>
          <div className="flex items-center gap-5">
            <a
              href="https://twitter.com/iHunterDev"
              className="text-white/30 hover:text-brand transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitter className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/iHunterDev/JianYingProBatchKeyframe"
              className="text-white/30 hover:text-brand transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsGithub className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
