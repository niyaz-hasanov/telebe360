"use client";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import modalcss from './modal.module.css';
import { APIURL,MAINURL } from '@/utils/constants';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; 

const style = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  borderRadius: '2vw',
  bgcolor: '#F4F4F4',
  boxShadow: 24,
  padding: '0.5vw',
 border:'none',
  '@media (max-width: 800px)': {
    width: '90%',
    borderRadius: '3vw',
    padding:'1vw',
  },
};
const style2 = {
  border: '0.3vw solid #8F00FF',
 borderRadius: '2vw',
 '@media (max-width: 800px)': {
  border: '1vw solid #8F00FF',
 borderRadius: '3vw',

},
}

export default function BasicModal({ qrCode, companyName, discount, onClose ,createdAt}) {
  const open = Boolean(qrCode);   const [student, setStudent] = useState({});
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

        
        const studentResponse = await axios.get(`${APIURL}students/me`, config);
        const studentData = studentResponse.data;
        setStudent(studentData);

        const universityResponse = await axios.get(`${APIURL}universities/${studentData.university_id}`, config);
        const universityData = universityResponse.data;
        setUniversityName(universityData.name);

      } catch (error) {
        console.error('Error fetching student or university data:', error);
      }
    };

    fetchStudentData();
  }, []);


  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={modalcss.bulanik}
    >
      <Box sx={style}>
        <Box sx={style2} container direction="row" alignItems="stretch" className={modalcss.main_div}>
          
          <div item className={modalcss.brand_name} style={{ flexGrow: 1}}>
            <p variant="h6" align="center">{companyName}</p>
          </div>
          <div item className={modalcss.ticket_main} >
            <p variant="h5" className={modalcss.telebe360}>Tələbə 360°</p>

               <div className={modalcss.profdiv}>
                <span className={modalcss.profmobspan}><img
                  src={student.profile_img_path ? `${MAINURL}uploads/${student.profile_img_path}` : '/profile.jpg' } 
                  width={0}
                  height={0}
                  className={modalcss.profmob}
                  alt='Profile Image'
                />
                </span>
                <div className={modalcss.divtext}>
                  <h2>{student.fname} {student.lname}</h2>
                  <p>{universityName}</p> 
                </div>
              
              </div>
            {qrCode && (
              <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" className={modalcss.qrImage} />
            )}
          </div>
          <div item className={modalcss.percent} style={{ flexGrow: 1 }}>
            <p variant="h6" align="center">{`${discount}%`}</p>
          </div>
        </Box>
      </Box>
    </Modal>
  );
}

BasicModal.propTypes = {
  qrCode: PropTypes.string,
  companyName: PropTypes.string.isRequired,
  discount: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  
};
