import React from 'react';
import css from './home.module.css'; 
import { useState } from 'react';
import Image from 'next/image'
import Carousel from "../components/desk_carousel/carousel"
import MobileCarousel from '../components/mobile_carousel/carousel'
import Head from 'next/head';
import MobileWeeklyBests from '../components/mobile_weekly_bests_carousel/carousel'
import DeskWeeklyBests from '../components/desk_weekly_bests/carousel'
import DeskAddCarousel2 from '../components/desk_carousel_2/carousel'
import MobAddCarousel2 from '../components/mobile_carousel_2/carousel'
import Footer from '../components/footer/index'
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
      <div className={css.banner}>
        <Carousel/>
      </div>
      <div className={css.mobilebanner}>
        <MobileCarousel/>
      </div>
      
      {/* <div className={css.categories_div}>
        <p>Kategoriyalar</p>
       <ul className={css.categories_ul}>
        <li className={css.categories_li}>
          <div  className={css.category_li}>
        <Image
         src={'/home/Fashion.svg'}
         width={0}
         height={0}
         className={css.category_div}
      /></div>
      <p className={css.category_p}> Fashion</p>
        </li>
        <li className={css.categories_li}>
          <div  className={css.category_li}>
        <Image
         src={'/home/Food.svg'}
         width={0}
         height={0}
         className={css.category_div}
      /></div>
      <p className={css.category_p}>Food</p>
        </li>
        <li className={css.categories_li}>
          <div  className={css.category_li}>
        <Image
         src={'/home/Fitness.svg'}
         width={0}
         height={0}
         className={css.category_div}
      /></div>
      <p className={css.category_p}>Fitness</p>
        </li>
        <li className={css.categories_li}>
          <div  className={css.category_li}>
        <Image
         src={'/home/Technology.svg'}
         width={0}
         height={0}
         className={css.category_div}
      /></div>
      <p className={css.category_p}>Technology</p>
        </li>
        <li className={css.categories_li}>
          <div  className={css.category_li}>
        <Image
         src={'/home/Travel.svg'}
         width={0}
         height={0}
         className={css.category_div}
      /></div>
      <p className={css.category_p}>Travel</p>
        </li>
        
       </ul>
      </div> */}

    
      <div className={css.add2desk}><DeskAddCarousel2/></div>
      <div className={css.add2mob}><MobAddCarousel2/></div>
     </div>
  <Footer/>
  
     </>
    )
}