import React from 'react';

const Termsofuse = () => {
  return (
    <div className="terms_of_use" id="terms">

      <h1 className="error-title">Terms of Use (İstifadə Qaydaları)</h1>

      <div className="error-message">

        <p><strong>Son yenilənmə tarixi:</strong> 25.12.2025</p>

        <p>
          Telebe360 platformasından istifadə etməklə siz aşağıdakı qaydalarla razılaşırsınız.
          Platformadan istifadə etmək üçün hesabınızın olması tələb olunur.
        </p>

        <h2>1. Ümumi Qaydalar</h2>
        <ul>
          <li>Telebe360 yalnız real tələbələr üçün nəzərdə tutulmuşdur.</li>
          <li>Platformadan istifadə yalnız qanuni məqsədlər üçün mümkündür.</li>
          <li>Hesab məlumatlarınızın təhlükəsizliyi sizin məsuliyyətinizdədir.</li>
        </ul>

        <h2>2. Hesab və Tələbə Statusu</h2>
        <ul>
          <li>Hər istifadəçi yalnız bir hesab yarada bilər.</li>
          <li>
            Tələbə statusu real tələbə bileti ilə təsdiqlənir və moderator tərəfindən yoxlanılır.
          </li>
          <li>
            Saxta və ya düzgün olmayan biletlər qəbul edilmir və hesab dayandırıla bilər.
          </li>
        </ul>

        <h2>3. Kart və Ödəniş Məlumatları</h2>
        <ul>
          <li>Gələcəkdə platformada kart və ödəniş məlumatları toplana bilər.</li>
          <li>Bu məlumatlar yalnız platforma daxilində əməliyyatlar üçün istifadə olunur.</li>
          <li>
            Tələbə biletində kart məlumatlarının olduğu paylaşımlar qəbul edilmir və ya silinir.
            Telebe360 bu hallardan dolayı məsuliyyət daşımır.
          </li>
        </ul>

        <h2>4. Tcoin və Platforma Daxili Aktivlik</h2>
        <ul>
          <li>
            Tcoin platformanın daxili loyallıq valyutasıdır və yalnız platforma daxilində istifadə olunur.
          </li>
          <li>Tcoin-i qanunsuz və ya üçüncü tərəfə satmaq qadağandır.</li>
          <li>
            Telebe360 Tcoin qaydalarını istənilən vaxt dəyişmək hüququna malikdir.
          </li>
        </ul>

        <h2>5. Qadağan Olunmuş Fəaliyyətlər</h2>
        <p>Platformadan aşağıdakı hallarda istifadə qadağandır:</p>
        <ul>
          <li>Saxta məlumat təqdim etmək</li>
          <li>Digər istifadəçilərin hüquqlarını pozmaq</li>
          <li>Platformanın təhlükəsizliyinə zərər vermək</li>
          <li>Tcoin və ödəniş sistemlərindən sui-istifadə</li>
        </ul>

        <h2>6. Hesabın Dayandırılması</h2>
        <p>Telebe360 aşağıdakı hallarda hesabı müvəqqəti və ya daimi olaraq dayandıra bilər:</p>
        <ul>
          <li>Xidmət Qaydalarının pozulması</li>
          <li>Saxta tələbə statusu</li>
          <li>Tcoin və ödəniş sistemlərindən sui-istifadə</li>
        </ul>

        <h2>7. Məsuliyyətin Məhdudlaşdırılması</h2>
        <ul>
          <li>Platforma “olduğu kimi” təqdim olunur.</li>
          <li>
            Texniki nasazlıqlar, məlumat itkisi, Tcoin dəyərinin dəyişməsi və
            üçüncü tərəf xidmətlərinə görə məsuliyyət daşımır.
          </li>
        </ul>

        <h2>8. Dəyişikliklər</h2>
        <p>
          Telebe360 bu İstifadə Qaydalarına istənilən vaxt dəyişiklik etmək hüququna malikdir.
          Dəyişikliklər platformada dərc edildiyi andan qüvvəyə minir.
        </p>

        <h2>9. Əlaqə</h2>
        <p>Suallar və dəstək üçün:</p>
        <p>📧 Email: <a href="mailto:office.telebe360@gmail.com">office.telebe360@gmail.com</a></p>
        <p>🌐 Website: Telebe360</p>

      </div>

      <a href="/">
        <button className="home-button">Ana səhifəyə qayıt</button>
      </a>

      <style jsx>{`
        .terms_of_use {
          margin-top: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .error-title {
          font-size: 22px;
          color: black;
        }

        .error-message {
          width: 80%;
          font-weight: 500;
          line-height: 1.6;
          text-align: left;
          font-size: 16px;
        }

        .error-message h2 {
          font-size: 18px;
          margin-top: 22px;
        }

        /* UL / LI override (global reset fix) */
        #terms ul {
          list-style-type: disc !important;
          padding-left: 24px;
          margin: 10px 0;
        }

        #terms li {
          margin-bottom: 6px;
        }

        #terms li::marker {
          color: #9977F4;
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

        /* =========================
           RESPONSIVE FONT SIZES
           ========================= */

        /* Tablet */
        @media (max-width: 1024px) {
          .error-title {
            font-size: 20px;
          }

          .error-message {
            width: 90%;
            font-size: 15px;
          }

          .error-message h2 {
            font-size: 17px;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .error-title {
            font-size: 18px;
            text-align: center;
          }

          .error-message {
            width: 95%;
            font-size: 14px;
            line-height: 1.7;
          }

          .error-message h2 {
            font-size: 16px;
            margin-top: 18px;
          }

          #terms ul {
            padding-left: 20px;
          }

          .home-button {
            width: 160px;
            font-size: 14px;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .error-title {
            font-size: 16px;
          }

          .error-message {
            font-size: 13.5px;
          }

          .error-message h2 {
            font-size: 15px;
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

export default Termsofuse;
