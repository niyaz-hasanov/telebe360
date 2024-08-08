import React from 'react';
import css from './css.module.css';
import { useState } from 'react';
import Image from 'next/image'
import Head from 'next/head';
import Link from 'next/link';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
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
                    <h3>My360ID</h3>
         </div>
          <div className={css.desktop_main}>
            <ul className={css.settings_ul}>
            <Link className={css.ul_360id} href='/settings/my360id'><li >My360ID</li></Link>
             <Link  className={css.ul} href='/settings/security'> <li>Security</li></Link>
              <Link className={css.ul} href='/settings/membership'><li >Membership</li></Link>
              <Link className={css.ul} href='/settings/notifications'><li >Notifications</li></Link>
              <Link className={css.ul} href='/settings/references'><li >References</li></Link>
            </ul>
            <form action="/settings/my360id">
              <ul className={css.my360id_ul}>
                <li className={css.my360id_li} id={css.my360_li}>
                  <div className={css.li1_left} id={css.li1_left}>
                  <Image
                      src={'/settings/pp.svg'}
                      width={0}
                      height={0}
                      className={css.ppp}
                    />
                    <div>
                    <h2 className={css.h2}>Personal info</h2>
                    <p className={css.p}>Update your photo and personal details here</p></div>
                  </div>
                  <div className={css.li1_right}>
                    <button id={css.li1but1}>Cancel</button>
                    <button id={css.li1but2} type="submit">Save Changes</button>
                  </div>
                </li>
                <li className={css.my360id_li} id={css.my360id_li}>
                  <div className={css.li1_left}  >
                    <h2>Name</h2>
                  </div>
                  <div className={css.li1_right}>
                    <input className={css.li2_right_input} type="text" value="" placeholder='Niyaz' />
                    <input className={css.li2_right_input} type="text" value="" placeholder='Həsənov' />
                  </div>
                </li>
                <li className={css.my360id_li} id={css.my360id_li}>
                  <div className={css.li1_left}>
                    <h2>Email</h2>
                  </div>
                  <div className={css.li1_right} id={css.special}>
                    <input className={css.li2_right_input} id={css.mail} type="mail" value="" placeholder='forexample@mail.com' />

                  </div>
                </li>
                <li className={css.my360id_li} id={css.my360id_li}>
                  <div className={css.li1_left}>
                    <h2>Your photo</h2>
                    <p>This photo will be displayed on your <a href='/settings/360id'>360ID</a></p>
                  </div>
                  <div className={css.li1_right} id={css.li4_right}>
                    <Image
                      src={'/settings/settingspp.svg'}
                      width={0}
                      height={0}
                      className={css.pp}
                    />
                    <label for="actual-btn" className={css.li2_right_input} id={css.file}>
                      <img src='https://img001.prntscr.com/file/img001/NIQRxo7vRAuboVftB8WnNA.png' />
                      <p><b>Click to upload</b> SVG,PNG  or JPG (max 800x400px)</p>
                    </label> 
                    <input className={css.li2_right_input} id="actual-btn" type="file" hidden />

                  </div>
                </li>
                <li className={css.my360id_li} id={css.my360id_li}>
                  <div className={css.li1_left}>
                    <h2>University</h2>
                  </div>
                  <div className={css.li1_right} id={css.special}>
                    <input className={css.li2_right_input} id={css.mail} type="text" value="" placeholder='Azerbaijan Technical University' />

                  </div>
                </li>
              </ul>
            </form>
          </div>

        </div>
      </div>



    </>
  )
}