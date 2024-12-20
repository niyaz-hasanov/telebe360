"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { toast } from 'react-hot-toast';
import css from './css.module.css';

export default function Recovery() {
  const router = useRouter();
  const { token } = router.query; // URL'den token alınır
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (!token) {
      // Token yoksa sayfaya erişim engellenebilir veya başka bir yönlendirme yapılabilir
      toast.error('Token səhvdir');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Şifrələr uyöunlaşmır!');
      return;
    }

    try {
      setIsButtonDisabled(true);

      const formBody = new URLSearchParams();
      formBody.append('password', password);

      const response = await fetch(`/api/auth/recovery/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`, // Token header'a ekleniyor
        },
        body: formBody.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Şifrə uğurla dəyişdirildi!');
        router.push('/login'); // Şifre değişikliği sonrası giriş sayfasına yönlendirilir
      } else {
        toast.error(data.message || 'Şifrə dəyişdirilərkən xəta baş verdi.');
      }
    } catch (error) {
      toast.error('Xəta! İnternet qoşulmanızı yoxlayın');
    } finally {
      setIsButtonDisabled(false);
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
        <title>Şifrəni Dəyişdir</title>
        <link rel="icon" href="/home/360minilogo.svg" />
      </Head>

      <AnimatePresence>
        <motion.div
          key="recovery_form"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.4 }}
          className={css.loginForm}
        >
          <form onSubmit={handleSubmit} className={css.loginFormDiv}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h2 className={css.daxiltxt}>Şifrəni Dəyişdir</h2>
              <p className={css.login_top_txt}>Yeni şifrə seçin</p>
            </div>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Yeni Şifrə"
                className={css.emailinput}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Şifrəni Təkrarlayın"
                className={css.emailinput}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className={css.button_div}>
              <button
                className={`${css.daxilol} ${isButtonDisabled ? css.disabledButton : ''}`}
                type="submit"
                disabled={isButtonDisabled}
              >
                ➜ Şifrəni Dəyişdir
              </button>
              {isButtonDisabled && (
                <div className={css.timerText}>
                  <p>Şifrə dəyişdirilir...</p>
                </div>
              )}
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
