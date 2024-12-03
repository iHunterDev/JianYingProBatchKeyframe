"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function NativeBanner() {
  const [loadScript, setLoadScript] = useState(false);
  useEffect(() => {
    
    if (process.env.NODE_ENV === 'production') {
      const timer = setTimeout(() => {
        setLoadScript(true);
      }, 5000);

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
          async={true}
          data-cfasync="false"
          src="https://groleegni.net/401/8555536"
        />
      )}
    </>
  );
}
