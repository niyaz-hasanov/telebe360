"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import css from './register.module.css';
import { FaEye } from 'react-icons/fa';
import { APIURL, MAINURL } from '../../utils/constants';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

export default function Register() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    referal_code: '',
    birth_date: '',
    sex: '',
    email: '',
    password: '',
    university_id: '',
    card: null,
    imagePreview: null,
  });

  const [activeDiv, setActiveDiv] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    symbol: false,
    noSpace: true,
    noQuestionMark: true,
  });
  const [timer, setTimer] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // API request zamanı multi-click qarşısı

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch(`${APIURL}universities/`);
        const data = await response.json();
        setUniversities(data);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  const isValidBirthDate = (birthDate) => {
    const birth = new Date(birthDate);

    const day = birth.getDate();
    if (day > 31) {
      toast.error("Gün 31-dən böyük ola bilməz!");
      return false;
    }

    const month = birth.getMonth() + 1;
    if (month > 12) {
      toast.error("Ay 12-dən böyük ola bilməz!");
      return false;
    }

    const year = birth.getFullYear();
    if (year < 1970) {
      toast.error("Yaş 50-dən böyük ola bilməz!");
      return false;
    }

    return true;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const checkAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    const dayDifference = today.getDate() - birth.getDate();
    return (
      age > 17 ||
      (age === 17 &&
        (monthDifference > 0 ||
          (monthDifference === 0 && dayDifference >= 0)))
    );
  };

  const checkPasswordStrength = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
      noSpace: !/\s/.test(password),
      noQuestionMark: !/\?/.test(password),
    };
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === 'fname' || name === 'lname') {
      const regex = /^[A-Za-zÇçəƏĞğİıÖöŞşÜü\s]*$/;
      if (!regex.test(value)) {
        toast.error('Ad və soyad yalnız hərflərdən ibarət olmalıdır!');
        return;
      }
    }

    if (type === 'file' && name === 'card') {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
        imagePreview: URL.createObjectURL(file),
      });
    } else if (name === 'sex') {
      const isMale = value === 'male';
      setFormData({ ...formData, [name]: isMale });
    } else {
      setFormData({ ...formData, [name]: value });

      if (name === 'birth_date') {
        if (!checkAge(value)) {
          return;
        }
      }

      if (name === 'password') {
        const requirements = checkPasswordStrength(value);
        setPasswordRequirements(requirements);

        setPasswordStrength(
          requirements.length &&
            requirements.uppercase &&
            requirements.symbol &&
            requirements.noSpace &&
            requirements.noQuestionMark
            ? 'strong'
            : requirements.length &&
              (requirements.uppercase || requirements.symbol)
            ? 'medium'
            : 'weak'
        );
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // VALIDASYALAR – yeni step sıralamasına uyğun
  const validateForm = () => {
    // Step 1: personal info
    if (activeDiv === 1) {
      if (!formData.fname || !formData.lname || !formData.birth_date || formData.sex === '') {
        toast.error("Zəhmət olmasa bütün xanaları doldurun.");
        return false;
      }
      if (formData.fname.length < 3 || formData.lname.length < 3) {
        toast.error("Adınız ən azı 3 hərf olmalıdır.");
        return false;
      }

      if (!checkAge(formData.birth_date)) {
        toast.error("Qeydiyyat üçün ən az 17 yaşında olmalısınız!");
        return false;
      }

      if (!isValidBirthDate(formData.birth_date)) {
        return false;
      }
    }

    // Step 2: universitet + kart
    if (activeDiv === 2) {
      if (!formData.university_id && !formData.card) {
        toast.error("Zəhmət olmasa universitetinizi seçin və tələbə kartınızı yükləyin.");
        return false;
      }
      if (!formData.university_id) {
        toast.error("Zəhmət olmasa universitetinizi seçin.");
        return false;
      }
      if (!formData.card) {
        toast.error("Zəhmət olmasa tələbə kartınızı yükləyin.");
        return false;
      }

      const allowedImageTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'];
      if (formData.card && formData.card.type && !allowedImageTypes.includes(formData.card.type)) {
        toast.error("Yalnız png, jpg, jpeg və svg şəkil formatları qəbul edilir.");
        return false;
      }
    }

    // Step 3: email + şifrə
    if (activeDiv === 3) {
      if (!formData.email) {
        toast.error("Zəhmət olmasa emailinizi daxil edin.");
        return false;
      }

      if (!formData.password) {
        toast.error("Zəhmət olmasa şifrənizi daxil edin.");
        return false;
      }

      if (formData.password.includes('?')) {
        toast.error("Şifrəniz '?' simvolunu əhatə etməməlidir.");
        return false;
      }

      const isPasswordValid = Object.values(passwordRequirements).every((req) => req);

      if (!passwordRequirements.noSpace) {
        toast.error("Şifrədə boşluq ola bilməz!");
        return false;
      }

      if (!isPasswordValid) {
        toast.error("Şifrəniz bütün tələbləri ödəməlidir!");
        return false;
      }
    }

    // Son check – required fieldlər
    switch (activeDiv) {
      case 1:
        return (
          formData.fname &&
          formData.lname &&
          formData.birth_date &&
          formData.sex !== ''
        );
      case 2:
        return formData.university_id && formData.card;
      case 3:
        // referal kodu sizdə optional kimi görünür, isdəsəniz bura && formData.referal_code da əlavə edə bilərsiz
        return formData.email && formData.password;
      default:
        return false;
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;

  const formDataToSend = new FormData();
  formDataToSend.append('fname', formData.fname);
  formDataToSend.append('lname', formData.lname);
  formDataToSend.append('birth_date', formData.birth_date);
  formDataToSend.append('referal_code', formData.referal_code);
  formDataToSend.append('sex', formData.sex);
  formDataToSend.append('university_id', formData.university_id);
  formDataToSend.append('email', formData.email);
  formDataToSend.append('password', formData.password);
  formDataToSend.append('card', formData.card);

  try {
    setIsSubmitting(true);
    const response = await fetch(`${APIURL}auth/sign-up`, {
      method: 'POST',
      body: formDataToSend,
    });

    const result = await response.json();

    if (response.ok) {
      toast.success(
        'Qeydiyyat sorğusu uğurla göndərildi! Zəhmət olmasa e-poçtunuza daxil olub, hesabınızı təsdiq edin. Təsdiq etdikdən sonra hesabınıza giriş edə bilərsiniz'
      );
      setActiveDiv(4);
      setIsTimerRunning(true);
      setTimer(120);
    } 
   
    else if (result?.detail === 'Referal code is invalid') {
      toast.error('Referal kod yanlışdır. Zəhmət olmasa düzgün kod daxil edin və ya boş buraxın.');
      // Burada activeDiv 3-də qalır, 4-ə keçmir
    } 
    else if (response.status === 409) {
      toast.error(
        result.message ||
          'Bu email artıq qeydiyyatdan keçib. Zəhmət olmasa başqa email yoxlayın'
      );
    } else if (response.status === 422) {
      toast.error(
        result.message ||
          'Gözlənilməyən növ məlumatlar göndərilməsinə görə xəta! Zəhmət olmasa qeydiyyat qaydalarına riayət edin!'
      );
    } else {
      toast.error(result.message || 'Xəta baş verdi, bir daha cəhd edin.');
    }
  } catch (error) {
    console.log('Server ilə əlaqə qurulmadı.', error);
    toast.error('Server ilə əlaqə qurulmadı.');
  } finally {
    setIsSubmitting(false);
  }
};


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Yalnız png, jpg, jpeg və svg şəkil formatları qəbul edilir.");
        return;
      }

      setFormData((prevState) => ({
        ...prevState,
        card: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleResendVerification = async () => {
    setTimer(120);
    setIsTimerRunning(true);

    try {
      const response = await fetch(`${APIURL}auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        toast.success('Verifikasiya e-maili uğurla göndərildi!');
      } else {
        toast.error('Verifikasiya e-maili göndərilə bilmədi!');
      }
    } catch (error) {
      toast.error('Xəta baş verdi. Zəhmət olmasa bir daha cəhd edin');
    }
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const universityOptions = universities.map((u) => ({
    value: u.id,
    label: u.name,
  }));

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
        <link rel="icon" href="/home/360minilogo.ico" />
      </Head>

      <AnimatePresence>
        {/* STEP 1: Ad, soyad, doğum tarixi, cinsiyyət */}
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
                <p>
                  Artıq hesabınız var? <a href="/login">Daxil olun</a>
                </p>
              </div>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="Adınız"
                className={css.input}
              />
              <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                placeholder="Soyadınız"
                className={css.input}
              />

              <DatePicker
                selected={formData.birth_date ? new Date(formData.birth_date) : null}
                onChange={(date) => {
                  if (date) {
                    setFormData({
                      ...formData,
                      birth_date: date.toISOString().split('T')[0],
                    });
                  }
                }}
                onChangeRaw={(e) => {
                  const raw = e.target.value;
                  if (/^\d{8}$/.test(raw)) {
                    const day = raw.slice(0, 2);
                    const month = raw.slice(2, 4);
                    const year = raw.slice(4);
                    const formatted = `${year}-${month}-${day}`;
                    const parsedDate = new Date(formatted);
                    if (!isNaN(parsedDate.getTime())) {
                      setFormData({
                        ...formData,
                        birth_date: parsedDate.toISOString().split('T')[0],
                      });
                    }
                  }
                }}
                placeholderText="Doğum Tarixiniz"
                className={css.input}
                showMonthDropdown
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                dateFormat="dd-MM-yyyy"
              />

              <select
                name="sex"
                value={
                  formData.sex === true
                    ? 'male'
                    : formData.sex === false
                    ? 'female'
                    : 'non-binary'
                }
                onChange={(e) => {
                  const value =
                    e.target.value === 'male'
                      ? true
                      : e.target.value === 'female'
                      ? false
                      : null;
                  setFormData({ ...formData, sex: value });
                }}
                className={css.input}
                id={css.gender_input}
              >
                <option value="non-binary">Cinsiyyətiniz</option>
                <option value="male">Kişi</option>
                <option value="female">Qadın</option>
              </select>

              <button
                className={css.nextbut}
                onClick={(e) => {
                  e.preventDefault();
                  if (validateForm()) {
                    setActiveDiv(2);
                  }
                }}
              >
                ➜ Növbəti
              </button>
            </form>
          </motion.div>
        )}

        {/* STEP 2: Universitet + tələbə kartı (DEYİŞDİRİLMİŞ) */}
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
              <button
                className={css.prevbut}
                onClick={() => setActiveDiv(activeDiv - 1)}
              >
                🡠
              </button>
            )}
            <form className={css.registerFormDiv}>
              <div className={css.form_top_div}>
                <h2 className={css.daxiltxt}>Başlayın</h2>
                <p>
                  Artıq hesabınız var? <a href="/login">Daxil olun</a>
                </p>
              </div>

              <Select
                className={css.uniselect}
                classNamePrefix="uni"
                placeholder="Universitetiniz"
                options={universityOptions}
                value={
                  universityOptions.find(
                    (opt) => String(opt.value) === String(formData.university_id)
                  ) || null
                }
                onChange={(selectedOption) => {
                  setFormData((prev) => ({
                    ...prev,
                    university_id: selectedOption ? selectedOption.value : '',
                  }));
                }}
                components={{
                  IndicatorSeparator: () => null,
                }}
                styles={{
                  container: (base) => ({
                    ...base,
                    width: '30vw',
                  }),
                  control: (base, state) => ({
                    ...base,
                    minHeight: '3rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    boxShadow: state.isFocused ? '0 0 0 2px #9977F4' : 'none',
                    fontSize: '1.2rem',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: '0 1.2rem',
                    overflow: 'hidden',
                    minWidth: 0,
                  }),
                  singleValue: (base) => ({
                    ...base,
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: '#999',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    paddingRight: '1rem',
                    flexShrink: 0,
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 9999,
                    fontSize: '1.2rem',
                    width: '100%',
                  }),
                  option: (base, state) => ({
                    ...base,
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    padding: '0.6rem 1rem',
                    backgroundColor: state.isFocused
                      ? 'rgba(153, 119, 244, 0.15)'
                      : 'white',
                    color: 'black',
                  }),
                }}
              />

              <div className={css.fileUploadDiv}>
                <p className={css.fileUploadLabel}>Tələbə kartınız</p>
                <label htmlFor="card">
                  <img
                    className={css.uploadIcon}
                    src={formData.imagePreview || '/telebe_input.svg'}
                    alt="Upload Icon"
                  />
                </label>
                <input
                  type="file"
                  name="card"
                  id="card"
                  onChange={handleFileChange}
                  className={css.inputFile}
                />
              </div>

              <button
                className={css.nextbut}
                onClick={(e) => {
                  e.preventDefault();
                  if (validateForm()) {
                    setActiveDiv(3);
                  }
                }}
              >
                ➜ Növbəti
              </button>
            </form>
          </motion.div>
        )}

        {/* STEP 3: Email + şifrə (DEYİŞDİRİLMİŞ) */}
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
              <button
                className={css.prevbut}
                onClick={() => setActiveDiv(activeDiv - 1)}
              >
                🡠
              </button>
            )}
            <form className={css.registerFormDiv}>
              <div className={css.form_top_div}>
                <h2 className={css.daxiltxt}>Başlayın</h2>
                <p>
                  Artıq hesabınız var? <a href="/login">Daxil olun</a>
                </p>
              </div>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Emailiniz"
                className={css.input}
              />
              <span id={css.referal}>
                <input
                  type="text"
                  name="referal_code"
                  value={formData.referal_code}
                  onChange={handleChange}
                  placeholder="Referal Kod"
                  className={css.input}
                  id={css.referal}
                />
                <span id={css.infoiconspan}>
                  <img id={css.infoicon} src="/info.svg" />
                  <span id={css.info_bubble}>
                    Dostunun səni dəvət etməsi ilə əldə olunan unikal koddur. Bu
                    kodu daxil etməklə həm sən, həm də dostun bonus xallar
                    qazana bilər. Əgər referal kodunuz yoxdursa, bu bölməni boş
                    buraxa bilərsiniz
                  </span>
                </span>
              </span>

              <div className={css.passwordDiv}>
                <img src="/key.svg" className={css.keyicon} />
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Şifrəniz"
                  className={css.input}
                  id={css.password_input}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className={css.eyeIcon}
                >
                  {passwordVisible ? (
                    <img src="eye.svg" className={css.eye} />
                  ) : (
                    <FaEye className={css.eye} />
                  )}
                </span>
                <div>
                  <p>Şifrənizin gücü</p>
                  <div
                    className={css.passwordStrengthBar}
                    style={{
                      width:
                        passwordStrength === 'strong'
                          ? '100%'
                          : passwordStrength === 'medium'
                          ? '66%'
                          : '33%',
                      backgroundColor:
                        passwordStrength === 'strong'
                          ? 'green'
                          : passwordStrength === 'medium'
                          ? 'orange'
                          : 'red',
                    }}
                  ></div>
                </div>
              </div>
              <p>Şifrəniz aşağıdakıları əhatə etməlidir:</p>

              <ul className={css.passwordRequirements}>
                <li
                  style={{
                    listStyle: 'circle',
                    color: passwordRequirements.length ? 'green' : 'red',
                  }}
                >
                  ən az 8 xanalı olmalıdır
                </li>
                <li
                  style={{
                    listStyle: 'circle',
                    color: passwordRequirements.uppercase ? 'green' : 'red',
                  }}
                >
                  ən az 1 böyük hərf
                </li>
                <li
                  style={{
                    listStyle: 'circle',
                    color: passwordRequirements.symbol ? 'green' : 'red',
                  }}
                >
                  ən az 1 simvol
                </li>
                <li
                  style={{
                    listStyle: 'circle',
                    color: passwordRequirements.noQuestionMark
                      ? 'green'
                      : 'red',
                  }}
                >
                  şifrədə ? simvolundan istifadə etməyin
                </li>
              </ul>

              <button
                className={css.nextbut}
                onClick={(e) => {
                  e.preventDefault();
                  if (validateForm()) {
                    // Burdan sonra yalnız API OK cavabı gəlsə 4-cü stepe keçəcək
                    handleSubmit(e);
                  }
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Göndərilir...' : '➜ Növbəti'}
              </button>
            </form>
          </motion.div>
        )}

        {/* STEP 4: Mail verifikasiyası */}
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
              <button
                className={css.prevbut}
                onClick={() => setActiveDiv(activeDiv - 1)}
              >
                🡠
              </button>
            )}
            <form onSubmit={handleSubmit} className={css.registerFormDiv}>
              <div className={css.form_top_div}>
                <h2 className={css.daxiltxt}>Başlayın</h2>
                <p>
                  Mail təsdiqi etdiniz? <a href="/login">Daxil olun</a>
                </p>
              </div>
              <div className={css.validationDiv}>
                <span className={css.timer}>
                  <p>{formatTime(timer)}</p>
                </span>
                <button
                  onClick={handleResendVerification}
                  className={
                    isTimerRunning ? css.disabledButton : css.activeButton
                  }
                  disabled={isTimerRunning}
                >
                  Verifikasiya mailini təkrar göndər
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
