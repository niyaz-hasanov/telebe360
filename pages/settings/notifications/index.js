"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Switch from "../../../components/switch_button/index";  // Switch bileşeni import edildi.
import { APIURL } from "../../../utils/constants";
import Cookies from "js-cookie";
import css from "./css.module.css";

export default function Home() {
  // Bildirim ayarları için state
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [inAppNotifications, setInAppNotifications] = useState(false);
  const [updateNotifications, setUpdateNotifications] = useState(false);

  // Component yüklendiğinde API'den bildirim ayarlarını çek
  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const accessToken = Cookies.get("access_token"); // Token cookie'den alınıyor.
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // API isteği ile bildirim ayarlarını getir
        const response = await axios.get(`${APIURL}students/me`, config);


        // API'den gelen değerleri state'e aktar
        const { get_email_notifications, get_inapp_notifications, get_update_notifications } = response.data;

        setEmailNotifications(get_email_notifications);
        setInAppNotifications(get_inapp_notifications);
        setUpdateNotifications(get_update_notifications);
      } catch (error) {
        console.error("Dəyişiklik uğurla tətbiq edildi", error);
        toast.error("Bildirim ayarları yüklenemedi.");
      }
    };

    fetchNotificationSettings();
  }, []); // Boş dependency array ile component mount olduğunda bir kez çalışır.

  // Kullanıcı switch durumunu değiştirdiğinde API'ye PUT isteği atan fonksiyon
  const handleNotificationChange = async (type, value) => {
    // Değişen switch'in türüne göre state'i güncelle
    if (type === "email") setEmailNotifications(value);
    if (type === "inApp") setInAppNotifications(value);
    if (type === "update") setUpdateNotifications(value);

    // API'ye gönderilecek veri
    const data = {
      get_email_notifications: type === "email" ? value : emailNotifications,
      get_inapp_notifications: type === "inApp" ? value : inAppNotifications,
      get_update_notifications: type === "update" ? value : updateNotifications,
    };

    try {
      const accessToken = Cookies.get("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      // PUT isteği ile API'ye veri gönder
      await axios.put(`${APIURL}students/`, data, config);

      toast.success("Dəyişiklik uğurla tətbiq edildi.");
    } catch (error) {
      toast.error("Dəyişikliklərin tətbiqi zamanı xəta!");
    }
  };

  return (
    <>
      <div className={css.body}>
        <style jsx global>{`
          body {
            margin: 0;
            background: #f5f5f4;
          }
        `}</style>

        <Head>
          <title>Tələbə360°</title>
          <link rel="icon" href="/home/360minilogo.ico" />
        </Head>

        <div className={css.main}>
          <div className={css.main_title}>
            <h3>Tənzimləmələr</h3>
            <Link href="/settings">
              <Image src={"/X.svg"} width={0} height={0} className={css.X} />
            </Link>
          </div>

          <div className={css.mobile_title}>
            <Link href="/settings">
              <Image
                src={"/chevron-left.svg"}
                width={0}
                height={0}
                className={css.chevron_left}
              />
            </Link>
            <h3>Notifications</h3>
          </div>

          <div className={css.desktop_main}>
            <ul className={css.settings_ul}>
              <Link className={css.ul} href="/settings/my360id">
                <li>My360ID</li>
              </Link>
              <Link className={css.ul} href="/settings/security">
                <li>Təhlükəsizlik</li>
              </Link>
              <Link className={css.ul} href="/settings/promo"><li>Promo Kod</li></Link>
              
              <Link className={css.ul} href="/settings/membership">
                <li>Üzvlük</li>
              </Link>
              <Link className={css.ul_360id} href="/settings/notifications">
                <li>Bildirişlər</li>
              </Link>
              <Link className={css.ul} href="/settings/references">
                <li>Referanslar</li>
              </Link>
            </ul>

            <ul className={css.mobile_ul}>
              <li className={css.mobile_li}>
                <div className={css.mobile_li_left}>
                  <p id={css.p1}>E-mail bildirişləri</p>
                  <p id={css.p2}>
                    E-mail ünvanınızdan saytda etdiyiniz əməliyyatlar və ümumi xəbərlərlə bağlı bildiriş alacaqsınız.
                  </p>
                </div>
                <div>
                  <Switch
                    checked={emailNotifications}
                    onChange={(e) =>
                      handleNotificationChange("email", e.target.checked)
                    }
                  />
                </div>
              </li>
              {/* <li className={css.mobile_li}>
                <div className={css.mobile_li_left}>
                  <p id={css.p1}>In app notifications</p>
                  <p id={css.p2}>
                    You will receive a notification inside the application
                  </p>
                </div>
                <div>
                  <Switch
                    checked={inAppNotifications}
                    onChange={(e) =>
                      handleNotificationChange("inApp", e.target.checked)
                    }
                  />
                </div>
              </li> */}
              <li className={css.mobile_li}>
                <div className={css.mobile_li_left}>
                  <p id={css.p1}>Yeniləmə bildirişi</p>
                  <p id={css.p2}>
                   Applikasiyadakı yeniliklər barədə bildiriş alacaqsınız.
                  </p>
                </div>
                <div>
                  <Switch
                    checked={updateNotifications}
                    onChange={(e) =>
                      handleNotificationChange("update", e.target.checked)
                    }
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
