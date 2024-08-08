import React from 'react';
import css from './css.module.css'; 
import { useState } from 'react';
import Image from 'next/image'
import Head from 'next/head';
import Link from 'next/link';
export default function Home (){
    return(
        <>
     <div className={css.body}>
         <style jsx global>{`
            body {
              margin: 0;
              background:#F2F3F2;
            }
      `}</style>
<Head>
        <title>Tələbə360°</title>
        <link rel="icon" href="/home/360minilogo.svg" />
      </Head>


     
     </div>
     <div className={css.main_container}>
      <div>
        <Image 
        src={'/bannerad.svg'}
        width={0}
        height={0}
        className={css.banner}
        />
      </div>
      <div>
        <Image 
        src={'/mobilebanner.svg'}
        width={0}
        height={0}
        className={css.mobilebanner}
        />
      </div>
      
      
     <div className={css.card_div}>
      
     <div className={css.card}>
      <div className={css.cardtop}><span className={css.ppdiv}><Image src={'/profile.jpg'} width={1000} height={1000} className={css.card_pp}/></span>
      <Image className={css.bookmarkcard} src={'/home/bookmark.svg'} width={100} height={100}/></div>
      <div className={css.card_p}>
      <h3>Offers Card</h3>
      <p>Offers adress</p></div>
      <div className={css.but_div}> <button className={css.woltbut}>Online</button>
      <button className={css.todaybut}>Today</button>
      <span className={css.percent}>20%</span>
      </div>
     </div>
  
     <div style={{border:'0.2vw solid  #FF8A00'}} className={css.card}>
      <div className={css.cardtop}><span style={{borderColor:'#FF8A00'}} className={css.ppdiv}><Image src={'/profile.jpg'} width={1000} height={1000} className={css.card_pp}/></span>
      <Image className={css.bookmarkcard} src={'/goldbook.svg'} width={100} height={100}/></div>
      <div className={css.card_p}>
      <h3>Offers Card</h3>
      <p>Offers adress</p></div>
      <div className={css.but_div}> <button className={css.woltbut}>Online</button>
      <button className={css.todaybut}>Today</button>
      <span style={{color:'#FF8A00'}} className={css.percent}>20%</span>
      </div>
     </div>
     
     <div className={css.card}>
      <div className={css.cardtop}><span className={css.ppdiv}><Image src={'/profile.jpg'} width={1000} height={1000} className={css.card_pp}/></span>
      <Image className={css.bookmarkcard} src={'/home/bookmark.svg'} width={100} height={100}/></div>
      <div className={css.card_p}>
      <h3>Offers Card</h3>
      <p>Offers adress</p></div>
      <div className={css.but_div}> <button className={css.woltbut}>Online</button>
      <button className={css.todaybut}>Today</button>
      <span className={css.percent}>20%</span>
      </div>
     </div>


     <div className={css.card}>
      <div className={css.cardtop}><span className={css.ppdiv}><Image src={'/profile.jpg'} width={1000} height={1000} className={css.card_pp}/></span>
      <Image className={css.bookmarkcard} src={'/home/bookmark.svg'} width={100} height={100}/></div>
      <div className={css.card_p}>
      <h3>Offers Card</h3>
      <p>Offers adress</p></div>
      <div className={css.but_div}> <button className={css.woltbut}>Online</button>
      <button className={css.todaybut}>Today</button>
      <span className={css.percent}>20%</span>
      </div>
     </div>


     <div className={css.card}>
      <div className={css.cardtop}><span className={css.ppdiv}><Image src={'/profile.jpg'} width={1000} height={1000} className={css.card_pp}/></span>
      <Image className={css.bookmarkcard} src={'/home/bookmark.svg'} width={100} height={100}/></div>
      <div className={css.card_p}>
      <h3>Offers Card</h3>
      <p>Offers adress</p></div>
      <div className={css.but_div}> <button className={css.woltbut}>Online</button>
      <button className={css.todaybut}>Today</button>
      <span className={css.percent}>20%</span>
      </div>
     </div>


     <div className={css.card}>
      <div className={css.cardtop}><span className={css.ppdiv}><Image src={'/profile.jpg'} width={1000} height={1000} className={css.card_pp}/></span>
      <Image className={css.bookmarkcard} src={'/home/bookmark.svg'} width={100} height={100}/></div>
      <div className={css.card_p}>
      <h3>Offers Card</h3>
      <p>Offers adress</p></div>
      <div className={css.but_div}> <button className={css.woltbut}>Online</button>
      <button className={css.todaybut}>Today</button>
      <span className={css.percent}>20%</span>
      </div>
     </div>
    
  
     </div>
     
     </div>
  
     <Image src={'/home/Footer.svg'}
     width={1000}
     height={1000}
     className={css.footer}
     />
     </>
    )
}