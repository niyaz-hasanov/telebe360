import { useState } from 'react';
import styles from './css.module.css';
import Head from "next/head";
import Link from 'next/link';
import { APIURL } from '../../utils/constants'; // Importing API URL from constants.js

export default function Home() {
  // State variables for form data
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    message: ''
  });
  
  // Separate states for phone prefix and number
  const [phonePrefix, setPhonePrefix] = useState('055');
  const [phoneNumber, setPhoneNumber] = useState('');

  // State to handle submission status
  const [submitStatus, setSubmitStatus] = useState('');

  // Handling form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form data to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('Sending...');

    // Remove the first "0" from the prefix and add "+994"
    const formattedPhoneNumber = `+994${phonePrefix.slice(1)}${phoneNumber}`;

    // Add formatted phone number to formData
    const dataToSend = {
      ...formData,
      phone_number: formattedPhoneNumber,
    };

    try {
      const response = await fetch(`${APIURL}students/support`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setSubmitStatus('Mesajınız uğurla göndərildi!');
        // Optionally reset the form
        setFormData({
          fname: '',
          lname: '',
          email: '',
          message: ''
        });
        setPhonePrefix('055');
        setPhoneNumber('');
      } else {
        setSubmitStatus('Mesajınız göndərilə bilmədi.');
      }
    } catch (error) {
      setSubmitStatus('Mesaj göndərmə zamanı xəta.');
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
        <title>Texniki dəstək</title>
        <link rel="icon" href="/home/360minilogo.svg" />
      </Head>

      <div className={styles.top_div}>
        <h1 className={styles.title}>Texniki Dəstək</h1>
        <Link href='/settings'><img src='X.svg' alt="Close" /></Link>
      </div>
      
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

      <p>{submitStatus}</p>
    </div>
  );
}
