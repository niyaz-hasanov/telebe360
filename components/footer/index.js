import css from './css.module.css'
export default function Navbar (){
    return(
     <footer>
        <div className={css.footer_container}>
            <div className={css.footer_left}>
              <div className={css.footer_left_top}>
                <ul className={css.footer_left_top_ul}>
                    <li className={css.li_first}>Əməkdaşlıq</li>
                    <li>Websaytlar</li>
                    <li>Sosial şəbəkə</li>
                    <li>Brendinq</li>
                </ul>
                <ul className={css.footer_left_top_ul}>
                    <li className={css.li_first}>Haqqımızda</li>
                    <li>Proyektlərimiz</li>
                    <li>Karyeralar</li>
                    <li></li>
                </ul>
                <ul className={css.footer_left_top_ul}>
                    <li className={css.li_first}>Dəstək</li>
                    <li>Dəstək sorğusu</li>
                    <li>Əlaqə</li>
                    <li></li>
                </ul>
              </div>
              <div className={css.footer_left_bottom}>
                <p>© TELEBE360 MMC. All Rights Reserved. </p>
              <ul className={css.footer_left_bottom_ul}>
                <li>Privacy policy<span className={css.border_line}>|</span></li>
                <li>Terms of use <span className={css.border_line}>|</span></li>
                <li>FAQ <span className={css.border_line}>|</span></li>
                <li>Contact Us <span className={css.border_line}>|</span></li>
                <li>Site Map <span className={css.border_line}>|</span></li>
                <li> Blog </li>
              </ul>
              </div>
            </div>
            <div className={css.footer_right}>
              <p></p>
              <div className={css.app}></div>
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
        </div>
     </footer>
    )
}