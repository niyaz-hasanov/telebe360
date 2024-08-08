import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import css from './modal.module.css';

import modalcss from './modal.module.css';
import Link from 'next/link'
const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent:'center',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: '#F4F4F4',
  height:'60%',
  boxShadow: 24,
  borderRadius: '1.3vw',
  padding: '1% 3% 1% 3%',
  '@media (max-width: 800px)': {
    width: '75%',
    borderRadius: '2vw',
    padding: '8%',
  },
};

const styleh2 = {
  fontFamily: 'DM Sans',
  fontSize: '1.4vw',
  fontWeight: '800',
  color: '#8F00FF',
  '@media (max-width: 800px)': {
    fontSize: '5.5vw',
  },
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(2); // Default rating

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmit = () => {
    console.log('Gönderilecek feedback:', feedback);
    console.log('Seçilen rating:', rating);

    // fetch('api-url', { method: 'POST', body: JSON.stringify({ feedback, rating }) })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.error('Error:', error));

    handleClose();
  };

  return (
    <div className={modalcss.logoutdiv}>
      <img src='/home/Notifications.svg' onClick={handleOpen} className={ `${css.ticketlogo} ${css.desktop_link} `} alt="Feedback"  />
      <Link href='/notifications' className={css.mobile_link}>
      <img src='/home/Notifications.svg'  onClick={handleOpen} className={css.ticketlogo} alt="Feedback" /></Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={modalcss.bulanik}
      >
        <Box sx={style}>
        
          
      
      <div className={css.information_div}>
        <img className={css.alarm_img} src='/alertalt.svg' />
        <div className={css.information_div_right}>
          <h3 className={css.information_h3}>Information</h3>
          <p className={css.information_p}>Please note that there might be a brief delay in securing your seats at the theater while processing your ticket purchase</p>
        </div>
      </div>
      <ul className={css.notifications_ul}>
        <li>
          <div className={css.li_div}><div className={css.li_div_left}><span className={css.dot}></span><img src='/ticket.svg'  className={css.li_img}/> <p className={css.li_p}>50% Off Extravaganza: Grab Your Movie
          Tickets at Half the Price!</p></div>
          <span className={css.time_div}><p className={css.time}>21:00</p></span>
          </div>
          </li>
          <li>
          <div className={css.li_div}><div className={css.li_div_left}><span className={css.dot}></span><img src='/ticket.svg'  className={css.li_img}/> <p className={css.li_p}>50% Off Extravaganza: Grab Your Movie
          Tickets at Half the Price!</p></div>
          <span className={css.time_div}><p className={css.time}>21:00</p></span>
          </div>
          </li>
          <li>
          <div className={css.li_div}><div className={css.li_div_left}><span className={css.dot}></span><img src='/ticket.svg'  className={css.li_img}/> <p className={css.li_p}>50% Off Extravaganza: Grab Your Movie
          Tickets at Half the Price!</p></div>
          <span className={css.time_div}><p className={css.time}>21:00</p></span>
          </div>
          </li>
          <li>
          <div className={css.li_div}><div className={css.li_div_left}><span className={css.dot}></span><img src='/ticket.svg'  className={css.li_img}/> <p className={css.li_p}>50% Off Extravaganza: Grab Your Movie
          Tickets at Half the Price!</p></div>
          <span className={css.time_div}><p className={css.time}>21:00</p></span>
          </div>
          </li>
      </ul>
      <button className={css.seemore_button}><Link href='/notifications'>Daha çox</Link></button>
        </Box>
      </Modal>
    </div>
  );
}
