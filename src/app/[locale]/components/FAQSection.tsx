"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

const FAQSection = () => {
  const t = useTranslations("Faq");
  const faqList = t.raw("List") as { Question: string; Answer: string }[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 border-t border-white/[0.06]">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
        <div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {t("FaqTitle")}
          </h2>
          <p className="mt-3 text-sm text-brand">{t("FaqDescription")}</p>
        </div>
        <span className="font-display text-xs text-white/20 font-bold uppercase tracking-[0.2em] pb-1">
          FAQ / {faqList.length} items
        </span>
      </div>

      <div className="divide-y divide-white/[0.06]">
        {faqList.map((item, index) => (
          <div key={item.Question}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-start justify-between gap-8 py-5 text-left group"
            >
              <span className="text-white/80 font-medium group-hover:text-white transition-colors text-sm leading-relaxed">
                {item.Question}
              </span>
              <span
                className="text-brand flex-shrink-0 font-display font-bold text-lg leading-none mt-0.5 transition-transform duration-200"
                style={{ transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)' }}
              >
                +
              </span>
            </button>
            <div
              style={{
                display: 'grid',
                gridTemplateRows: openIndex === index ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div className="overflow-hidden">
                <p className="text-sm text-white/35 leading-relaxed pb-5">{item.Answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-white/30">
        {t("Contact")}{" "}
        <a href="https://twitter.com/iHunterDev" className="text-brand hover:underline">
          Twitter
        </a>
        .
      </p>
    </section>
  );
};

export default FAQSection;
