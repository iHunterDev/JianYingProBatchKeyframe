"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Dashboard from "./dashboard";

export default function CopilotDashboard() {
  const t = useTranslations("CopilotDashboard");

  // 设置 Copilot 默认的 API 地址
  useEffect(() => {
    if (!window.localStorage.getItem("copilot_api_url")) {
      window.localStorage.setItem("copilot_api_url", "http://localhost:9507");
    }
  })
  

  // 检测是否开启 Copilot
  // 如果没开启则提示去启动，否则则显示 Copilot Dashboard
  // 如何检测呢？ 去请求本地的 localhost:8080 接口，如果能正常响应则说明 Copilot 已经启动，同时 localhost:8080 为默认值，host 地址从 localstorage 中读取

  const [isCopilotEnabled, setIsCopilotEnabled] = useState(false);

  useEffect(() => {
    const checkCopilotStatus = async () => {
      const response = await fetch(window.localStorage.getItem("copilot_api_url") as string);
      const data = await response.text();
      console.log(data);

      if (response.status === 200) {
        setIsCopilotEnabled(true);
      } else {
        setIsCopilotEnabled(false);
      }
    };

    const timer = setTimeout(() => {
      checkCopilotStatus();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

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

        {/* 检测到 Copilot 是否开启 */}
        {/* 如果没开启则提示去启动，否则则显示 Copilot Dashboard */}
        {isCopilotEnabled ? (
          <Dashboard />
        ) : (
          <div className="flex flex-col items-center justify-center gap-y-10">
            <ReactLoading type="bars" color="#ffffff" width={80} height={80} />
            {/* <p className="text-center text-3xl font-bold text-white">{t("Copilot is not running")}</p> */}
            <p className="text-center text-3xl font-bold text-white">
              {t("CheckingCopilotTips")}
            </p>
            <p className="text-center text-sm text-white">
              {t("CheckingCopilotHelpTips")} <a href="./" className="hover:text-[#c9fd02] underline">{t("DownloadClient")}</a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
