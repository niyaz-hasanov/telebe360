import React from 'react'
import css from './css.module.css'
import Link from 'next/link'
import Head from 'next/head'
const index = () => {
  return (
    <div >

      <style jsx global>{`
            body {
              display:Flex;
              flex-direction:column;
              align-items:center;
              
                background-color: #6363631a;
              
            }
          
      `}</style>
      <Head>
        <title>Bildirişlər</title>
        <link rel="icon" href="/home/360minilogo.svg" />
      </Head>

      <div className={css.notification_top_div}>
        <h2 className={css.notification_h2}> Bildirişlər</h2>
        <Link href='/home'> <img src='/X.svg' className={css.X}/></Link>
      </div>
      <div className={css.information_div}>
        <img className={css.alarm_img} src='/alertalt.svg' />
        <div className={css.information_div_right}>
          <h3 className={css.information_h3}>Information</h3>
          <p className={css.information_p}>Please note that there might be a brief delay in securing your seats at the theater while processing your ticket purchase</p>
        </div>
      </div>
      <ul className={css.notifications_ul}>
        <li>
          <div className={css.li_div}><div className={css.li_div_left}><span className={css.dot}></span><img src='/ticket.svg'  className={css.li_img}/> <p className={css.li_p}>50% Off Extravaganza: Grab Your Movie
          Tickets at Half the Price!</p></div>
          <span className={css.time_div}><p className={css.time}>21:00</p></span>
          </div>
          </li>
          <li>
          <div className={css.li_div}><div className={css.li_div_left}><span className={css.dot}></span><img src='/ticket.svg'  className={css.li_img}/> <p className={css.li_p}>50% Off Extravaganza: Grab Your Movie
          Tickets at Half the Price!</p></div>
          <span className={css.time_div}><p className={css.time}>21:00</p></span>
          </div>
          </li>
      </ul>
    </div>
  )
}

export default index