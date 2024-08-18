"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function NativeBanner() {
  const [loadScript, setLoadScript] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadScript(true);
    }, 5000); // 延迟 5 秒

    return () => clearTimeout(timer); // 清理定时器
  }, []);

  return (
    <>
      {loadScript && (
        <Script
          id="monetag-native-banner"
          async={true}
          data-cfasync="false"
          src="//thubanoa.com/1?z=7915630"
        />
      )}
    </>
  );
}
