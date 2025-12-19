"use client";
import { useState } from "react";
import styles from "./faq_accordion.module.css";

export default function Faq() {
  const [open, setOpen] = useState(0);

  const data = [
    {
      q: "Tələbə Coin real puldur?",
      a: "Xeyr, Tələbə Coin birbaşa real pul deyil. Tələbə Coin tələbələr üçün yaradılmış rəqəmsal mükafat (reward) vahididir.",
    },
    {
      q: "Tələbə Coin necə qazanılır?",
      a: "Kursları tamamlamaqla, platforma fəaliyyətlərində aktiv olmaqla və dostlarınızı dəvət etməklə coin qazana bilərsiniz.",
    },
    {
      q: "Coin-lər qurtara bilər?",
      a: "Xeyr. Coin balansınız istifadənizə görə dəyişir, amma sistemdə coin qazanmaq üçün imkanlar davamlı olaraq mövcuddur.",
    },
    {
      q: "Kimlər Tələbə Coin istifadə edə bilər?",
      a: "Platformada qeydiyyatdan keçmiş və aktiv istifadəçi olan bütün tələbələr Tələbə Coin-dən istifadə edə bilər.",
    },
    {
      q: "Tələbə Coin qazanmaq pulludur?",
      a: "Xeyr. Coin qazanmaq üçün əlavə ödəniş tələb olunmur.",
    },
    {
      q: "Coin-ləri başqa birinə göndərə bilərəm?",
      a: "Hazırda coin transfer funksiyası aktiv deyil. Gələcək yenilənmələrdə əlavə edilə bilər.",
    },
  ];

  return (
    <div className={styles.faqBox}>
      {data.map((item, i) => {
        const isOpen = open === i;

        return (
          <div key={i} className={styles.faqItem}>
            <button
              className={styles.faqHeader}
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              {item.q}
              <span className={`${styles.faqArrow} ${isOpen ? styles.faqArrowOpen : ""}`}>
                <img src="/footer_chevron_down.svg" alt="" />
              </span>
            </button>

            <div className={`${styles.faqContent} ${isOpen ? styles.open : ""}`}>
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
