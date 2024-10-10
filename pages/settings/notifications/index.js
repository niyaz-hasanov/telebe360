"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Switch from "../../../components/switch_button/index";
import { MAINURL } from "../../../utils/constants";
import Cookies from "js-cookie";
import css from "./css.module.css";

export default function Home() {
  // State for each notification setting
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [inAppNotifications, setInAppNotifications] = useState(false);
  const [updateNotifications, setUpdateNotifications] = useState(false);

  // Fetch user notification preferences on component mount
  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const accessToken = Cookies.get("access_token");
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // API request to fetch current notification settings
        const response = await axios.get(`${MAINURL}api/v1/students/me`, config);

        // Assuming the API returns the notification preferences in the response
        const { get_email_notifications, get_inapp_notifications, get_update_notifications } = response.data;

        // Set the state with the fetched values
        setEmailNotifications(get_email_notifications);
        setInAppNotifications(get_inapp_notifications);
        setUpdateNotifications(get_update_notifications);
      } catch (error) {
        console.error("Failed to fetch notification settings:", error);
        toast.error("Failed to load notification settings.");
      }
    };

    fetchNotificationSettings();
  }, []); // Empty dependency array means this runs only once when the component mounts

  const handleNotificationChange = async (type, value) => {
    // Update the relevant state based on the switch type
    if (type === "email") setEmailNotifications(value);
    if (type === "inApp") setInAppNotifications(value);
    if (type === "update") setUpdateNotifications(value);

    // Prepare the data to send to the API
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

      // Send PUT request
      await axios.put(`${MAINURL}api/v1/students/`, data, config);

      // Show success toast notification
      toast.success("Notification settings updated successfully!");
    } catch (error) {
      console.error(error);
      // Show error toast notification
      toast.error("Failed to update notification settings.");
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
          <link rel="icon" href="/home/360minilogo.svg" />
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
                  <p id={css.p1}>E-mail notifications</p>
                  <p id={css.p2}>
                    You will receive an e-mail about any notification regularly
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
              <li className={css.mobile_li}>
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
              </li>
              <li className={css.mobile_li}>
                <div className={css.mobile_li_left}>
                  <p id={css.p1}>Update notification</p>
                  <p id={css.p2}>
                    You will receive a notification about update application
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
