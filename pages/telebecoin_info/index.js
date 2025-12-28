import css from './home.module.css';
import Head from 'next/head';
import Faq from '../../components/faq_accordion/index'
import Link from 'next/link';
import { useState } from "react";

export default function Coin_page() {
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
        <section className={css.section1}>
          
            <h2>Tələbə Coin nədir?</h2>
            <div className={css.section1_div}>
              <p className={css.section1_p}>
                Tələbə Coin sizin üçün xüsusi hazırlanmış rəqəmsal valyutadır.
                 Bu coin-lər vasitəsilə siz platformamızda biletlər əldə edə, endirimlərdən 
                 yararlana və xüsusi fürsətlər qazana bilərsiniz. Onlar həm əyləncəli, həm də faydalı bir sistemdir.
              </p>
              <img className={css.section1_coin_img} src='/coin_page_section1_coins_img.svg' />
            </div>
          </section>
          <section className={css.section2}>
            <h2> Tələbə Coin-ləri necə qazanmaq olar?</h2>
            <div className={css.section2_cards}>
              <span className={css.section2_card}>
                <img className={css.section2_card_img} src='/coin_page_section2_book.svg'/>
                <p className={css.section2_card_p}>Kursları tamamlamaqla</p>
                </span>
              <span className={css.section2_card}>
                <img className={css.section2_card_img} src='/coin_page_section2_tag.svg'/>
                <p className={css.section2_card_p}>Dostlarınızı dəvət etmək </p>
                </span>
                <span className={css.section2_card}>
                <img className={css.section2_card_img} src='/coin_page_section2_ticket.svg'/>
                <p className={css.section2_card_p}>Platforma fəaliyyətləri</p>
                </span>
            </div>
            
          </section>
          <section className={css.section3_register}>
              <div className={css.section3_register_left}>
                <div>
                <h2 id={css.section3_h2}>Başlamaq üçün indi qeydiyyatdan keç!</h2>
                <p className={css.section3_register_left_p}>Tələbə Coin, tələbələrə öz büdcələrini daha ağıllı idarə etmək, 
                  xüsusi endirimlərdən yararlanmaq və bonuslar qazanmaq imkanı
                   yaradan yenilikçi bir rəqəmsal platformadır.</p>
                 </div>
                  <button>
                    <a href='/register' >
                    Hesab yarat</a>
                  </button>
              </div>
              <div className={css.section3_register_right}>
                <img src='/coin_page_section2_phone_img.svg'/>
              </div>
            </section>
          <section className={css.section4}>
  <h2>Dostunu çağır, Coin qazan!</h2>

  <picture>
    <source
      media="(max-width: 768px)"
      srcSet="/coin_page_section3_dots_mobile.svg"
    />
    <img src="/coin_page_section3_dots.svg" alt="" />
  </picture>
</section>

          <section className={css.section5}>
           <h2>Tez-tez verilən suallar</h2>
             <Faq/>
          </section>
         <section className={css.section3_register}>
              <div className={css.section3_register_left}>
                <div>
                <h2>İlk Tələbə Coin’i qazan!</h2>
                <p className={css.section3_register_left_p}>
                  Aktiv ol, seçil və qazananlardan biri ol. Telebe Coin səni hər addımda dəstəkləyir. İmkanlar aktiv tələbələr üçündür.İndi qoşul və coin qazan.
                </p>
                 </div>
                  <button>
                    <Link href='/register' >
                    Qeydiyyatdan keç</Link>
                  </button>
              </div>
              <div className={css.section3_register_right}>
                <img id={css.img} src='/coin_page_section2_phone_img.svg'/>
              </div>
            </section>

      </div>


    </>
  )
}