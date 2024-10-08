"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function InPagePush() {
  const [loadScript, setLoadScript] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadScript(true);
    }, 10000); // 延迟 5 秒

    return () => clearTimeout(timer); // 清理定时器
  }, []);

  return (
    <>
      {loadScript && (
        <Script
          id="monetag-in-page-push"
          async={true}
        >
          {`
            (function (d, z, s) {
              s.src = "https://" + d + "/400/" + z;
              try {
                (document.body || document.documentElement).appendChild(s);
              } catch (e) {}
            })("fortorterrar.com", 7915663, document.createElement("script"));
          `}
        </Script>
      )}
    </>
  );
}
