import React from 'react';
import css from './kfc.module.css';
import { useState } from 'react';
import Image from 'next/image'
import Head from 'next/head';
import Link from 'next/link';
import Alert from '../../components/ticket_alert/index'
export default function Home() {
  return (
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
      <div className={css.container}>
        <div className={css.kfcbanner}>
          <div className={css.overlay}>
            <div className={css.div}>
              <div className={css.top}><img className={css.icon} src='/leftarrow.svg' /><p className={css.paragraph}>KFC   Dəniz Mall • Bakı, Azərbaycan</p>
                <div className={css.topleft}><img className={css.icon} src='/whitebookmark.svg' />
                  <img className={css.icon} id={css.itkin} src='/share.svg' />
                </div>
              </div>
              <div className={css.bottom}>
                <div className={css.bottom_left}>
                  <img className={css.kfcpp} src='/kfcpp.svg' />
                 <div>
                   <span id={css.wolt}>Wolt</span>
                    <span id={css.day}>Bugün</span>
                    <span id={css.percent}>20%</span>
                    </div>
                </div>
                <div>
               <Alert/>
                  
                </div>
              </div>
            </div>
          </div>
          <img className={css.bannerr} src='/kfcbanner.svg' />

        </div>
        <div className={css.textdiv}>
          <h3>KFC haqqında</h3>
          <p id={css.textdivp}>KFC olaraq qısaldılmış Kentucky Fried Chicken, otlar və ədviyyatların gizli qarışığı ilə ədviyyatlı
            qızardılmış toyuqları ilə məşhur olan qlobal fast-food şəbəkəsidir. 1952-ci ildə
            polkovnik Harland Sanders tərəfindən əsası qoyulan bu restonalar şəbəkəsi, dünya miqyasında genişlənərək, müxtəlif
            toyuq əsaslı yeməklər, kartof püresi və lahana salatı kimi yan yeməklər təqdim edir və qırmızı
            və ağ rəngli brendi və "Barmaqlarınızı yalayın" şüarı ilə tanınır. Dünyada minlərlə filialları ilə
            KFC fast-food sahəsində görkəmli ad olaraq qalır.</p>
          <button className={css.getbutton}>əldə et</button>
        </div>

      </div>

    </>
  )
}