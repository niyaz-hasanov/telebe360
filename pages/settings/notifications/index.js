import React from 'react';
import css from './css.module.css';
import { useState } from 'react';
import Image from 'next/image'
import Head from 'next/head';
import Link from 'next/link';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import Switch from '../../../components/switch_button/index'
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
                      src={'/chevron-left.svg'}
                      width={0}
                      height={0}
                      className={css.chevron_left}
                    /></Link>
                    <h3>Notifications</h3>
         </div>
          <div className={css.desktop_main}>
            <ul className={css.settings_ul}>
            <Link className={css.ul} href='/settings/my360id'><li >My360ID</li></Link>
             <Link  className={css.ul} href='/settings/security'> <li>Security</li></Link>
              <Link className={css.ul}  href='/settings/membership'><li >Membership</li></Link>
              <Link className={css.ul_360id} href='/settings/notifications'><li >Notifications</li></Link>
              <Link className={css.ul} href='/settings/references'><li >References</li></Link>
            </ul>
            {/* <div className={css.notification_div}>
                <ul className={css.notification_ul1}>
                 <li className={css.notification_li} id={css.li1}>
                    <p>Turn on the notification sound</p>
                    <button>Disable</button>
                 </li>
                 <li className={css.notification_li}>
                    <p>Show desktop notifications</p>
                    <button>Disable</button>
                 </li>
                 <li className={css.notification_li}>
                    <p>Email about suspicious sign in  attempts</p>
                    <button>Disable</button>
                 </li>
                 
                </ul>
                <ul className={css.notification_ul2} >
                <li className={css.notification_li} id={css.li1}>
                    <p>When the ticket you saved expired</p>
                    <button>Disable</button>
                 </li>
                 <li className={css.notification_li}>
                    <p>When the ticket you seved updated</p>
                    <button>Disable</button>
                 </li>
                </ul>
            </div> */}
            
             <ul className={css.mobile_ul}>
                <li className={css.mobile_li}>
                    <div className={css.mobile_li_left}>
                        <p id={css.p1}>E-mail notifications</p>
                        <p id={css.p2}>You will receive an e-mail about any notification regularly</p>
                    </div>
                    <div>
                    <Switch/>
                    </div>
                </li>
                <li className={css.mobile_li}>
                    <div className={css.mobile_li_left}>
                        <p id={css.p1}>In app notifications</p>
                        <p id={css.p2}>You will receive a notification inside the application</p>
                    </div>
                    <div>
                    <Switch/>
                    </div>
                </li>
                <li className={css.mobile_li}>
                    <div className={css.mobile_li_left}>
                        <p id={css.p1}>Update notification</p>
                        <p id={css.p2}>You will receive a notification about update application</p>
                    </div>
                    <div>
                    <Switch/>
                    </div>
                </li>
             </ul>
          </div>

        </div>
      </div>



    </>
  )
}