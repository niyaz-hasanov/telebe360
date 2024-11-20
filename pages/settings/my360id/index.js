import React from 'react';
import css from './css.module.css';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { MAINURL ,APIURL} from '../../../utils/constants';
import toast from 'react-hot-toast';

export default function Home() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImgPath, setProfileImgPath] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
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
        setFname(data.fname);
        setLname(data.lname);
        setEmail(data.email);
        setProfileImgPath(data.profile_img_path);
        setIsVerified(data.is_student_verified);

        const universityResponse = await axios.get(`${APIURL}universities/${data.university_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUniversityName(universityResponse.data.name);
      } catch (error) {
        toast.error('Tələbə məlumatları alınanda xəta baş verdi.Zəhmət olmasa səhifəni yeniləyin');
      }
    };

    fetchStudentData();
  }, []);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('access_token');
      if (!token) {
        toast.error('Token bulunamadı.');
        return;
      }

      const studentData = {
        fname,
        lname,
        email,
      };

      await axios.put(`${APIURL}students/`, studentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      toast.success('Məlumatlar uğurla yeniləndi.');
    } catch (error) {
      toast.error('Məlumatlar yenilənəndə xəta baş verdi.');
    }
  };

  const handleProfilePhotoChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const token = Cookies.get('access_token');
        if (!token) {
          toast.error('Token bulunamadı.');
          return;
        }

        const formData = new FormData();
        formData.append('profile_photo', file);

        await axios.post(`${APIURL}students/profile`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        toast.success('Profil şəkliniz uğurla yeniləndi, görmək üçün səhifəni yeniləyin.');
      }
    } catch (error) {
      toast.error('Profil şəklinizi yeniləyərkən xəta baş verdi. Zəhmət olmasa təkrar cəhd edin');
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
              />
            </Link>
            <h3>My360ID</h3>
          </div>
          <div className={css.desktop_main}>
            <ul className={css.settings_ul}>
              <Link className={css.ul_360id} href='/settings/my360id'><li>My360ID</li></Link>
              <Link className={css.ul} href='/settings/security'><li>Təhlükəsizlik</li></Link>
              <Link className={css.ul} href='/settings/membership'><li>Üzvlük</li></Link>
              <Link className={css.ul} href='/settings/notifications'><li>Bildirişlər</li></Link>
              <Link className={css.ul} href='/settings/references'><li>Referanslar</li></Link>
            </ul>
            <form onSubmit={handleSaveChanges}>
              <ul className={css.my360id_ul}>
                <li className={css.my360id_li} id={css.my360_li}>
                  <div className={css.li1_left} id={css.li1_left}>
                    <Image
                      src={'/settings/pp.svg'}
                      width={0}
                      height={0}
                      className={css.ppp}
                    />
                    <div>
                      <h2 className={css.h2}>Şəxsi məlumatlar</h2>
                      <p className={css.p}>Profil şəklinizi və şəxsi məlumatlarınızı buradan yeniləyə bilərsiniz.</p>
                    </div>
                  </div>
                  <div className={css.li1_right}>
                    <button id={css.li1but1}>Ləğv et</button>
                    <button id={css.li1but2} type="submit">Yadda saxla</button>
                  </div>
                </li>
                <li className={css.my360id_li} id={css.my360id_li}>
                  <div className={css.li1_left}>
                    <h2>Ad Soyad</h2>
                  </div>
                  <div className={css.li1_right}>
                    <input
                      className={css.li2_right_input}
                      type="text"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      placeholder="Ad"
                    />
                    <input
                      className={css.li2_right_input}
                      type="text"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      placeholder="Həsənov"
                    />
                  </div>
                </li>
                <li className={css.my360id_li} id={css.my360id_li}>
                  <div className={css.li1_left}>
                    <h2>Email</h2>
                  </div>
                
                  <div className={css.li1_right} id={css.special}
                    onMouseEnter={() => setShowTooltip2(true)} 
                    onMouseLeave={() => setShowTooltip2(false)}
                  >
                     <input
                      className={css.li2_right_input}
                      id={css.mail}
                      type="mail"
                      value={email}
                  
                      placeholder="forexample@mail.com"
                      readOnly
                    />
                    {showTooltip2 && (
                      <div className={css.tooltip}>
                        Email ünvanınızı dəyişdirə bilməzsiniz
                      </div>
                    )}
                  </div>
                </li>
                <li className={css.my360id_li} id={css.my360id_li}>
                  <div className={css.li1_left}>
                    <h2>Şəkliniz</h2>
                    <p>Bu şəkil sizin <a href='/settings/360id'>360ID</a> şəkliniz olacaq</p>
                    {!isVerified && (
      <p>
        Hesabınız moderatorlar tərəfindən təsdiq olunmamışdır.
      </p>
    )}
                  </div>
                  <div className={css.li1_right} id={css.li4_right}>
                  <span  className={isVerified ? css.ppspan : css.ppspanRed}>  <img
                      src={`${MAINURL}uploads/${profileImgPath}`}
                      width={0}
                      height={0}
                      className={css.pp}
                    /></span>
                    <label htmlFor="actual-btn" className={css.li2_right_input} id={css.file}>
                      <img src='https://img001.prntscr.com/file/img001/NIQRxo7vRAuboVftB8WnNA.png' />
                      <p><b>Yükləmək üçün toxunun</b> SVG,PNG or JPG (max 800x400px)</p>
                    </label>
                    <input
                      className={css.li2_right_input}
                      id="actual-btn"
                      type="file"
                      hidden
                      onChange={handleProfilePhotoChange}
                    />
                  </div>
                </li>
                <li className={css.my360id_li} id={css.my360id_li}>
                  <div className={css.li1_left}

                  >
                    <h2>Universitet</h2>
                  </div>
                  <div className={css.li1_right} id={css.special}
                    onMouseEnter={() => setShowTooltip(true)} // Tooltipi göster
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <input
                      className={css.li2_right_input}
                      id={css.mail}
                      type="text"
                      value={universityName}
                      readOnly
                    />
                    {showTooltip && (
                      <div className={css.tooltip}>
                        Universitetinizi dəyişdirə bilməzsiniz
                      </div>
                    )}
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
