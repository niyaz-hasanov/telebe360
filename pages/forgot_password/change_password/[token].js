"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import toast from "../../../utils/toastLimited";

import css from "./css.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Recovery() {
  const router = useRouter();
  const { token } = router.query; // URL'den token alınır
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    symbol: false,
    noQuestionMark: true,
    noSpace: true,
  });

  useEffect(() => {
    if (!token) {
      toast.error("Token səhvdir");
    }
  }, [token]);

  const validatePassword = (password) => {
    if (!passwordRequirements.length) {
      toast.error("Şifrə ən az 8 simvoldan ibarət olmalıdır!");
      return false;
    }
    if (!passwordRequirements.uppercase) {
      toast.error("Şifrənizdə ən az 1 böyük hərf olmalıdır");
      return false;
    }
    if (!passwordRequirements.symbol) {
      toast.error("Şifrədə ən az 1 simvol olmalıdır");
      return false;
    }
    if (!passwordRequirements.noQuestionMark) {
      toast.error("Şifrədə ? simvolundan istifadə etməyin!");
      return false;
    }
    if (!passwordRequirements.noSpace) {
      toast.error("Şifrədə boşluq olmamalıdır!");
      return false;
    }
    return true;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Validate the password against the requirements
    const requirements = {
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      symbol: /[^A-Za-z0-9]/.test(newPassword),
      noQuestionMark: !/[\?]/.test(newPassword),
      noSpace: !/\s/.test(newPassword),
    };

    setPasswordRequirements(requirements);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Öncelik: Şifrelerin uyumluluğunu kontrol et
    if (password !== confirmPassword) {
      toast.error("Şifrələr uyğunlaşmır!");
      return;
    }

    // Şifre kurallarını kontrol et
    if (!validatePassword(password)) {
      return;
    }

    try {
      setIsButtonDisabled(true);

      const response = await fetch(
        `https://api.telebe360.com/api/v1/auth/recovery/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ password }).toString(),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Şifrə uğurla dəyişdirildi!");
      } else {
        toast.error(data.message || "Şifrə dəyişdirilərkən xəta baş verdi.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Xəta! İnternet qoşulmanızı yoxlayın.");
    } finally {
      setIsButtonDisabled(false);
    }
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 className={css.daxiltxt}>Şifrəni Dəyişdir</h2>
              <p className={css.login_top_txt}>Yeni şifrə seçin</p>
            </div>
            <div className={css.passwordField}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                placeholder="Yeni Şifrə"
                className={css.emailinput}
                onChange={handlePasswordChange}
              />
              <span
                className={css.eyespan}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <FaEyeSlash className={css.eye} />
                ) : (
                  <FaEye className={css.eye} />
                )}
              </span>
            </div>
            <div>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Şifrəni Təkrarlayın"
                className={css.emailinput}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <p>Şifrəniz aşağıdakıları əhatə etməlidir:</p>

            <ul className={css.passwordRequirements}>
              <li
                style={{
                  color: passwordRequirements.length ? "green" : "red",
                }}
              >
                ən az 8 xanalı olmalıdır
              </li>
              <li
                style={{
                  color: passwordRequirements.uppercase ? "green" : "red",
                }}
              >
                ən az 1 böyük hərf
              </li>
              <li
                style={{
                  color: passwordRequirements.symbol ? "green" : "red",
                }}
              >
                ən az 1 simvol
              </li>
              <li
                style={{
                  color: passwordRequirements.noQuestionMark ? "green" : "red",
                }}
              >
                şifrədə ? simvolundan istifadə etməyin
              </li>
            </ul>

            <div className={css.button_div}>
              <button
                className={`${css.daxilol} ${
                  isButtonDisabled ? css.disabledButton : ""
                }`}
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
