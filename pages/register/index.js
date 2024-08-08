"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import css from './register.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    email: '',
    password: '',
    university: '',
    studentCard: null,
    otp: ['', '', '', '']
  });

  const [activeDiv, setActiveDiv] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
        setFormData({ ...formData, [name]: files[0] });
    } else {
        setFormData({ ...formData, [name]: value });
        if (name === 'password') {
            setPasswordStrength(checkPasswordStrength(value));
        }
    }

    // Şifre alanı boşsa güç çubuğunun rengini temizle
    if (name === 'password' && value === '') {
        setPasswordStrength('');
    }
};


  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData({ ...formData, otp: newOtp });

      // Move to next input if current input is not empty
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = '';
    if (password.length >= 8) {
        if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
            strength = 'strong';
        } else if ((/[A-Z]/.test(password) && /[0-9]/.test(password)) || (/[A-Z]/.test(password) && /[^A-Za-z0-9]/.test(password)) || (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password))) {
            strength = 'medium';
        } else {
            strength = 'weak';
        }
    } else {
        strength = 'weak';
    }
    console.log(strength); // Parola gücünü kontrol etmek için eklendi
    return strength;
};

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={css.body}>
      <style jsx global>{`
        body {
          background-image: url('/loginback.svg');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          background-attachment: fixed;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 5vw;
        }
      `}</style>
      <Head>
        <title>Tələbə360°-a Qeydiyyat</title>
        <link rel="icon" href="/home/360minilogo.svg" />
      </Head>

      <AnimatePresence>
        {activeDiv === 1 && (
          <motion.div
            key="register_part1"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className={css.registerPart}
          >
            <form className={css.registerFormDiv}>
              <div className={css.form_top_div}>
              <h2 className={css.daxiltxt}>Başlayın</h2>
              <p>Artıq hesabınız var? <a href='/login'>Daxil olun</a></p>

              </div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Adınız"
                className={css.input}
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Soyadınız"
                className={css.input}
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="Doğum Tarixiniz"
                className={css.input}
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={css.input}
                id={css.gender}
              >
                <option value="">Cinsiyyətiniz</option>
                <option value="male">Kişi</option>
                <option value="female">Qadın</option>
              </select>
              <button className={css.nextbut} onClick={(e) => { e.preventDefault(); setActiveDiv(2); }}>➜ Növbəti</button>
            </form>
          </motion.div>
        )}
        {activeDiv === 2 && (
          <motion.div
            key="register_part2"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4 }}
            className={css.registerPart}
          >
            {activeDiv > 1 && (
              <button className={css.prevbut} onClick={() => setActiveDiv(activeDiv - 1)}>🡠</button>
            )}
            <form className={css.registerFormDiv}>
            <div className={css.form_top_div}>
              <h2 className={css.daxiltxt}>Başlayın</h2>
              <p>Artıq hesabınız var? <a href='/login'>Daxil olun</a></p>

              </div>
           
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Emailiniz"
                className={css.input}
              />
              <div className={css.passwordDiv}>
                <img src='/key.svg' className={css.keyicon} />
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Şifrəniz"
                  className={css.input}
                  id={css.password_input}
                />
                <span onClick={togglePasswordVisibility} className={css.eyeIcon}>
                  {passwordVisible ? <img src='eye.svg' className={css.eye} /> : <FaEye className={css.eye} />}
                </span>
               <div> 
                <p>Şifrənizin gücü</p>
                <div className={css.passwordStrengthBar} style={{ width: passwordStrength === 'strong' ? '100%' : passwordStrength === 'medium' ? '66%' : '33%', backgroundColor: passwordStrength === 'strong' ? 'green' : passwordStrength === 'medium' ? 'orange' : 'red' }}></div>
               </div>
              </div>
              <p>Şifrəniz aşağıdakıları əhatə etməlidir:</p>

              <ul className={css.passwordRequirements}>
                <li style={{color:'grey',listStyle:'circle'}}>ən az 8 xanalı olmalıdır</li>
                <li style={{color:'grey',listStyle:'circle'}}>ən az 1 böyük hərf</li>
                <li style={{color:'grey',listStyle:'circle'}}>ən az 1 simvol</li>
              </ul>
              <button className={css.nextbut} onClick={(e) => { e.preventDefault(); setActiveDiv(3); }}>➜ Növbəti</button>
            </form>
          </motion.div>
        )}
        {activeDiv === 3 && (
          <motion.div
            key="register_part3"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className={css.registerPart}
          >
            {activeDiv > 1 && (
              <button className={css.prevbut} onClick={() => setActiveDiv(activeDiv - 1)}>🡠</button>
            )}
            <form className={css.registerFormDiv}>
            <div className={css.form_top_div}>
              <h2 className={css.daxiltxt}>Başlayın</h2>
              <p>Artıq hesabınız var? <a href='/login'>Daxil olun</a></p>

              </div>
              <select
                name="university"
                value={formData.university}
                onChange={handleChange}
                className={css.input}
              >
                <option value="">Universitetiniz</option>
                <option value="university1">Universitet 1</option>
                <option value="university2">Universitet 2</option>
                {/* Diğer üniversiteler buraya eklenebilir */}
              </select>
              <div className={css.fileUploadDiv}>
                <p className={css.fileUploadLabel}>   Tələbə kartınız</p>
                <label htmlFor="studentCard" >
               
                  <img className={css.uploadIcon} src='/telebe_input.svg'/>
                </label>
                <input
                  type="file"
                  name="studentCard"
                  id="studentCard"
                  onChange={handleChange}
                  className={css.inputFile}
                />
              </div>
              <button className={css.nextbut} onClick={(e) => { e.preventDefault(); setActiveDiv(4); }}>➜ Növbəti</button>
            </form>
          </motion.div>
        )}
        {activeDiv === 4 && ( 
          <motion.div
            key="register_part4"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4 }}
            className={css.registerPart}
          >
            {activeDiv > 1 && (
              <button className={css.prevbut} onClick={() => setActiveDiv(activeDiv - 1)}>🡠</button>
            )}
            <form onSubmit={handleSubmit} className={css.registerFormDiv}>
            <div className={css.form_top_div}>
              <h2 className={css.daxiltxt}>Başlayın</h2>
              <p>Artıq hesabınız var? <a href='/login'>Daxil olun</a></p>

              </div>
              <div className={css.otpDiv}>
                {formData.otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    name={`otp-${index}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    maxLength="1"
                    placeholder='0'
                    className={css.otpInput}
                  />
                ))}
              </div>
              <button className={css.submitbut} type="submit">➜ Qeydiyyat</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
