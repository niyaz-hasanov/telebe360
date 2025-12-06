"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import css from './register.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { APIURL, MAINURL } from '../../utils/constants'
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

export default function Register() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    referalCode: '',
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
  });
  const [timer, setTimer] = useState(120); // Başlangıçta 2 dakika (120 saniye)
  const [isTimerRunning, setIsTimerRunning] = useState(false); // 120 saniye = 2 dakika
  const [isResendActive, setIsResendActive] = useState(false);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch(`${APIURL}universities/`);
        const data = await response.json();
        setUniversities(data); // Assuming `data` is an array
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  const isValidBirthDate = (birthDate) => {
    const birth = new Date(birthDate);

    // Gün kontrolü
    const day = birth.getDate();
    if (day > 31) {
      toast.error("Gün 31-dən böyük ola bilməz!");
      return false;
    }

    // Ay kontrolü
    const month = birth.getMonth() + 1; // getMonth() 0'dan başladığı için 1 ekliyoruz
    if (month > 12) {
      toast.error("Ay 12-dən böyük ola bilməz!");
      return false;
    }

    // Yıl kontrolü
    const year = birth.getFullYear();
    if (year < 1970) {
      toast.error("Yaş 50-dən böyük ola bilməz!");
      return false;
    }

    // Eğer bütün kontroller geçtiyse, doğum tarihi geçerlidir.
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
    return age > 17 || (age === 17 && (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)));
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // fname ve lname için harf kontrolü
    if (name === 'fname' || name === 'lname') {
      const regex = /^[A-Za-zÇçəƏĞğİıÖöŞşÜü\s]*$/;
      if (!regex.test(value)) {
        toast.error('Ad və soyad yalnız hərflərdən ibarət olmalıdır!');
        return; // Geçersiz girdi olduğunda işlemi durdur
      }

    }

    if (type === 'file' && name === 'card') {
      const file = files[0];
      // Resmi yüklerken imagePreview'e resmin URL'sini ekliyoruz
      setFormData({
        ...formData,
        [name]: file,
        imagePreview: URL.createObjectURL(file), // Resmi yükledikten sonra önizleme için URL oluşturuyoruz
      });
    }


    else if (name === 'sex') {
      const isMale = value === "male";
      setFormData({ ...formData, [name]: isMale });
    } else {
      setFormData({ ...formData, [name]: value });

      if (name === 'birth_date') {
        if (!checkAge(value)) {
          return; // Tarih değiştiğinde yaş kontrolü başarısızsa form geçişini engelle
        }
      }

      if (name === 'password') {
        const requirements = checkPasswordStrength(value);
        setPasswordRequirements(requirements);

        // Şifre gücünü renk ile göster
        setPasswordStrength(
          requirements.length && requirements.uppercase && requirements.symbol
            ? 'strong'
            : requirements.length && (requirements.uppercase || requirements.symbol)
              ? 'medium'
              : 'weak'
        );
      }
    }
  };






  const checkPasswordStrength = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
      noSpace: !/\s/.test(password), // Boşluk karakterinin olmaması gerekiyor
      noQuestionMark: !/\?/.test(password), // '?' karakterinin olmaması gerekiyor
    };
  };


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const validateForm = () => {
    if (activeDiv === 1) {
      // Bütün alanlar doldurulmuş mu?
      if (!formData.fname || !formData.lname || !formData.birth_date || formData.sex === '') {
        toast.error("Zəhmət olmasa bütün xanaları doldurun.");
        return false;
      }
      if (formData.fname.length < 3 || formData.lname.length < 3) {
        toast.error("Adınız ən azı 3 hərf olmalıdır.");
        return false;
      }

      if (formData.password.includes('?')) {
        toast.error("Şifrəniz '?' simvolunu əhatə etməməlidir.");
        return false;
      }

      const allowedImageTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'];
      if (formData.card && formData.card.type && !allowedImageTypes.includes(formData.card.type)) {
        toast.error("Yalnız png, jpg, jpeg və svg şəkil formatları qəbul edilir.");
        return false;
      }

      // Yaş kontrolü
      if (!checkAge(formData.birth_date)) {
        toast.error("Qeydiyyat üçün ən az 17 yaşında olmalısınız!");
        return false;
      }

      // Yeni doğum tarihi kontrolü
      if (!isValidBirthDate(formData.birth_date)) {
        return false; // Tarih geçerli değilse, formu geçemez
      }
    }
    if (activeDiv === 2) {
      // Şifrenin gereksinimlerini kontrol et
      const isPasswordValid = Object.values(passwordRequirements).every((req) => req);

      // Şifrede boşluk varsa hata mesajı
      if (!passwordRequirements.noSpace) {
        toast.error("Şifrədə boşluq ola bilməz!");
        return false;
      }

      // Şifre tüm gereksinimleri karşılamıyorsa hata mesajı
      if (!isPasswordValid) {
        toast.error("Şifrəniz bütün tələbləri ödəməlidir!");
        return false;
      }
      if (activeDiv === 3) {
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
      }

    }


    switch (activeDiv) {
      case 1:
        return formData.fname && formData.lname && formData.referalCode && formData.birth_date && formData.sex !== '';
      case 2:
        return formData.email && formData.password;
      case 3:
        return formData.university_id && formData.card;
      default:
        return false;
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('fname', formData.fname);
    formDataToSend.append('lname', formData.lname);
    formDataToSend.append('birth_date', formData.birth_date);
    formDataToSend.append('referalCode', formData.referalCode);
    formDataToSend.append('sex', formData.sex); // Doğru değer gönderildiğinden emin olun
    formDataToSend.append('university_id', formData.university_id); // ID doğru mu?
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('card', formData.card); // File olarak gönderildiğinden emin olun

    try {
      const response = await fetch(`${APIURL}auth/sign-up`, {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Qeydiyyat sorğusu uğurla göndərildi! Zəhmət olmasa e-poçtunuza daxil olub, hesabınızı təsdiq edin.Təsdiq etdikdən sonra hesabınıza giriş edə bilərsiniz');
        setActiveDiv(4);
        setIsTimerRunning(true); // Timer'ı başlat
        startTimer();  // Sunucu başarılıysa 4. div'e geç
      } else if (response.status === 409) {
        toast.error(result.message || 'Bu email artıq qeydiyyatdan keçib.Zəhmət olmasa başqa email yoxlayın');
      }
      else if (response.status === 422) {
        toast.error(result.message || 'Gözlənilməyən növ məlumatlar göndərilməsinə görə xəta! Zəhmət olmasa qeydiyyat qaydalarına riayət edin!');
      } else {
        toast.error(result.message || 'Xəta baş verdi, bir daha cəhd edin.');
      }
    } catch (error) {
      console.log('Server ilə əlaqə qurulmadı.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Yalnızca png, jpg, jpeg ve svg dosyalarına izin ver
      const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Yalnız png, jpg, jpeg və svg şəkil formatları qəbul edilir.");
        return;
      }

      // Dosya geçerli, önizlemeyi ayarla
      setFormData(prevState => ({
        ...prevState,
        card: file,
        imagePreview: URL.createObjectURL(file) // Resim önizlemesini göster
      }));
    }
  };

  const handleResendVerification = async () => {
    setTimer(120); // Geri sayımı başlat (örneğin 10 saniye)
    setIsTimerRunning(true); // Zamanlayıcıyı çalıştır

    try {
      const response = await fetch(`${APIURL}auth/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        toast.success("Verifikasiya e-maili uğurla göndərildi!");
      } else {
        toast.error("Verifikasiya e-maili göndərilə bilmədi!");
      }
    } catch (error) {
      toast.error("Xəta baş verdi. Zəhmət olmasa bir daha cəhd edin");
    }
  };
  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1); // Timer'ı azalt
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false); // Timer sıfır olduğunda durdur
    }

    return () => clearInterval(interval); // Temizlik işlemi
  }, [isTimerRunning, timer]);
  const universityOptions = universities.map((u) => ({
    value: u.id,      // API’den gelen id
    label: u.name,    // API’den gelen name
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
                      birth_date: date.toISOString().split('T')[0]
                    });
                  }
                }}
                onChangeRaw={(e) => {
                  const raw = e.target.value;
                  // 05082003 gibi girişleri parse et
                  if (/^\d{8}$/.test(raw)) {
                    const day = raw.slice(0, 2);
                    const month = raw.slice(2, 4);
                    const year = raw.slice(4);
                    const formatted = `${year}-${month}-${day}`;
                    const parsedDate = new Date(formatted);
                    if (!isNaN(parsedDate.getTime())) {
                      setFormData({
                        ...formData,
                        birth_date: parsedDate.toISOString().split('T')[0]
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
                value={formData.sex === true ? "male" : formData.sex === false ? "female" : "non-binary"}
                onChange={(e) => {
                  const value = e.target.value === "male" ? true : e.target.value === "female" ? false : null;
                  setFormData({ ...formData, sex: value });
                }}
                className={css.input}
              >
                <option value="non-binary">Cinsiyyətiniz</option>
                <option value="male">Kişi</option>
                <option value="female">Qadın</option>
              </select>
              <input
                type="text"
                name="referalCode"
                value={formData.referalCode}
                onChange={handleChange}
                placeholder="Referal Kod"
                className={css.input}
              />
              <button className={css.nextbut}
                onClick={(e) => {
                  e.preventDefault();
                  if (validateForm()) {

                    setActiveDiv(2);
                  } else {

                  }
                }}>➜ Növbəti</button>
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
                <li style={{ color: 'grey', listStyle: 'circle', color: passwordRequirements.length ? 'green' : 'red' }}>ən az 8 xanalı olmalıdır</li>
                <li style={{ color: 'grey', listStyle: 'circle', color: passwordRequirements.uppercase ? 'green' : 'red' }}>ən az 1 böyük hərf</li>
                <li style={{ color: 'grey', listStyle: 'circle', color: passwordRequirements.symbol ? 'green' : 'red' }}>ən az 1 simvol</li>
                <li style={{ color: 'grey', listStyle: 'circle', color: passwordRequirements.noQuestionMark ? 'green' : 'red' }}>şifrədə ? simvolundan istifadə etməyin</li>
                <li style={{ color: 'grey', listStyle: 'circle', color: passwordRequirements.noSpace ? 'green' : 'red', display: 'none' }}></li>
              </ul>
              <button className={css.nextbut}
                onClick={(e) => {
                  e.preventDefault();
                  if (validateForm()) {
                    setActiveDiv(3);
                  } else {
                  }
                }}>➜ Növbəti</button>
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
                  /* DIŞ KAPSAYICI: .uniselect genişliğini kullansın, büyümesin */
                  container: (base) => ({
                    ...base,
                    width: '30vw',      // .uniselect'in width'i kadar
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
                    overflow: 'hidden',   // önemli
                    minWidth: 0,          // flex çocuklarının taşmasını engellemek için KRİTİK
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
                    backgroundColor: state.isFocused ? 'rgba(153, 119, 244, 0.15)' : 'white',
                    color: 'black',
                  }),
                }}
              />


              <div className={css.fileUploadDiv}>
                <p className={css.fileUploadLabel}>Tələbə kartınız</p>
                <label htmlFor="card">
                  <img
                    className={css.uploadIcon}
                    src={formData.imagePreview || '/telebe_input.svg'} // Eğer bir resim yüklendiyse, yüklenen resmi gösteriyoruz
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
                onClick={async (e) => {
                  e.preventDefault();
                  if (validateForm()) {
                    await handleSubmit(e); // Yalnız sunucu isteği olumlu yanıt alırsa aktifDiv'i artıracak
                  } else {
                  }
                }}
              >➜ Növbəti</button>
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
                <p>Mail təsdiqi etdiniz? <a href='/login'>Daxil olun</a></p>

              </div>
              <div className={css.validationDiv}>
                <span className={css.timer}><p>{formatTime(timer)}</p></span>
                <button
                  onClick={handleResendVerification}
                  className={isTimerRunning ? css.disabledButton : css.activeButton}
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
