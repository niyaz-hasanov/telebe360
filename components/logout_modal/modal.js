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

  display:'flex',flexDirection:'column',
  alignItems:'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  
  bgcolor: '#F4F4F4',
   boxShadow: 24,
  borderRadius:'1.3vw',  padding:'5%',
  '@media (max-width: 800px)': {
    width: '75%',
    borderRadius:'2vw',
    padding:'8%'
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
      <button className={modalcss.logoutbut} onClick={handleOpen}><img src='/logout.svg' /></button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={modalcss.bulanik}
      >
        <Box sx={style}  >
          <Typography sx={styleh2} id="modal-modal-title"  variant="h6" component="h2" >
           Çıxış etmək istədiyinizə əminsiniz mi?
          </Typography>
          <div className={modalcss.butdiv}>
            <Link href='/'><button className={modalcss.but} id={modalcss.but1}>Çıxış</button></Link>
            <button className={modalcss.but} onClick={handleClose} id={modalcss.but2}>Ləğv et</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}