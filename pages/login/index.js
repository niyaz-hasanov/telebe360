import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import css from './login.module.css';
import Slider from '../../components/login_slider/index';
import axios from 'axios';

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [activeDiv, setActiveDiv] = useState(1);
  const [token, setToken] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedEmail && savedPassword && savedRememberMe) {
      setFormData({ email: savedEmail, password: savedPassword, rememberMe: savedRememberMe });
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://telebe360.elxanhuseynli.com/api/login-user', {
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);

      if (formData.rememberMe) {
        localStorage.setItem('email', formData.email);
        localStorage.setItem('password', formData.password);
        localStorage.setItem('rememberMe', formData.rememberMe);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }

      setToken(response.data.token);

      // Redirect or do something else after successful login
      // Example redirect:
      // router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
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
        <title>Tələbə360°-a daxil olun</title>
        <link rel="icon" href="/home/360minilogo.svg" />
      </Head>

      <AnimatePresence>
        {activeDiv === 1 && (
          <motion.div
            key="login_slider"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className={css.login_slider}
          >
            <div className={css.slider_div}>
              <Slider />
            </div>
            <button className={css.nextbut} onClick={() => setActiveDiv(2)}>➜ Növbəti</button>
          </motion.div>
        )}
        {activeDiv === 2 && (
          <motion.div
            key="login_form"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4 }}
            className={css.loginForm}
          >
            <form onSubmit={handleSubmit} className={css.loginFormDiv}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h2 className={css.daxiltxt}>Başlayın</h2>
                <p className={css.login_top_txt}>Hələ hesabınız yoxdur? <a href='/register'>Qeydiyyatdan keçin</a></p>
              </div>
              <div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Emailiniz"
                  className={css.emailinput}
                />
              </div>
              <div className={css.pass_div}>
                <img src='/key.svg' className={css.keyicon} />
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Şifrəniz"
                  className={css.pass}
                ></input>
                <span onClick={togglePasswordVisibility}>
                  {passwordVisible ? <img src='eye.svg' className={css.eye} /> : <FaEye className={css.eye} />}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2vw' }}>
                <label className={css.rememberMe}>
                  <input
                    type="checkbox" 
                    name="rememberMe"
                    className={css.checkbox}
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  Məni xatırla
                </label>
                <a className={css.logintxt} href='#'><i>Şifrəmi unutdum </i></a>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2vw' }}>
             <button className={css.daxilol} type="submit">  <a href='/home' style={{color:'white'}}>➜ Daxil ol</a> </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
     
    </div>
  );
}