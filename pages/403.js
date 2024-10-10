import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1 className="error-title">"403 Xətası"</h1>
      <p className="error-message">Üzr istəyirik, bu səhifə tapılmadı</p>
      <a href='/'><button className="home-button">Ana səhifəyə qayıt</button></a>

      <style jsx>{`
        .not-found-page {
          text-align: center;
          margin-top: 50px;
          display: flex;
          flex-direction: column;
          gap: 1px;
          align-items:center;
        }
        .error-title {
          font-size: 80px;
          margin-bottom:0;
          padding-bottom:0;
        color: #0155F7;
        }
        .error-message {
          margin-top: 0;
          padding: 0;
          font-weight:500;
        }
        .home-button {
          margin-top: 20px; 
          width:180px;
          padding:10px;
          border-radius:10px;
          border:none;
          color:white;
          font-weight:800;   transition:0.5s;
            background: rgb(143,0,255);
               background: linear-gradient(137deg, rgba(143,0,255,1) 30%, rgba(189,0,255,1) 100%);
        }
          .home-button:hover{
             background-color: white ;
             background: linear-gradient(137deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 100%);
             border:1px solid #9977F4;
             color:#9977F4;
             transition:0.5s;
          }
      `}</style>
    </div>
  );
};

export default NotFoundPage;