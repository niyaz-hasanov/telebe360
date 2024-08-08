import React from 'react';
import css from './css.module.css';
import { useState } from 'react';
import Image from 'next/image'
import Head from 'next/head';
import Link from 'next/link';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import ComingSoon from '../../../components/coming_soon/index'
export default function Home() {
  return (
    <>
      <div className={css.body}>
        <style jsx global>{`
            body {
              margin: 0;
              background:#F5F5F4;
            }
      `}</style>
        <Head>
          <title>Tələbə360°</title>
          <link rel="icon" href="/home/360minilogo.svg" />
        </Head>




        <div className={css.main}>
         <div className={css.main_title}>  <h3>Settings</h3> 
       <Link href='/home'>  <Image
                      src={'/X.svg'}
                      width={0}
                      height={0}
                      className={css.X}
                    /></Link>
         </div>
         <div className={css.mobile_title}>
         <Link href='/settings'> 
           <Image
                      src={'/settings/goldchevron.svg'}
                      width={0}
                      height={0}
                      className={css.chevron_left}
                    /></Link>
                    <h3 className={css.title}>Membership</h3>
         </div>
          <div className={css.desktop_main}>
            <ul className={css.settings_ul}>
            <Link className={css.ul} href='/settings/my360id'><li >My360ID</li></Link>
             <Link  className={css.ul} href='/settings/security'> <li>Security</li></Link>
              <Link className={css.ul_360id} href='/settings/membership'><li >Membership</li></Link>
              <Link className={css.ul} href='/settings/notifications'><li >Notifications</li></Link>
              <Link className={css.ul} href='/settings/references'><li >References</li></Link>
            </ul>
           <div  className={css.comingsoon}>
             <ComingSoon/></div>
            {/* <div className={css.div}>
                     
                <h3 className={css.fontstabil} id={css.myplan}>My Plan</h3>
               <ul className={css.div_ul}>
                <li className={css.div_ul_li1}>
                    <div className={css.div_li1_top_div}>
                        <div className={css.div_li1_top_div_left}>
                        <p id={css.current}>Current plan</p>
                        <p className={css.myplan}> <Image
                         width={0}
                         height={0}
                         src={'/settings/myplan.svg'} id={css.myplanimg}
                         />My Plan</p>

                        <p id={css.trial_time}>Telebe360+ Trial (15 days left)</p>
                        <p id={css.next_trial}>Next payment: $5.00 on Sep 15, 2023 for the Premium plan. Started: August 16, 2023 </p>
                        </div>
                      
                        <div className={css.div_li1_top_div_right}>
                           <button id={css.go360}>Go Telebe360 now</button>
                           <button id={css.cancel}>Cancel Trial</button>
                        </div>
                    </div>
                    <span className={css.border}></span>
                    <div className={css.div_li1_bottom_div}>
                        <h3 className={css.fontstabil}>Status</h3>
                        <button id={css.active}>Active</button>
                    </div>
                </li>
                <li className={css.li2}>
                  <div className={css.card_left}> 
                    <h3 id={css.cardivo} className={css.fontstabil}><Image
                      width={0} height={0} src='/settings/carddet.svg' className={css.carddet}
                    /> Card details</h3>
                    <div className={css.but_div}> 
                    <button id={css.add}> <Image className={css.but_icon} width={0} height={0} src='/settings/add.svg'/> Add New Card</button>
                    <button id={css.change}><Image className={css.but_icon} width={0} height={0} src='/settings/change.svg'/> Change Card</button>
                         </div>
                  </div>
                  <div className={css.card_div}>
                    <Image
                    width={0}
                    height={0}
                    src='/settings/Cards.svg'
                    id={css.card}
                    />
                    <p id={css.card_number}>5495  7381  3759  2321</p>
                    <p id={css.card_cvv}>85952548****</p>
                    <p id={css.card_date}>09/25</p>
                  </div>
                </li>
               </ul>
            </div> */}
          </div>

        </div>
      </div>



    </>
  )
}