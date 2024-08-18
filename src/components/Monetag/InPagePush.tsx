"use client";

import Script from "next/script";

export default function InPagePush() {
  return (
    <>
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
    </>
  );
}

