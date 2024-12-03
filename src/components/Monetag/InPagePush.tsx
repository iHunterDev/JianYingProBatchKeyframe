"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function InPagePush() {

  const [loadScript, setLoadScript] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const timer = setTimeout(() => {
        setLoadScript(true);
      }, 1000);
  
      return () => clearTimeout(timer);
    }
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      {loadScript && (
        <Script
          id="monetag-in-page-push"
          async={true}
        >
          {`
            (function(d, z, s) {
              s.src = 'https://' + d + '/400/' + z;
              try { (document.body || document.documentElement).appendChild(s) } catch(e) {}
            })('vemtoutcheeg.com', 8600008, document.createElement('script'))
          `}
        </Script>
      )}
    </>
  );
}
