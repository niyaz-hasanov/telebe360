import React from 'react';
import Head from 'next/head';
import css from './login.module.css'; 
import Image from 'next/image'
import Link from 'next/link';

export default function BeforeLogin() {
  const check_img = '/before_login_media/check.svg'
  return (
  <>
   <style jsx global>{`
            body {
              margin: 0;
              
            }
      `}</style>
      <Head>
        <title>Tələbə360°-a daxil olun</title>
        <link rel="icon" href="/home/360minilogo.svg" />
      </Head>
  <section className={css.section1 }>
   
      <div className={css.container}>
    <nav className={css.loginNav}>
    <Link href='/login'> <button className={css.loginLeftButton}>DAXİL OL</button></Link>
      <Link href={'/register'}><button className={css.loginRightButton}>İNDİ QOŞUL</button></Link>
    </nav>
       <div className={css.section1div}>
        <div className={css.logoDiv}>
       <Image src={'/before_login_media/telebe360logo.svg'} 
       width={0}
       height={0} className={css.img}/></div>
             </div>
      <div className={css.section1P}>
       <div className={css.section1pDiv}>
         <p className={css.section1p1}>Making money is a skill</p>
        <p className={css.section1p2}>We will <b>teach you</b> how to <b>master it</b></p></div>
       <div className={css.videodiv}> <Image
         src={'/before_login_media/videoframe.svg'}
         width={0}
         height={0}
         className={css.videoimg}
      /></div>
      
      </div>
      <div className={css.sec1but}><button>Tələbə360°-a Qoşul</button></div>
    </div>
    </section>
    <Image src={'/before_login_media/page_cross_line.svg'}
     width={0}
     height={0} className={css.cross_line}
    />
    <section className={css.section2}>
      <div className={css.sec2imgdiv}>
      <Image src={'/before_login_media/section2_logo.svg'}
     width={0}
     height={0} className={css.section2img}
    />
      </div>
      <div className={css.section2pdiv}>
      <Image src={'/before_login_media/section2_p.svg'}
     width={0}
     height={0} className={css.section2p}
    />
    <Image src={'/before_login_media/section2_orange_line.svg'}
    width={0}
    height={0} 
    className={css.sec2_orange_line}
    />
      </div>
      <div className={css.cloud_div}>
      <Image src={'/before_login_media/360_cloud.svg'}
     width={0}
     height={0} className={css.cloudimg}
    />
      </div>
      <div className={css.sec2_main_div}>
       <div className={css.sec2_main_div_left}>
       <Image src={'/before_login_media/section2_left_macbook.svg'}
     width={0}
     height={0} className={css.macbook}
    />
     <Image src={'/before_login_media/section2_left_ipad.svg'}
     width={0}
     height={0} className={css.ipad}
    />
       </div>
       <div className={css.sec2line}></div>
       <div className={css.sec2_main_div_right}>
          <ul>
            <li>  <span className={css.student_span}><Image src={'/before_login_media/telebe_icon.svg'} width={0} height={0} className={css.student}/></span>
                 <h2>New App, New Lessons</h2>
            </li>
            <li>  <Image src={check_img} width={0} height={0} className={css.check}/>
            <p>World-class custom built learning application</p></li>
            <li>  <Image src={check_img} width={0} height={0} className={css.check}/>
            <p>Scale from Zero to $10K/month as fast as possible</p></li>
            <li>  <Image src={check_img} width={0} height={0} className={css.check}/>
            <p>Master the skill you need to maximize your income</p>
            </li>
            
          </ul>
       </div>
      </div>
    </section>
    </>
  );
}