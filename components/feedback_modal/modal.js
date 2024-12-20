import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import css2 from './modal.module.css';
import css from '../navbar&toggle/navbar.module.css';
import modalcss from './modal.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { APIURL } from '../../utils/constants'; // Adjust the path
import { toast } from 'react-hot-toast'; 

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: '#F4F4F4',
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
    textAlign:'center'
  },
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(2); // Default rating

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmit = async () => {
    const accessToken = Cookies.get('access_token');
    const feedbackData = {
      stars: rating,
      message: feedback,
    };

    try {
      const response = await axios.post(`${APIURL}students/feedback`, feedbackData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        toast.success('Rəyiniz uğurla göndərildi!');  // Success message
      }
    } catch (error) {
      toast.error('Rəy göndərilməsində xəta baş verdi.');  // Error message
    }

    handleClose();
  };


  return (
    <div className={modalcss.logoutdiv}>
      <button onClick={handleToggle} className={css2.feedback}>Rəy bildirin</button>
      <button onClick={handleToggle} className={css2.feedback2}>Rəy </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={modalcss.bulanik}
      >
        <Box sx={style}>
          <Typography sx={styleh2} id="modal-modal-title" variant="h6" component="h2" className={css.text}>
            Təcrübənizi qiymətləndirin
          </Typography>
          <div className={modalcss.rating}>
            <Stack direction="row" spacing={1} sx={{ "& .MuiRating-root": { 
              fontSize: { xs: '10vw', sm: '3vw' } 
            } }}>
              <Rating
                name="size-large"
                value={rating}
                onChange={handleRatingChange}
                precision={0.5}
                size="large"
              />
            </Stack>
          </div>
          <div className={modalcss.textareadiv}>
            <p className={modalcss.textarea_p}>Təkliflərinizi bizimlə bölüşün</p>
            <textarea
              rows="5"
              cols="45"
              className={modalcss.textarea}
              placeholder="Təkliflərinizi daxil edin"
              value={feedback}
              onChange={handleFeedbackChange}
            ></textarea>
          </div>
          <button className={modalcss.but} onClick={handleSubmit}>Təsdiqlə</button>
        </Box>
      </Modal>
    </div>
  );
}
