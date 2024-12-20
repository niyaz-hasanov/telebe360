import React, { useState, useEffect } from 'react';
import css from './css.module.css';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import { MAINURL } from '../../utils/constants'; 

export default function Home() {
  const [student, setStudent] = useState({});
  const [universityName, setUniversityName] = useState('');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const accessToken = Cookies.get('access_token');
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        
        const studentResponse = await axios.get(`${MAINURL}api/v1/students/me`, config);
        const studentData = studentResponse.data;
        setStudent(studentData);

        const universityResponse = await axios.get(`${MAINURL}api/v1/universities/${studentData.university_id}`, config);
        const universityData = universityResponse.data;
        setUniversityName(universityData.name);

      } catch (error) {
        console.error('Error fetching student or university data:', error);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <>
      <div className={css.body}>
        <style jsx global>{`
          body {
            margin: 0;
            background: #F2F3F2;
          }
        `}</style>
        <Head>
          <title>Tələbə360°</title>
          <link rel="icon" href="/home/360minilogo.svg" />
        </Head>

        <div className={css.main}>
          <div className={css.top_div}>
            <h3>Tənzimləmələr</h3>
            <Link href='/'><img src='/X.svg' alt="Close" /></Link>
          </div>
          <div className={css.mainul}>
            <ul className={css.proful}>
              <div className={css.profdiv}>
                <span className={css.profmobspan}><img
                  src={student.profile_img_path ? `${MAINURL}uploads/${student.profile_img_path}` : '/profile.jpg' }
                  width={0}
                  height={0}
                  className={css.profmob}
                  alt='Profile Image'
                />
                </span>
                <div className={css.divtext}>
                  <h2>{student.fname} {student.lname}</h2>
                  <p>{universityName}</p> 
                </div>
                <Image
                  src='/qr.svg'
                  width={0}
                  height={0}
                  className={css.qr}
                  alt='QR Code'
                />
              </div>
              <Link href='/settings/my360id' className={css.profli}>
                <Image
                  src='/360idmob.svg'
                  width={0}
                  height={0}
                  className={css.id360mob}
                  alt='My360ID Icon'
                />
                <p>My 360ID</p>
                <FaChevronRight className={css.chevron} />
              </Link>
              <Link href='/settings/security' className={css.profli}>
                <Image
                  src='/security.svg'
                  width={0}
                  height={0}
                  className={css.id360mob}
                  alt='Security Icon'
                />
                <p>Təhlükəsizlik</p>
                <FaChevronRight className={css.chevron} />
              </Link>
              <Link href='/settings/membership' className={css.profli}>
                <Image
                  src='/membermob.svg'
                  width={0}
                  height={0}
                  className={css.id360mob}
                  alt='Membership Icon'
                />
                <p style={{ color: '#FFB800' }}>Üzvlük</p>
                <FaChevronRight style={{ color: '#FFB800' }} className={css.chevron} />
              </Link>
              <Link href='/settings/notifications' className={css.profli}>
                <Image
                  src='/profnoti.svg'
                  width={0}
                  height={0}
                  className={css.id360mob}
                  alt='Notifications Icon'
                />
                <p>Bildirişlər</p>
                <FaChevronRight className={css.chevron} />
              </Link>
              <Link href='/settings/references' className={css.profli}>
                <Image
                  src='/profreferences.svg'
                  width={0}
                  height={0}
                  className={css.id360mob}
                  alt='References Icon'
                />
                <p>Referanslar</p>
                <FaChevronRight className={css.chevron} />
              </Link>
              {/* <Link href='/settings/feedback' className={css.profli}>
                <Image
                  src='/proffeedback.svg'
                  width={0}
                  height={0}
                  className={css.id360mob}
                  alt='Feedback Icon'
                />
                <p>Feedback</p>
                <FaChevronRight className={css.chevron} />
              </Link> */}
            </ul>
            <ul className={css.proful2}>
              <Link href='/technical_support' className={css.profli}>
                <Image
                  src='/profsupport.svg'
                  width={0}
                  height={0}
                  className={css.id360mob}
                  alt='Technical Support Icon'
                />
                <p style={{ color: '#0057FF' }}>Texniki dəstək</p>
                <FaChevronRight style={{ color: "#0057FF" }} className={css.chevron} />
              </Link>
              {/* <Link href='/settings/refere' className={css.profli}>
                <Image
                  src='/profrefere.svg'
                  width={0}
                  height={0}
                  className={css.id360mob}
                  alt='Refer a Friend Icon'
                />
                <p style={{ color: '#FF0000' }}>Refere a Friend</p>
                <FaChevronRight style={{ color: "#FF0000" }} className={css.chevron} />
              </Link> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
