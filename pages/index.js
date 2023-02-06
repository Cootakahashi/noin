import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { client } from "../libs/client"
//SSG
export const getStaticProps = async() => {
  const data = await client.get({ endpoint: "noin" });
  return {
    props: {
      blog: data.contents,
    },
  };
};

export default function Home({ blog }) {
  const lists = [1, 2, 10]
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Image
        src="/canva/top.png"
        height={600}
        width={1300}
        alt="content"
        />
        TOP ARTICLE
        <div className='grid grid-cols-3 gap-8'>
        {lists.map((lis) => {
          return (
            <div key={lis}>Number:{lis}</div>
          )
           })}
        </div>

          <h2 className='m-10 p-10 text-center'>API</h2>

        <div className='grid grid-cols-3 gap-8'>
        {blog.map((d) => {
          console.log(d.id)
          return(
            <Link key={d.id} href={`/blog/${d.id}`}>
            <div>:{d.id}</div>
            </Link>
          )
         
           })}
           </div>
      </main>
    </>
  )
}