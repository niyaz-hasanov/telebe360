import { useState } from 'react';
import styles from './css.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { APIURL } from '../../utils/constants';
import toast, { Toaster } from 'react-hot-toast';

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

  const validateForm = () => {
    if (formData.fname.trim().length < 3) {
      toast.error('Ad ən azı 2 simvol olmalıdır.');
      return false;
    }
    if (formData.lname.trim().length < 3) {
      toast.error('Soyad ən azı 2 simvol olmalıdır.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Etibarlı bir email adresi daxil edin.');
      return false;
    }
    if (formData.message.trim().length < 10) {
      toast.error('Mesaj ən azı 10 simvol olmalıdır.');
      return false;
    }
    if (!/^\d{7}$/.test(phoneNumber)) {
      toast.error('Telefon nömrəsi 7 rəqəmli olmalıdır.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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
        toast.error('Mesajınız göndərilə bilmədi.');
      }
    } catch (error) {
      toast.error('Mesaj göndərmə zamanı xəta.');
    }
  };

  return (
    <div className={styles.page}>
      <style jsx global>{`
        body {
          background-color: #f5f4f5;
        }
      `}</style>

      <Head>
        <title>Əlaqə</title>
        <link rel="icon" href="/home/360minilogo.ico" />
      </Head>

      <div className={styles.top_div}>
        <h1 className={styles.title}>Əlaqə</h1>
        <Link href="/">
          <img src="/X.svg" alt="Close" />
        </Link>
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      <div className={styles.content}>
        {/* Mor gradient kart */}
        <section className={styles.contactCard}>
          <h2 className={styles.cardTitle}>Contact Information</h2>
          <p className={styles.cardSub}>
            Fill up this form and our team will get back to you within 24 hours
          </p>

          <ul className={styles.cardInfoList}>
            <li>
              <span className={styles.cardIcon}>📞</span>
              <span>(+994) 000 00 00</span>
            </li>
            <li>
              <span className={styles.cardIcon}>📍</span>
              <span>Baku, Azerbaijan</span>
            </li>
            <li>
              <span className={styles.cardIcon}>✉️</span>
              <span>telebe360@gmail.com</span>
            </li>
          </ul>

          <div className={styles.cardSocials}>
            <img src="/Facebook.svg" alt="Facebook" />
            <img src="/Instagramnew.svg" alt="Instagram" />
            <img src="/Linkedinnew.svg" alt="LinkedIn" />
          </div>
        </section>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Get in touch</h2>

          <div className={styles.formGroup}>
            <label className={styles.label}>Ad Soyad</label>
            <div className={styles.inputRow}>
              <input
                className={styles.input}
                type="text"
                placeholder="Adınız"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                required
              />
              <input
                className={styles.input}
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
            <label className={styles.label}>Email*</label>
            <input
              className={styles.input}
              type="email"
              placeholder="Email adresiniz"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Nömrə</label>
            <div className={styles.inputRow}>
              <select
                className={styles.select}
                value={phonePrefix}
                onChange={(e) => setPhonePrefix(e.target.value)}
                required
              >
                <option value="055">055</option>
                <option value="070">070</option>
                <option value="077">077</option>
                <option value="050">050</option>
                <option value="099">099</option>
                <option value="051">051</option>
                <option value="060">060</option>
              </select>
              <input
                className={styles.input}
                type="text"
                placeholder="1234567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Sual və ya Şikayətiniz</label>
            <textarea
              className={styles.textarea}
              placeholder="Buraya yazın..."
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button className={styles.button} type="submit">
            Göndər
          </button>
        </form>
      </div>
    </div>
  );
}
