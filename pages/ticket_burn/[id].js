import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TicketBurn.module.css'; 
import {APIURL} from '../../utils/constants'
const TicketBurn = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null); 

  useEffect(() => {
    if (id) {
      axios.get(`${APIURL}tickets/burn/${id}`)
        .then((response) => {
          if (response.status === 204) {
            setMessage('Bilet uğurla istifadə olundu');
            setIsSuccess(true); 
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            setMessage('Biletin istifadəsi zamanı xəta baş verdi.');
            setIsSuccess(false); 
          }
          if (error.response && error.response.status === 404) {
            setMessage('Biletiniz tapılmadı');
            setIsSuccess(false); 
          }
          else {
            setMessage('Bir xəta baş verdi.');
            setIsSuccess(false);
          }
        });
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <img className={styles.img} src='/wide360logo.svg'/>
      <div className={`${styles.messageBox} ${isSuccess ? styles.success : styles.error}`}>
        <h1 className={styles.h1}>{message}</h1>
      </div>
    </div>
  );
};

export default TicketBurn;
