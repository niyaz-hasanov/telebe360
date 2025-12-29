"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import toast from "../../utils/toastLimited";

import css from "./css.module.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "" });
  const [activeDiv, setActiveDiv] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const TIMER_DURATION = 2 * 60; // 2 dakika = 120 saniye

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedExpiration = localStorage.getItem("expirationTime");

    if (savedEmail) {
      setFormData({ email: savedEmail });
    }

    if (savedExpiration) {
      const now = Date.now();
      const expirationTime = Number(savedExpiration);

      if (expirationTime > now) {
        const remainingTime = Math.floor((expirationTime - now) / 1000);
        setTimer(remainingTime);
        setIsButtonDisabled(true);
      } else {
        localStorage.removeItem("expirationTime");
      }
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTime) => {
          const newTime = prevTime - 1;

          if (newTime <= 0) {
            clearInterval(countdown);
            setIsButtonDisabled(false);
            localStorage.removeItem("expirationTime");
            return 0;
          }

          return newTime;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // E-posta formatını kontrol et
    if (!formData.email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      toast.error("Düzgün email daxil etmədiniz");
      return;
    }
  
    try {
      const formBody = new URLSearchParams();
      formBody.append("email", formData.email);
  
      // API isteği yap
      const response = await fetch("/api/auth/recovery", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });
  
      const data = await response.json();
      console.log("Api cavabı", data);
  
      if (response.ok) {
        // API başarılıysa sayaç başlat ve localStorage işlemlerini yap
        toast.success(
          "Şifrə dəyişmə tələbiniz uğurla göndərildi. Verifikasiya maili üçün e-poçt qutunuzu yoxlayın."
        );
  
        localStorage.setItem("email", formData.email);
  
        const expirationTime = Date.now() + TIMER_DURATION * 1000; // 2 dakika ekle
        localStorage.setItem("expirationTime", expirationTime);
  
        setTimer(TIMER_DURATION);
        setIsButtonDisabled(true);
      } else {
        // API başarısızsa hata mesajını göster
        toast.error(data.message || "Şifrə dəyişmə tələbinin göndərilməsi zamanı xəta baş verdi.");
      }
    } catch (error) {
      console.error("Fetch Hatası:", error);
      toast.error("Xəta! İnternet qoşulmanızı yoxlayın");
    }
  };
  
  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={css.body}>
      <style jsx global>{`
        body {
          background-image: url("/loginback.svg");
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
        <link rel="icon" href="/home/360minilogo.ico" />
      </Head>

      <AnimatePresence>
        {activeDiv === 1 && (
          <motion.div
            key="login_form"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4 }}
            className={css.loginForm}
          >
            <form onSubmit={handleSubmit} className={css.loginFormDiv}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2 className={css.daxiltxt}>Başlayın</h2>
                <p className={css.login_top_txt}>
                  Şifrənizi bərpa etdiniz? <a href="/login">Daxil olun</a>
                </p>
              </div>
              <div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  placeholder="Emailiniz"
                  className={css.emailinput}
                  onChange={handleInputChange}
                />
              </div>
              <div className={css.button_div}>
                <button
                  className={`${css.daxilol} ${
                    isButtonDisabled ? css.disabledButton : css.enabledButton
                  }`}
                  type="submit"
                  disabled={isButtonDisabled}
                >
                  ➜ Daxil ol
                </button>
                {isButtonDisabled && (
                  <div className={css.timerText}>
                    <p>{`${formatTime(timer)} sonra yenidən istək göndərə bilərsiniz`}</p>
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
