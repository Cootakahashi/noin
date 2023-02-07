
import styles from '../styles/Table.module.css'

// 三項演算子のif分
// const body = tab === 'list' ? < List/> : <Form/>
export const TableOfContents = ({ toc }) => {
    return (
      
        <div className="border pb-10 w-80 m-auto">
          <p className="TableOfContentsHead font-bold">目次</p>
          <ol>
            {toc.map(data => (

              <li key={data.id} className={data.name}>
                <div className='text-left'>

                <a href={`#${data.text}`} className={styles.table}>
                  {data.text}
                  {data.name}
                  
                </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
     
    );
  };