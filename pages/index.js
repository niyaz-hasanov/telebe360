import React from 'react';
import css from './home.module.css';
import { useState } from 'react';
import Image from 'next/image'
import Carousel from "../components/desk_carousel/carousel"
import MobileCarousel from '../components/mobile_carousel/carousel'
import Head from 'next/head';
import Table4 from '../components/all_tickets_table_4/table'
import DeskAddCarousel2 from '../components/desk_carousel_2/carousel'
import MobAddCarousel2 from '../components/mobile_carousel_2/carousel'
import Footer from '../components/footer/index'

import Link from 'next/link';
export default function Home() {
  return (
    <>
      <div className={css.body}>
        <style jsx global>{`
            body {
              margin: 0;
              background:#F5F4F5;
            }
      `}</style>
        <Head>
          <title>Tələbə360°</title>
          <link rel="icon" href="/home/360minilogo.ico" />
        </Head>





      </div>
      <div className={css.main_container}>
        <div className={css.banner}>
          <Carousel />
        </div>
        <div className={css.mobilebanner}>
          <MobileCarousel />
        </div>
        
      
        <div className={css.ticket_table_div}>
          <h2 className={css.ticket_table_h2}>Bütün biletlər</h2></div>

        <div className={css.table_div}>
          <Table4 />
        </div>





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

    </>
  )
}