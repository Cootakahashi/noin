import { client } from '../../libs/client'
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
    console.log(paths)
    return {
        paths,
        // fallbackでpathがなければ404を返す
        fallback: false,
        
    } 
}

export default function BlogId({ blog }) {
    return (
        <main>
            <h1>{ blog.title }</h1>
            <p>{ blog.publishedAt }</p>
            <div dangerouslySetInnerHTML={{__html: `${blog.body}`}}></div>
        </main>
    )
}