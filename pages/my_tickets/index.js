import css from './css.module.css'
import Head from 'next/head'
import Ticket_qr from '../../components/ticket_qr/index'
const index = () => {
  return (
    <div className={css.ticket_div}>
      <style jsx global>{`
            body {
             
                background-color: #6363631a;
              
            }
      `}</style>
      <Head>
        <title>Biletlər</title>
        <link rel="icon" href="/home/360minilogo.svg" />
      </Head>
      <h1>Kuponlarım</h1>
      <ul className={css.ticket_ul}>
        <li className={css.ticket_li}>
          <div className={css.ticket_li_left}>
            <img src='/kfcpp.svg' />

            <p>KFC-Burger menu • Dəniz Mall • Bakı, Azərbaycan</p>
          </div>
          <div className={css.ticket_li_right} >
            <span className={css.ticket_li_right_button_1} id={css.qr}> <Ticket_qr /></span>
            <span className={css.ticket_li_right_button_1}>Bitdi</span>
            <span className={css.ticket_li_right_button_2}>20%</span>
            <span className={css.ticket_li_right_button_3}>Ləğv et</span>
          </div>
        </li>
        <li className={css.ticket_li}>
          <div className={css.ticket_li_left}>
            <img src='/kfcpp.svg' />
            <p>KFC-Burger menu • Dəniz Mall • Bakı, Azərbaycan</p>
          </div>
          <div className={css.ticket_li_right}>
            <span className={css.ticket_li_right_button_1} id={css.qr}> <Ticket_qr /></span>
            <span className={css.ticket_li_right_button_1}>Bitdi</span>
            <span className={css.ticket_li_right_button_2}>20%</span>
            <span className={css.ticket_li_right_button_3}>Ləğv et</span>
          </div>
        </li>
        <li className={css.ticket_li}>
          <div className={css.ticket_li_left}>
            <img src='/kfcpp.svg' />
            <p>KFC-Burger menu • Dəniz Mall • Bakı, Azərbaycan</p>
          </div>
          <div className={css.ticket_li_right}>
            <span className={css.ticket_li_right_button_1} id={css.qr}> <Ticket_qr /></span>
            <span className={css.ticket_li_right_button_1}>Bitdi</span>
            <span className={css.ticket_li_right_button_2}>20%</span>
            <span className={css.ticket_li_right_button_3}>Ləğv et</span>
          </div>
        </li>
      </ul>

    </div>
  )
}

export default index