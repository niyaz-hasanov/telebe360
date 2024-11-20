"use client";
import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import modalcss from './modal.module.css';

const style = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  border: '3.5px solid #8F00FF',
  bgcolor: '#F4F4F4',
  boxShadow: 24,
  borderRadius: '1.3vw',
  '@media (max-width: 800px)': {
    width: '90%',
    borderRadius: '4vw',
  },
};

export default function BasicModal({ qrCode, companyName, discount, onClose ,createdAt}) {
  const open = Boolean(qrCode); // Modal is open if qrCode is provided

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={modalcss.bulanik}
    >
      <Box sx={style}>
        <div container direction="row" alignItems="stretch" className={modalcss.main_div}>
          <div item className={modalcss.brand_name} style={{ flexGrow: 1}}>
            <p variant="h6" align="center">{companyName}</p>
          </div>
          <div item className={modalcss.ticket_main} >
            <p variant="h5" className={modalcss.telebe360}>Tələbə 360°</p>
            
            {qrCode && (
              <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" className={modalcss.qrImage} />
            )}
          </div>
          <div item className={modalcss.percent} style={{ flexGrow: 1 }}>
            <p variant="h6" align="center">{`${discount}%`}</p>
          </div>
        </div>
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
