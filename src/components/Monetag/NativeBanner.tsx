"use client";

import Script from "next/script";

export default function NativeBanner() {
  return (
    <>
      <Script
        id="monetag-native-banner"
        async={true}
        data-cfasync="false"
        src="//thubanoa.com/1?z=7915630"
      />
    </>
  );
}