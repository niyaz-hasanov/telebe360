import React, { useState, useEffect } from 'react';
import css from './css.module.css';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import axios from 'axios';
import { APIURL } from '../../../utils/constants';
import toast from 'react-hot-toast';

export default function Home() {
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = Cookies.get('access_token');
        if (!token) {
          toast.error('Token bulunamadı.');
          return;
        }

        const response = await axios.get(`${APIURL}students/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        // backend: "referal_code"
        setReferralCode(data.referal_code);
      } catch (error) {
        toast.error(
          'Tələbə məlumatları alınanda xəta baş verdi. Zəhmət olmasa səhifəni yeniləyin'
        );
      }
    };

    fetchStudentData();
  }, []);

  const handleCopyReferral = async () => {
    if (!referralCode) {
      toast.error('Referal kod mövcud deyil.');
      return;
    }

    try {
      await navigator.clipboard.writeText(referralCode);
      toast.success('Referal kod uğurla kopyalandı');
    } catch (error) {
      toast.error('Referal kod kopyalanarkən xəta baş verdi');
    }
  };

  return (
    <>
      <div className={css.body}>
        <style jsx global>{`
          body {
            margin: 0;
            background: #F5F5F4;
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
              <Image
                src="/X.svg"
                width={0}
                height={0}
                className={css.X}
                alt="Close"
              />
            </Link>
          </div>

          {/* MOBIL HEADER */}
          <div className={css.mobile_title}>
            <Link href="/settings">
              <Image
                src="/chevron-left.svg"
                width={0}
                height={0}
                className={css.chevron_left}
                alt="Back"
              />
            </Link>
            <h3>Referanslar</h3>
          </div>

          <div className={css.desktop_main}>
            {/* SOL MENÜ */}
            <ul className={css.settings_ul}>
              <Link className={css.ul} href="/settings/my360id">
                <li>My360ID</li>
              </Link>
              <Link className={css.ul} href="/settings/security">
                <li>Təhlükəsizlik</li>
              </Link>
              <Link className={css.ul} href="/settings/membership">
                <li>Üzvlük</li>
              </Link>
              <Link className={css.ul} href="/settings/notifications">
                <li>Bildirişlər</li>
              </Link>
              <Link className={css.ul_360id} href="/settings/references">
                <li>Referanslar</li>
              </Link>
            </ul>

            {/* SAĞ TARAFTAKİ REFERAL KARTI */}
            <div className={css.references_content}>
                <p className={css.referral_title}>Mənim referal kodum</p>

                <button
                  type="button"
                  className={css.referral_code_btn}
                  onClick={handleCopyReferral}
                >
                  <span className={css.referral_code_text}>
                    {referralCode ? `#${referralCode}` : '#-----'}
                  </span>
                  <img
                    src="/copy.svg" // kendi kopyalama ikonunu koy
                    
                    className={css.referral_copy_icon}
                    alt="Copy"
                  />
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
