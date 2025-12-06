"use client";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import modalcss from './modal.module.css';
import { APIURL, MAINURL } from '@/utils/constants';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const outerBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  outline: 'none',
  transform: 'translate(-50%, -50%)',
  width: 'min(420px, 90vw)',   // dikey ticket, responsive
  border: 'transparent',
  bgcolor: 'transparent',
  hover:'none',
  boxShadow: 'none',
};

export default function BasicModal({
  qrCode,
  companyName,
  discount,
  onClose,
  createdAt,
  companyLogoPath
}) {
  const open = Boolean(qrCode);
  const [student, setStudent] = useState({});
  const [universityName, setUniversityName] = useState('');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const accessToken = Cookies.get('access_token');
        if (!accessToken) return;

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const studentResponse = await axios.get(`${APIURL}students/me`, config);
        const studentData = studentResponse.data;
        setStudent(studentData);

        if (studentData.university_id) {
          const universityResponse = await axios.get(
            `${APIURL}universities/${studentData.university_id}`,
            config
          );
          const universityData = universityResponse.data;
          setUniversityName(universityData.name);
        }
      } catch (error) {
        console.error('Error fetching student or university data:', error);
      }
    };

    fetchStudentData();
  }, []);

  const fullName = `${student.fname || ''} ${student.lname || ''}`.trim() || '-';

  // Tarih formatı: 22.11.2025
  let formattedDate = '-';
  if (createdAt) {
    const d = new Date(createdAt);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    formattedDate = `${day}.${month}.${year}`;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="ticket-modal-title"
      aria-describedby="ticket-modal-description"
      className={modalcss.bulanik}
    >
      <Box sx={outerBoxStyle}>
         <div className={modalcss.ticketHeader}>
            <div className={modalcss.companyBox}>
              <div className={modalcss.companyLogo}>
              
                <span className={modalcss.companyLogoText}>
                  <img  src={`${MAINURL}uploads/${companyLogoPath}`} 
                  className={modalcss.companyLogo}
                             alt={companyName} />
                </span>
              </div>
              <span className={modalcss.companyName}>{companyName}</span>
            </div>
  
          </div>

        <div className={modalcss.ticket}>
          {/* ÜST KISIM – MARKA */}
                   <img src='/ticket_dash.svg'/>
          {/* DELİK / KESİK ÇİZGİ */}
          <div className={modalcss.ticketDivider} />

          {/* ALT KISIM – BİLET GÖVDESİ */}
          <div className={modalcss.ticketBody}>
            {/* İç beyaz kart: kullanıcı bilgisi */}
            <div className={modalcss.innerCard}>
              <div className={modalcss.innerHeader}>
                <div className={modalcss.labelBlock}>
                  <span className={modalcss.labelGrey}>Ad soyad :</span>
                  <div className={modalcss.nameRow}>
                    <span className={modalcss.avatarWrap}>
                      <img
                        src={
                          student.profile_img_path
                            ? `${MAINURL}uploads/${student.profile_img_path}`
                            : '/profile.jpg'
                        }
                        alt="Profile"
                        className={modalcss.avatarImg}
                      />
                    </span>
                    <span className={modalcss.fullName}>{fullName}</span>
                  </div>
                </div>
              </div>

              <div className={modalcss.infoRow}>
                <div className={modalcss.infoCol}>
                  <span className={modalcss.labelGrey}>Endirim faizi:</span>
                  <span className={modalcss.infoValue}>{discount}%</span>
                </div>
                <div className={modalcss.infoCol}>
                  <span className={modalcss.labelGrey}>Tarix:</span>
                  <span className={modalcss.infoValue}>{formattedDate}</span>
                </div>
              </div>
            </div>

            {/* QR CODE */}
            {qrCode && (
              <div className={modalcss.qrWrapper}>
                <img
                  src={`data:image/png;base64,${qrCode}`}
                  alt="QR Code"
                  className={modalcss.qrImage}
                />
              </div>
            )}

            {/* ALT LOGO */}
            <div className={modalcss.ticketBrand}>
              <img src='/wide360logo.svg'/>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

BasicModal.propTypes = {
  qrCode: PropTypes.string,
  companyName: PropTypes.string.isRequired,
  companyLogoPath: PropTypes.string.isRequired,
  discount: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};
