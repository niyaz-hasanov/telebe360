import { useState } from 'react';
import styles from './css.module.css';
import Head from "next/head";
import Link from 'next/link';
import { APIURL } from '../../utils/constants'; 
import toast, { Toaster } from 'react-hot-toast'; // Hot-toast eklendi

export default function Home() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    message: ''
  });

  const [phonePrefix, setPhonePrefix] = useState('055');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedPhoneNumber = `+994${phonePrefix.slice(1)}${phoneNumber}`;
    const dataToSend = { ...formData, phone_number: formattedPhoneNumber };

    try {
      const response = await fetch(`${APIURL}students/support`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        // Başarılı olursa başarılı bildirimi göster
        toast.success('Mesajınız uğurla göndərildi!');
        setFormData({
          fname: '',
          lname: '',
          email: '',
          message: ''
        });
        setPhonePrefix('055');
        setPhoneNumber('');
      } else {
        // Hata olursa hata bildirimi göster
        toast.error('Mesajınız göndərilə bilmədi.');
      }
    } catch (error) {
      toast.error('Mesaj göndərmə zamanı xəta.');
    }
  };

  return (
    <div className={styles.container}>
      <style jsx global>{`
        body {
          background-color: #63636300;
        }
      `}</style>
      
      <Head>
        <title>Əlaqə</title>
        <link rel="icon" href="/home/360minilogo.svg" />
      </Head>

      <div className={styles.top_div}>
        <h1 className={styles.title}>Əlaqə</h1>
        <Link href='/'><img src='X.svg' alt="Close" /></Link>
      </div>

      {/* Toaster bileşeni burada render ediliyor */}
 

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Ad Soyad</label>
          <div className={styles.inputGroup}>
            <input 
              className={styles.input} 
              id={styles.ad_soyad} 
              type="text" 
              placeholder="Adınız" 
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              required 
            />
            <input 
              className={styles.input} 
              id={styles.ad_soyad} 
              type="text" 
              placeholder="Soyadınız" 
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <div className={styles.inputGroup}>
            <input 
              className={styles.input} 
              id={styles.email} 
              type="email" 
              placeholder="Email adresiniz" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Nömrə</label>
          <div className={styles.inputGroup}>
            <select 
              className={styles.select} 
              id={styles.prefix}
              value={phonePrefix}
              onChange={(e) => setPhonePrefix(e.target.value)}
              required
            >
              <option value="055">055</option>
              <option value="070">070</option>
              <option value="050">050</option>
              <option value="099">099</option>
            </select>
            <input 
              className={styles.input} 
              id={styles.number} 
              type="text" 
              placeholder="123-45-67" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required 
            />
          </div>
        </div>

        <div className={styles.formGroup} id={styles.last_group}>
          <label className={styles.label} id={styles.textlabel}>Sual və ya Şikayətiniz</label>
          <div className={styles.inputGroup}>
            <textarea 
              className={styles.textarea} 
              placeholder="Buraya yazın..." 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button className={styles.button} id={styles.button} type="submit">
          Göndər
        </button>
      </form>
    </div>
  );
}
