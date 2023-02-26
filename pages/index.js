import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.scss";
import { client } from "../libs/client";
import { Nav } from "../components/header";
import { Footer } from "../components/footer";
import { Event } from "../components/event";
import Script from "next/script";
import * as gtag from "../libs/gtag";
//SSG
import React, { useState, useEffect } from "react";

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "noin" });
  return {
    props: {
      blog: data.contents,
    },
  };
};

export default function Home({ blog }) {
  useEffect(() => {
    const navitem = window.document.querySelector(".nav-item");
    navitem.classList.add("show");
  });
  //Microcmsの画像を使うときはloaderかnext.config設定が必要
  const microCMSLoader = ({ src, width, quality }) => {
    return `${src}?auto=format&fit=max&w=${width}`;
  };
  return (
    <>
      <Head>
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
        <title>Noin Business support MEDIA</title>
        <meta
          name="description"
          content="学びながらビジネスを始めるならここ！しなくていい失敗に加え成功するための究極のガイドを学べます。実践的なアドバイスとともに成功への近道を手に入れよう"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/Noin.png" />
      </Head>
      <div className="w-full ">
        <Nav />
      </div>
      <main className={styles.mai}>
        <Image
          src="/canva/top2.png"
          className="w-full"
          height={600}
          width={1000}
          alt="content"
          priority
        />

        <h2 className="m-10 p-10 text-center font-sans font-thin text-5xl">
          Newest Article
        </h2>

        <div className="grid grid-cols-3  gap-8 w-full text-center">
          {blog.map((d) => {
            const a = d.thumbnail.url;
            return (
              <div key={d.id} className="h-full  bg-slate-20 rounded-3xl">
                <Link key={d.id} href={`/blog/${d.id}`}>
                  <div className="bg-blue-20 rounded-xl">
                    <Image
                      className="h-80 w-80 shadow-2xl rounded-xl "
                      loader={microCMSLoader}
                      src={a}
                      height={100}
                      width={300}
                      alt="content"
                    />
                  </div>
                  <div className="py-20 px-8">
                    <p className="pb-3"> {d.title}</p>
                    <p className="text-slate-100 text-right py-8 opacity-50 border-t">
                      {d.date}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
      <Event />
      <Footer />
    </>
  );
}
