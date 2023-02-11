import "../styles/globals.css";
import Script from "next/script";
import * as gtag from "src/lib/gtag";
import { useRouter } from "next/router";
import { useEffect } from "react";
//next/scriptによる<Script>コンポーネントを使用して、ページがインタラクティブになった直後に実行されるように、strategy="afterInteractive"を指定する。インラインスクリプトは、dangerouslySetInnerHTMLを使用して記述していきます。

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouterChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouterChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouterChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
 
           gtag('config', '${gtag.GA_MEASUREMENT_ID}');
           `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
