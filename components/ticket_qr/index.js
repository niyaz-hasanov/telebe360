"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import modalcss from "./modal.module.css";
import { APIURL, MAINURL } from "@/utils/constants";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const outerBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  outline: "none",
  transform: "translate(-50%, -50%)",
  width: "min(420px, 92vw)",
  border: "transparent",
  bgcolor: "transparent",
  boxShadow: "none",
};

export default function BasicModal({
  qrCode,
  companyName,
  discount,
  onClose,
  createdAt,
  companyLogoPath,
  endTime,
}) {
  const open = Boolean(qrCode);
  const [student, setStudent] = useState({});

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const accessToken = Cookies.get("access_token");
        if (!accessToken) return;

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const studentResponse = await axios.get(`${APIURL}students/me`, config);
        setStudent(studentResponse.data);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudentData();
  }, []);

  const fullName = useMemo(() => {
    return `${student.fname || ""} ${student.lname || ""}`.trim() || "-";
  }, [student]);

  const formattedDate = useMemo(() => {
    if (!createdAt) return "-";
    const d = new Date(createdAt);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }, [createdAt]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="ticket-modal-title"
      aria-describedby="ticket-modal-description"
      className={modalcss.bulanik}
    >
      <Box sx={outerBoxStyle}>
        {/* ✅ TEK DIV: background ticket design */}
        <div className={modalcss.ticketBg}>
          {/* Company */}
          <div className={modalcss.companyArea}>
            <div className={modalcss.companyLogoWrap}>
              <img
                src={`${MAINURL}uploads/${companyLogoPath}`}
                alt={companyName}
                className={modalcss.companyLogoImg}
              />
            </div>
            <div className={modalcss.companyName}>{companyName}</div>
          </div>

          {/* User block */}
          <div className={modalcss.userCard}>
            <div className={modalcss.labelGrey}>Ad soyad :</div>
            <div className={modalcss.nameRow}>
              <div className={modalcss.avatarWrap}>
                <img
                  src={
                    student.profile_img_path
                      ? `${MAINURL}uploads/${student.profile_img_path}`
                      : "/profile.jpg"
                  }
                  alt="Profile"
                  className={modalcss.avatarImg}
                />
              </div>
              <div className={modalcss.fullName}>{fullName}</div>
            </div>

            <div className={modalcss.infoRow}>
              <div className={modalcss.infoCol}>
                <div className={modalcss.labelGrey}>Endirim faizi:</div>
                <div className={modalcss.infoValue}>{discount}%</div>
              </div>

              <div className={modalcss.infoCol}>
                <div className={modalcss.labelGrey}>Tarix:</div>
                {/* səndə endTime var — istəyirsən formattedDate də istifadə et */}
                <div className={modalcss.infoValue}>{endTime || formattedDate}</div>
              </div>
            </div>
          </div>

          {/* QR */}
          {qrCode && (
            <div className={modalcss.qrWrapper}>
              <img
                src={`data:image/png;base64,${qrCode}`}
                alt="QR Code"
                className={modalcss.qrImage}
              />
            </div>
          )}

          {/* Bottom brand */}
          <div className={modalcss.brandBottom}>
            <img src="/wide360logo.svg" alt="Telebe360" />
          </div>
        </div>
      </Box>
    </Modal>
  );
}

BasicModal.propTypes = {
  qrCode: PropTypes.string,
  companyName: PropTypes.string.isRequired,
  companyLogoPath: PropTypes.string.isRequired,
  discount: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  endTime: PropTypes.string.isRequired,
};
