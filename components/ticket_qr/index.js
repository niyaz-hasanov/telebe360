"use client"
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Link from 'next/link'

import css from '../navbar&toggle/navbar.module.css'
import modalcss from './modal.module.css'
const style = {
  position: 'absolute',

  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35%',
 
  border:'3.5px solid #8F00FF',
  bgcolor: '#F4F4F4',
   boxShadow: 24,
  borderRadius:'1.3vw', 
  '@media (max-width: 800px)': {
    width: '75%',
    borderRadius:'2vw',
   
  },

};
const styleh2 = {
  fontFamily:'DM Sans',fontSize:'1.4vw',fontWeight:'800',
  '@media (max-width: 800px)': {
  
    fontSize:'5.5vw'
  },
}

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={modalcss.logoutdiv}>
      <button className={modalcss.logoutbut} onClick={handleOpen}>Bilet</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={modalcss.bulanik}
      >
        <Box sx={style}  >
            <div className={modalcss.main_div}>
       <div className={modalcss.brand_name}><h3>KFC</h3></div>
       <div className={modalcss.ticket_main}>
        <h2>Tələbə360°</h2>
       </div>
       <div className={modalcss.percent}><h3>20%</h3></div>
       </div>
        </Box>
      </Modal>
    </div>
  );
}