// components/footer/index.jsx
import { useState } from 'react';
import css from './css.module.css';
import Feedback from '../feedback_modal/modal';

const SECTIONS = [
  {
    title: 'Partnership',
    links: [
      { label: 'Websites', href: '#' },
      { label: 'Social Media', href: '#' },
      { label: 'Branding', href: '#' },
    ],
  },
  {
    title: 'About',
    links: [
      {
        label: 'Our project',
        href: 'https://www.intechmain.com/',
        external: true,
      },
      {
        label: 'Careers',
        href: 'https://instagram.com/intech.academy/',
        external: true,
      },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Support Request', href: '#' },
      { label: 'Contact', href: '/technical_support' },
      { label: 'Feedback', href: '#' },
    ],
  },
];

export default function Footer() {
  // ❗ Artık tek index değil, her section için ayrı state tutuyoruz
  const [openSections, setOpenSections] = useState({}); // {0: true, 1: false, ...}

  const handleLoginClick = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSditFI3TYNQCBpO-OJXvoypfpTXFbBMBpFumOffomGRJcNPBg/viewform',
      '_blank'
    );
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index], // sadece tıklananı tersine çeviriyoruz
    }));
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
            {SECTIONS.map((section, index) => {
              const isOpen = !!openSections[index];

              return (
                <div key={section.title} className={css.footer_section}>
                  {/* Başlık (desktop: normal, mobile: accordion butonu) */}
                  <button
                    type="button"
                    className={css.section_header}
                    onClick={() => toggleSection(index)}
                  >
                    <span>{section.title}</span>
                    <span
                      className={`${css.chevron} ${
                        isOpen ? css.chevron_open : ''
                      }`}
                    >
                      <img src="/footer_chevron_down.svg" alt="" />
                    </span>
                  </button>

                  <ul
                    className={`${css.footer_column} ${
                      isOpen ? css.open : ''
                    }`}
                  >
                    {section.links.map((link) => (
                      <li key={link.label}>
                        {link.href ? (
                          <a
                            href={link.href}
                            target={link.external ? '_blank' : undefined}
                            rel={link.external ? 'noreferrer' : undefined}
                          >
                            {link.label}
                          </a>
                        ) : (
                          link.label
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className={css.footer_middle_bottom}>
            <ul className={css.footer_middle_bottom_ul}>
              <li>
                Terms of service<span className={css.border_line}> |</span>
              </li>
              <li>
                Privacy Policy<span className={css.border_line}> |</span>
              </li>
              <li>
                Terms of use<span className={css.border_line}> |</span>
              </li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>

        {/* SAĞ */}
        <div className={css.footer_right}>
          <p className={css.register_text}>Şirkət hesabınızla qeydiyyatdan keçin!</p>
          <button onClick={handleLoginClick} className={css.loginButton}>
            Şirkət qeydiyyatı
          </button>
          <p className={css.register_text}>Rəy və təkliflərinizi bizimlə bölüşün!</p>
          <Feedback />
        </div>
      </div>
    </footer>
  );
}
