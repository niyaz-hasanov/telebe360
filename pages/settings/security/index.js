"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import css from './css.module.css';
import { MAINURL } from '../../../utils/constants';

export default function Home() {
  const [password, setPassword] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();


    try {
        const accessToken = Cookies.get('access_token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        const data = {
            password: password,
        };

        await axios.put(`${MAINURL}api/v1/students/`, data, config);

        toast.success('Şifrəniz uğurla dəyişdirildi!');
    } catch (error) {
      if (error.response && error.response.status === 422) {
    
        toast.error('Şifrənizin uzunluğu ən az 8 simvoldan ibarət olmalıdır.Ən az 1 böyük hərf, 1 rəqəm və 1 simvol ehtiva etməlidir.( "?" simvolunu çıxmaq şərtilə)');
    } else {
       
        toast.error('Şifrənin dəyişdirilməsi zamanı xəta baş verdi, təkrar cəhd edin.');
    }
    console.error(error);
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
          <link rel="icon" href="/home/360minilogo.svg" />
        </Head>

        <div className={css.main}>
          <div className={css.main_title}>
            <h3>Tənzimləmələr</h3>
            <Link href='/settings'>
              <Image
                src={'/X.svg'}
                width={0}
                height={0}
                className={css.X}
                alt='exiticon'
              />
            </Link>
          </div>
          <div className={css.mobile_title}>
            <Link href='/settings'>
              <Image
                src={'/chevron-left.svg'}
                width={0}
                height={0}
                className={css.chevron_left}
                alt='chevron_left'
              />
            </Link>
            <h3>Təhlükəsizlik</h3>
          </div>

          <div className={css.desktop_main}>
            <ul className={css.settings_ul}>
              <Link className={css.ul} href='/settings/my360id'>
                <li>My360ID</li>
              </Link>
              <Link className={css.ul_360id} href='/settings/security'>
                <li>Təhlükəsizlik</li>
              </Link>
              <Link className={css.ul} href='/settings/membership'>
                <li>Üzvlük</li>
              </Link>
              <Link className={css.ul} href='/settings/notifications'>
                <li>Bildirişlər</li>
              </Link>
              <Link className={css.ul} href='/settings/references'>
                <li>Referanslar</li>
              </Link>
            </ul>

            <form onKeyDown={(e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Enter tuşunu engelle
    }
}}>
    <ul className={css.my360id_ul}>
        <li className={css.password_li_mobile}>
            <div className={css.pass_li_mob_left}>
                <div>
                    <Image
                        width={0}
                        height={0}
                        src='/settings/keyo.svg'
                        id={css.key}
                        alt='keyicon'
                    />
                </div>
                <div className={css.pass_li_mob_left_form}>
                    <h2>Şifrəni dəyiş</h2>
                    <input
                        type="name"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='•••••••••••••'
                        required
                    />
                </div>
            </div>
            <div>
                <button id={css.pass_mob_but} type="button" onClick={handlePasswordChange}>
                    Təsdiq
                </button>
            </div>
        </li>
    </ul>
</form>

          </div>
        </div>
      </div>
    </>
  );
}
