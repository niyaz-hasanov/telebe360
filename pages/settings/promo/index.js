import React, { useState } from 'react';
import css from './css.module.css';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from "../../../utils/toastLimited";

import { APIURL } from '../../../utils/constants';

export default function Home() {
  const [promoCode, setPromoCode] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyPromo = async (e) => {
    e.preventDefault();

    const code = promoCode.trim();
    if (!code) {
      setIsInvalid(true);
      toast.error('Promo kod daxil edin!');
      return;
    }

    try {
      setIsLoading(true);
      setIsInvalid(false);

      const token = Cookies.get('access_token');

      const res = await axios.post(
        `${APIURL}promos/use`,
        { code },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            'Content-Type': 'application/json',
          },
        }
      );

      // SUCCESS
      toast.success(
        `Promo kod uğurla tətbiq edildi! Cari balans: ${res?.data?.new_balance ?? 0} coin`
      );
      setPromoCode('');

    } catch (err) {
      setIsInvalid(true);

      const detailRaw =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        '';

      const detail = typeof detailRaw === 'string'
        ? detailRaw.toLowerCase()
        : '';

      /* ===== DETAIL MAPPING ===== */
      if (detail.includes('already used')) {
        toast.error('Siz artıq bu promo koddan istifadə etmisiniz');
      } 
      else if (detail.includes('expired')) {
        toast.error('Promo kodun etibarlılıq müddəti bitib');
      } 
      else if (detail.includes('not valid') || detail.includes('invalid')) {
        toast.error('Yanlış promo kod!');
      }
      else if (detail.includes('not eligible')) {
        toast.error('Bu promo kod sizə uyğun deyil');
      }
      else if (detail.includes('not applicable')) {
        toast.error('Promo kod bu xidmət üçün keçərli deyil');
      }
      else if (detail.includes('not found')) {
        toast.error('Yanlış promo kod!');
      }
      else {
        toast.error('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
      }

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={css.body}>
        <style jsx global>{`
          body {
            margin: 0;
            background: #f5f5f4;
          }
        `}</style>

        <Head>
          <title>Tələbə360°</title>
          <link rel="icon" href="/home/360minilogo.ico" />
        </Head>

        <div className={css.main}>
          {/* DESKTOP HEADER */}
          <div className={css.main_title}>
            <h3>Tənzimləmələr</h3>
            <Link href="/settings">
              <Image src="/X.svg" width={0} height={0} className={css.X} alt="close" />
            </Link>
          </div>

          {/* MOBILE HEADER */}
          <div className={css.mobile_title}>
            <Link href="/settings">
              <Image
                src="/chevron-left.svg"
                width={0}
                height={0}
                className={css.chevron_left}
                alt="back"
              />
            </Link>
            <h3 className={css.title}>Promo Kod</h3>
          </div>

          <div className={css.desktop_main}>
            {/* SETTINGS MENU */}
            <ul className={css.settings_ul}>
              <Link className={css.ul} href="/settings/my360id"><li>My360ID</li></Link>
              <Link className={css.ul} href="/settings/security"><li>Təhlükəsizlik</li></Link>
              <Link className={css.ul_360id} href="/settings/promo"><li>Promo Kod</li></Link>
              <Link className={css.ul} href="/settings/membership"><li>Üzvlük</li></Link>
              <Link className={css.ul} href="/settings/notifications"><li>Bildirişlər</li></Link>
              <Link className={css.ul} href="/settings/references"><li>Referanslar</li></Link>
            </ul>

            {/* PROMO CONTENT */}
            <div className={css.promoWrap}>
              <div className={css.promoTop}>
                <h4 className={css.promoHeader}>Promo kod</h4>

                <form className={css.promoRow} onSubmit={handleApplyPromo}>
                  <input
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      if (isInvalid) setIsInvalid(false);
                    }}
                    placeholder="Promo kod daxil edin"
                    className={`${css.promoInput} ${isInvalid ? css.promoInputError : ''}`}
                    disabled={isLoading}
                  />
                  <button className={css.applyBtn} disabled={isLoading} type="submit">
                    {isLoading ? '..................' : 'Göndər'}
                  </button>
                </form>

                <p className={css.promoHint}>
                  *Promo kodlar məhdud zaman üçün aktiv olur.
                </p>
              </div>

              <div className={css.divider}></div>

              <div className={css.section}>
                <h3 className={css.sectionTitle}>Promo kod niyə işləmir?</h3>
                <div className={css.whiteBox}>
                  <ul className={css.bullets}>
                    <li>• Kod səhv daxil edilib</li>
                    <li>• Promo kodun etibarlılıq müddəti bitib</li>
                    <li>• Kod artıq istifadə olunub</li>
                    <li>• Promo kod bu xidmət üçün keçərli deyil</li>
                  </ul>
                </div>
              </div>

              <div className={css.section}>
                <h3 className={css.sectionTitle}>Promo kodu haradan əldə edə bilərəm?</h3>
                <div className={css.whiteBox}>
                  <ul className={css.bullets}>
                    <li>• Sosial media hesablarımızdan</li>
                    <li>• Xüsusi tədbirlər və partnyor əməkdaşlıqlar vasitəsilə əldə edə bilərsən</li>
                  </ul>
                </div>
              </div>

              <div className={css.section}>
                <h3 className={css.sectionTitle}>Promo hansı xidmətlərə aiddir?</h3>
                <div className={css.whiteBox}>
                  <p className={css.boxText}>
                    Promo kodlar yalnız müəyyən Telebe360 xidmətlərinə şamil olunur.
                    Hansı xidmətlərdə keçərli olduğu promo tətbiq edilərkən və ya kampaniya
                    şərtlərində göstərilir.
                  </p>
                </div>
              </div>
            </div>
            {/* /PROMO CONTENT */}
          </div>
        </div>
      </div>
    </>
  );
}
