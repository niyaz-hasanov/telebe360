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
  width: '35%',
  border: '3.5px solid #8F00FF',
  bgcolor: '#F4F4F4',
  boxShadow: 24,
  borderRadius: '1.3vw',
  '@media (max-width: 800px)': {
    width: '75%',
    borderRadius: '2vw',
  },
};

export default function BasicModal({ qrCode, companyName, discount, onClose }) {
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
        <Grid container direction="row" alignItems="stretch" className={modalcss.main_div}>
          <Grid item className={modalcss.brand_name} style={{ flexGrow: 1, borderBottom: '3.5px solid #8F00FF', padding: '10px' }}>
            <Typography variant="h6" align="center">{companyName}</Typography>
          </Grid>
          <Grid item className={modalcss.ticket_main} style={{ flexGrow: 1, padding: '10px', textAlign: 'center' }}>
            <Typography variant="h5" style={{color:'#8F00FF'}}>Tələbə360°</Typography>
            
            {qrCode && (
              <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" className={modalcss.qrImage} />
            )}
          </Grid>
          <Grid item className={modalcss.percent} style={{ flexGrow: 1, borderTop: '3.5px solid #8F00FF', padding: '10px' }}>
            <Typography variant="h6" align="center">{`${discount}%`}</Typography>
          </Grid>
        </Grid>
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
