import css from './home.module.css';
import Head from 'next/head';

import Link from 'next/link';
export default function Home() {
  return (
    <>
      <div className={css.body}>
        <style jsx global>{`
            body {
              margin: 0;
             
              background:#F5F4F5;
              padding:0;
              display:flex;
              flex-direction:column;
            }
      `}</style>
        <Head>
          <title>Tələbə360°</title>
          <link rel="icon" href="/home/360minilogo.ico" />
        </Head>





      </div>
      <div className={css.main_container}>
       <img src='/telebecoin_page.svg'
        className={css.fullscreen_image} 
       />

         <a id={css.link} href='/register'>ALSDKJALDKSAKLD</a>

      </div>

    
    </>
  )
}