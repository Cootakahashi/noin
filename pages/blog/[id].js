import { Francois_One } from "@next/font/google";
import { client } from "../../libs/client";
import { renderToc } from "../../libs/render-toc"; // 追加
import { TableOfContents } from "../../components/TableOfContents"; // TableOfContentsをインポートする
import styles from "../../styles/id.module.scss";

import { Sidebar } from "../../components/sidebar";
import Image from "next/image";
// SSG
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "noin", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "noin" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return {
    paths,
    // fallbackでpathがなければ404を返す
    fallback: false,
  };
};

export default function BlogId({ blog }) {
  const toc = renderToc(blog.body);
  console.log(toc);
  const microCMSLoader = ({ src, width, quality }) => {
    return `${src}?auto=format&fit=max&w=${width}`;
  };
  return (
    <div className={`${styles.main} grid grid-cols-5`}>
      <div className="col-span-1 col-start-4">
        <Sidebar />
      </div>
      <main className="text-center col-span-4 my-10 p-5 bg-slate-100 text-gray-800">
        <div className="bg-gray-100 col-span-4">
          <div className="flex p-8 text-blue-300">
            <p>Category / {blog.category}</p>
            <p className="ml-auto">{blog.publishedAt}</p>
          </div>
          <h1 className=" text-5xl pb-8 ml-10 text-gray-900 text-left font-sans font-light">
            {blog.title}
          </h1>
        </div>
        <div className="my-10">
          <Image
            className="h-80"
            loader={microCMSLoader}
            src={blog.thumbnail.url}
            height={500}
            width={500}
            alt="thumbnail"
            priority
          />
        </div>
        <div className="mt-20">
          {blog.toc_visible && <TableOfContents toc={toc} />}
        </div>

        <div
          className={`${styles.post}`}
          dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
        ></div>
      </main>
    </div>
  );
}
