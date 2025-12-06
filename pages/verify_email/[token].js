import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './VerifyEmail.module.css'; 
import { APIURL } from '../../utils/constants';

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query; 
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null); 

  useEffect(() => {
    if (token) {
      axios.get(`${APIURL}auth/${token}`)
        .then((response) => {
          if (response.status === 204) {
            setMessage(`Emailiniz uğurla təsdiqləndi! Daxil ol səhifəsinə yönləndirilirsiniz.`);
            setIsSuccess(true);

            // Yönləndirmə üçün 3 saniyəlik gecikmə
            setTimeout(() => {
              router.push('/login');
            }, 3000);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            setMessage('Emailinizin verifikasiyası prosesinde xəta baş verdi.');
            setIsSuccess(false);
          } else {
            setMessage('Bir xəta baş verdi.');
            setIsSuccess(false);
          }
        });
    }
  }, [token]);

  return (
    <div className={styles.container}>
      <img className={styles.img} src='/wide360logo.svg'/>
      <div className={`${styles.messageBox} ${isSuccess ? styles.success : styles.error}`}>
        <h1 className={styles.h1}>{message}</h1>
      </div>
    </div>
  );
};

export default VerifyEmail;
