// components/footer/index.jsx
import css from './css.module.css';
import Feedback from '../feedback_modal/modal';
export default function Footer() {
  const handleLoginClick = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSditFI3TYNQCBpO-OJXvoypfpTXFbBMBpFumOffomGRJcNPBg/viewform',
      '_blank'
    );
  };

  return (
    <footer className={css.footer}>
      <div className={css.footer_container}>
        {/* SOL */}
        <div className={css.footer_left}>
          <div className={css.logo_block}>
            <img src="/footer_360logo.svg" alt="Telebe360" />
          </div>

          <ul className={css.social_list}>
            <li>
              <img className={css.social_icon} src="/Facebook.svg" alt="Facebook" />
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/telebe360/"
                target="_blank"
                rel="noreferrer"
              >
                <img className={css.social_icon} src="/Linkedinnew.svg" alt="LinkedIn" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/telebe360/"
                target="_blank"
                rel="noreferrer"
              >
                <img className={css.social_icon} src="/Instagramnew.svg" alt="Instagram" />
              </a>
            </li>
          </ul>

          <p className={css.sign}>© TELEBE360 MMC. All Rights Reserved.</p>
        </div>

        {/* ORTA */}
        <div className={css.footer_middle}>
          <div className={css.footer_middle_top}>
            <ul className={css.footer_column}>
              <li className={css.li_first}>Partnership</li>
              <li>Websites</li>
              <li>Social Media</li>
              <li>Branding</li>
            </ul>

            <ul className={css.footer_column}>
              <li className={css.li_first}>About</li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.intechmain.com/"
                >
                  Our Projects
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://instagram.com/intech.academy/"
                >
                  Careers
                </a>
              </li>
            </ul>

            <ul className={css.footer_column}>
              <li className={css.li_first}>Support</li>
              <li>Support Request</li>
              <li>
                <a href="/technical_support">Contact</a>
              </li>
              <li>Feedback</li>
            </ul>
          </div>

          <div className={css.footer_middle_bottom}>
            <ul className={css.footer_middle_bottom_ul}>
              <li>Terms of service<span className={css.border_line}> |</span></li>
              <li>Privacy Policy<span className={css.border_line}> |</span></li>
              <li>Terms of use<span className={css.border_line}> |</span></li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>

        {/* SAĞ */}
        <div className={css.footer_right}>
          <button onClick={handleLoginClick} className={css.loginButton}>
            Şirkət qeydiyyatı
          </button>
          <Feedback/>
        </div>
      </div>
    </footer>
  );
}

