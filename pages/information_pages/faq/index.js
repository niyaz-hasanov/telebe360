import React from "react";

const FAQ = () => {
  return (
    <div className="faq_page" id="faq">

      <h1 className="page-title">FAQ – Tez-tez Verilən Suallar</h1>

      <div className="page-content">

        <h2>1️⃣ Qeydiyyat və Hesab</h2>

        <div className="qa">
          <p className="question">Sual: Qeydiyyat pulsuzdurmu?</p>
          <p className="answer">
            Cavab: Bəli, Telebe360 platformasında qeydiyyat tamamilə pulsuzdur.
          </p>
        </div>

        <div className="qa">
          <p className="question">Sual: Hesab yaratmaq üçün hansı məlumatlar tələb olunur?</p>
          <p className="answer">
            Cavab: Ad, soyad, elektron poçt ünvanı və tələbə statusunu təsdiqləyən sənəd
            (tələbə bileti) tələb olunur.
          </p>
        </div>

        <div className="qa">
          <p className="question">Sual: Hesabımı necə silə bilərəm?</p>
          <p className="answer">
            Cavab: Hesabın silinməsi üçün{" "}
            <a href="mailto:office.telebe360@gmail.com">office.telebe360@gmail.com</a>{" "}
            ünvanına müraciət edə bilərsiniz.
          </p>
        </div>

        <h2>2️⃣ Tələbə Statusu</h2>

        <div className="qa">
          <p className="question">Sual: Tələbə statusu necə təsdiqlənir?</p>
          <p className="answer">
            Cavab: Qeydiyyat zamanı real tələbə bileti yükləyirsiniz və moderatorlar
            tərəfindən yoxlanılır.
          </p>
        </div>

        <div className="qa">
          <p className="question">
            Sual: Saxta və ya düzgün olmayan tələbə bileti yükləsəm nə olacaq?
          </p>
          <p className="answer">
            Cavab: Saxta və ya düzgün olmayan biletlər qəbul edilmir və hesab
            dayandırıla bilər. Telebe360 bu biletlərdən dolayı məsuliyyət daşımır.
          </p>
        </div>

        <div className="qa">
          <p className="question">
            Sual: Tələbə biletində kart məlumatları varsa nə olur?
          </p>
          <p className="answer">
            Cavab: Tələbə biletində kart məlumatlarının olduğu paylaşımlar qəbul edilmir
            və ya silinir. Telebe360 bu hallardan dolayı məsuliyyət daşımır.
          </p>
        </div>

        <h2>3️⃣ Tcoin Loyallıq Sistemi</h2>

        <div className="qa">
          <p className="question">Sual: Tcoin nədir?</p>
          <p className="answer">
            Cavab: Tcoin Telebe360 platformasının daxili loyallıq valyutasıdır və yalnız
            platforma daxilində istifadə olunur.
          </p>
        </div>

        <div className="qa">
          <p className="question">Sual: Tcoin ilə nə edə bilərəm?</p>
          <p className="answer">
            Cavab: Tcoin-i platforma daxilində müxtəlif sosial və iqtisadi fəaliyyətlər
            üçün istifadə etmək mümkündür, məsələn aktivliyə görə bonus qazanmaq və ya
            müəyyən funksiyaları unlock etmək.
          </p>
        </div>

        <div className="qa">
          <p className="question">Sual: Tcoin-i nağd pula çevirə bilərəm?</p>
          <p className="answer">
            Cavab: Xeyr, Tcoin real pul vahidi deyil və bank əməliyyatları üçün istifadə
            edilə bilməz.
          </p>
        </div>

        <h2>4️⃣ Ödəniş və Kart Məlumatları</h2>

        <div className="qa">
          <p className="question">Sual: Platformada kart məlumatlarım təhlükəsizdirmi?</p>
          <p className="answer">
            Cavab: Bəli, bütün ödəniş məlumatları təhlükəsiz şəkildə saxlanılır və üçüncü
            tərəf ödəniş provayderləri vasitəsilə emal olunur.
          </p>
        </div>

        <div className="qa">
          <p className="question">
            Sual: Kart məlumatları görünən tələbə biletlərinə görə Telebe360 məsuliyyət
            daşıyırmı?
          </p>
          <p className="answer">
            Cavab: Xeyr, bu hallarda məsuliyyət istifadəçiyə aiddir.
          </p>
        </div>

        <h2>5️⃣ Texniki Suallar</h2>

        <div className="qa">
          <p className="question">Sual: Cookies nə üçün istifadə olunur?</p>
          <p className="answer">
            Cavab: Cookies platformada sessiyanın idarə olunması, təhlükəsizlik və
            analitika üçün istifadə olunur.
          </p>
        </div>

        <div className="qa">
          <p className="question">
            Sual: Hesabımı başqa cihazda istifadə edə bilərəmmi?
          </p>
          <p className="answer">
            Cavab: Bəli, hesabınıza istənilən cihazdan daxil ola bilərsiniz, lakin
            təhlükəsizlik səbəbi ilə yalnız sizin məlumatlarınızdan istifadə olunmalıdır.
          </p>
        </div>

        <h2>6️⃣ Əlaqə</h2>

        <div className="qa">
          <p className="question">Sual: Suallarım üçün kimə müraciət edə bilərəm?</p>
          <p className="answer">
            Cavab: Məxfilik siyasəti və digər suallar üçün{" "}
            <a href="mailto:office.telebe360@gmail.com">
              office.telebe360@gmail.com
            </a>{" "}
            ünvanına yazın.
          </p>
        </div>

      </div>

       
      <a href="/">
        <button className="home-button">Ana səhifəyə qayıt</button>
      </a>
      <style jsx>{`
        .faq_page {
          margin-top: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .page-title {
          font-size: 22px;
          text-align: center;
          margin-bottom: 20px;
        }

        .page-content {
          width: 80%;
          font-size: 16px;
          line-height: 1.6;
        }

        .page-content h2 {
          margin-top: 30px;
          font-size: 18px;
        }

        .qa {
          margin-top: 12px;
        }

        .question {
          font-weight: 700;
          color: #333;
        }

        .answer {
          margin-top: 4px;
          font-weight: 500;
        }

        a {
          color: #8f00ff;
          text-decoration: none;
          font-weight: 600;
        }

        a:hover {
          text-decoration: underline;
        }

         .home-button {
          margin-top: 20px;
          width: 180px;
          padding: 10px;
          border-radius: 10px;
          border: none;
          color: white;
          font-weight: 800;
          cursor: pointer;
          transition: 0.4s;
          background: linear-gradient(137deg, rgba(143,0,255,1) 30%, rgba(189,0,255,1) 100%);
        }

        .home-button:hover {
          background: transparent;
          border: 1px solid #9977F4;
          color: #9977F4;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .page-content {
            width: 90%;
            font-size: 15px;
          }
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 18px;
          }

          .page-content {
            width: 95%;
            font-size: 14px;
          }

          .page-content h2 {
            font-size: 16px;
          }
              .home-button {
            width: 160px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 16px;
          }

          .page-content {
            font-size: 13.5px;
          }
              .home-button {
            width: 150px;
            padding: 8px;
            font-size: 13px;
          }
        }
      `}</style>

    </div>
  );
};

export default FAQ;
