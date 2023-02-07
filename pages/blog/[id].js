import { Francois_One } from '@next/font/google';
import { client } from '../../libs/client'
import { renderToc } from '../../libs/render-toc'; // 追加
import { TableOfContents } from '../../components/TableOfContents'; // TableOfContentsをインポートする
import styles from '../../styles/id.module.css'
// SSG
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: 'noin', contentId: id });

    return {
        props: {
            blog: data,
        },
    };
};

export const getStaticPaths = async() => {
    const data = await client.get({ endpoint: 'noin' })

    const paths = data.contents.map((content) => `/blog/${content.id}`);
    return {
        paths,
        // fallbackでpathがなければ404を返す
        fallback: false,
        
    } 
}




export default function BlogId({ blog }) {
    const toc = renderToc(blog.body);
    console.log(toc);
    return (
        <div className={styles.main}>
        <main className='text-center'>
            <div className='bg-gray-100'>
                <div className='flex p-8 text-blue-300'>
                <p>Category / { blog.category }</p>
                <p className='ml-auto'>{ blog.publishedAt }</p>
                </div>
                <h1 className=' text-5xl pb-8 ml-10 text-gray-900 text-left'>{ blog.title }</h1>


            </div>
            {blog.toc_visible && (
                <TableOfContents toc={toc} />
                )}

            <div className='text-left' dangerouslySetInnerHTML={{__html: `${blog.body}`}}></div>
        </main>
         </div>
    )
}

