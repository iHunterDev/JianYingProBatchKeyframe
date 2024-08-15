import Script from "next/script";

export default function TawkChat() {
  return (
    <>
      {/* Start of Tawk.to Script */}
      <Script id="tawk-chat">
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/66972ab6becc2fed692677eb/1i2v7tmvv';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `}
      </Script>
      {/* End of Tawk.to Script */}
    </>
  );
}
