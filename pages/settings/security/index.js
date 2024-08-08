"use client"
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
                            alt='exiticon'
                        /></Link>
                    </div>
                    <div className={css.mobile_title}>
                        <Link href='/settings'>
                            <Image
                                src={'/chevron-left.svg'}
                                width={0}
                                height={0}
                                className={css.chevron_left}
                                alt='chevron_left'
                            /></Link>
                        <h3>Security</h3>
                    </div>
                    <div className={css.desktop_main}>
                        <ul className={css.settings_ul}>
                            <Link className={css.ul} href='/settings/my360id'><li >My360ID</li></Link>
                            <Link className={css.ul_360id} href='/settings/security'> <li>Security</li></Link>
                            <Link className={css.ul} href='/settings/membership'><li >Membership</li></Link>
                            <Link className={css.ul} href='/settings/notifications'><li >Notifications</li></Link>
                            <Link className={css.ul} href='/settings/references'><li >References</li></Link>
                        </ul>
                        <form action="/">
                            <ul className={css.my360id_ul}>
                               
                                <li className={css.password_li_mobile}>
                                   <div className={css.pass_li_mob_left}>
                                    <div >
                                        <Image
                                        width={0}
                                        height={0}
                                        src='/settings/keyo.svg'
                                        id={css.key}
                                        alt='keyicon'
                                        />
                                    </div>
                                    <div className={css.pass_li_mob_left_form}> 
                                        <h2 >Şifrəni dəyiş</h2>
                                        <input  type="password" value='' placeholder='•••••••••••••' />
                                        
                                    </div>
                                   </div>
                                   <div>
                                   <button id={css.pass_mob_but} value='' type="submit">Təsdiq</button>
                                   </div>
                                </li>
                                 {/* <li className={css.my360id_li} id={css.password}>
                                    <div className={css.li1_left} id={css.li1_left}>
                                       
                                        <div>
                                            <h2 className={css.h2}>Password</h2>
                                        </div>
                                    </div>
                                    <div className={css.li1_right}>
                                        <input className={css.li2_right_input} type="password" value="" placeholder='*********' />
                                        <button id={css.li1but2} type="submit">Change</button>
                                    </div>
                                </li> */}
                                {/* <li className={css.autentli}>
                                    <div className={css.autentificationtop}>
                                        <h3>Two-Factor Autentication</h3>
                                        <p>Effective protection against hacking: in order to log in, you should enter a one-time code
                                            received via SMS or another chosen method </p>
                                    </div>
                                    <ul className={css.aut_ul}>
                                        <li>
                                        <li className={css.my360id_li}  id={css.autli}>
                  <div className={css.li1_left} >
                  <Image
                      src={'/settings/authent.svg.svg'}
                      width={0}
                      height={0}
                      className={css.ppp}
                    />
                    <div className={css.piddiv}>
                    <h2 className={css.h2}>Authenticator App</h2>
                    <p  className={css.p2} >Retrieve codes from an authentication app on your device, like Google Authenticator, Duo Mobile or Authy.</p></div>
                  </div>
                  <div className={css.li1_right}>
                    
                    <button className={css.enable} type="submit">Enable</button>
                  </div>
                </li> 
                                        </li>
                                        <li>
                                        <li className={css.my360id_li}  id={css.autli}>
                  <div className={css.li1_left} >
                  <Image
                      src={'/settings/sms.svg'}
                      width={0}
                      height={0}
                      className={css.ppp}
                    />
                    <div>
                    <h2 className={css.h2}>Sms verification</h2>
                    <p className={css.p2}>Receive a text message to your mobile devices when signing in.</p></div>
                  </div>
                  <div className={css.li1_right}>
                    
                    <button className={css.enable} type="submit">Enable</button>
                  </div>
                </li> 
                                        </li>
                                        <li>
                                        <li   id={css.autli}>
                  <div className={css.li1_left} >
                  <Image
                      src={'/settings/backup.svg'}
                      width={0}
                      height={0}
                      className={css.ppp}
                    />
                    <div className={css.li1_titles}>
                    <h2 className={css.h2}>Backup codes</h2>
                    <p className={css.p2}>These can be used for authorization if you do not have access to your phone.</p></div>
                  </div>
                  <div className={css.li1_right}>
                    
                    <button id={css.li1but2} type="submit">Generate new codes</button>
                  </div>
                </li> 
                                        </li>
                        
                                    </ul>
                                </li>
                                <li id={css.devices} className={css.autentli}>
                                    <div className={css.autentificationtop}>
                                        <h3>Session History</h3>
                                        <p>Sessions means information about times and last used devices. It basically lets you keep track of usage.
This could be helpful if you suspect that someone has access to your profile.</p>
                                    </div>
                                    <ul className={css.aut_ul}>
                                        
                                        <li className={css.my360id_li}  id={css.autli}>
                  <div className={css.li1_left} >
                  <Image
                      src={'/settings/phone.svg'}
                      width={0}
                      height={0}
                      className={css.ppp}
                    />
                    <div>
                    <h2 className={css.h2}>Iphone 14 Pro</h2>
                    <p className={css.p}>Baku •  Mobile App  •  10.10.245.35</p></div>
                  </div>
                  <div className={css.li1_right}>
                    
                    <button id={css.active} className={css.enable}  type="submit">Active Now</button>
                  </div>
                </li> 
                                        
                                        
                                        <li className={css.my360id_li}  id={css.autli}>
                  <div className={css.li1_left} >
                  <Image
                      src={'/settings/computer.svg'}
                      width={0}
                      height={0}
                      className={css.ppp}
                    />
                    <div>
                    <h2 className={css.h2}>Windows</h2>
                    <p className={css.p}>Baku  •  Opera GX Web  •  20.20.192.32</p></div>
                  </div>
                  <div className={css.li1_right}>
                    
                    <button id={css.inactive} className={css.enable} type="submit">Log Out</button>
                  </div>
                </li> 
                 
                <li id={css.butli} className={css.my360id_li} >
                  <div className={css.li1_left}  >
                     <button id={css.terminate}>Terminate all Sessions</button>
                    <div>
                      </div>
                  </div>
                  <div className={css.li1_right}>
                    
                    
                  </div>
                </li> 
                                       
                                        
                        
                                    </ul>
                                </li> */}
                            </ul>
                        </form>
                    </div>

                </div>
            </div>



        </>
    )
}