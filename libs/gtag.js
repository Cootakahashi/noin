export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

//ページ遷移を認識させるpageviewという関数をgtag.jsに用意します。この関数をページ遷移に応じて実行することによって、Googleアナリティクスにデータが送ることができる。
export const pageview = (url) => {
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};
