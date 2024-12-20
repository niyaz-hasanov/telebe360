import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie'; // Import js-cookie
import jwtDecode from 'jsonwebtoken/decode'; // Import jsonwebtoken's decode method
import { MAINURL, APIURL } from '../../utils/constants';
import css from './css.module.css';
import Logout from '../logout_modal_mobile/modal'
export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileImgPath, setProfileImgPath] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const open = Boolean(anchorEl);

  // Fetch user data to get the verification status and profile image
  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = Cookies.get('access_token'); // Get access token from cookies

      if (accessToken) {
        try {
          // Decode the token to get the is_verified value
          const decodedToken = jwtDecode(accessToken);
          const tokenIsVerified = decodedToken.is_verified || false;

          // Fetch user data from API
          const response = await fetch(`${APIURL}students/me`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`, // Include Bearer token in the header
              'Content-Type': 'application/json', // Specify content type
            },
          });

          if (response.ok) {
            const data = await response.json();
            setIsVerified(data.is_student_verified);
            setProfileImgPath(data.profile_img_path); // Assume this returns the relative path of the image

            // Check if the token is_verified is false and API is_verified is true, then sign out
            if (!tokenIsVerified && data.is_student_verified) {
              signOut();
            }
          } else {
            // Handle error response from API
            console.error('Failed to fetch user data', response.status);
          }
        } catch (error) {
          console.error('Failed to decode the token or fetch user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Determine the border color based on verification status
  const borderColor = isVerified ? '#8F00FF' : 'red';

  // Sign out function
  async function signOut() {
    try {
      const response = await fetch('/api/auth/sign-out', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        Cookies.remove('access_token');
        window.location.href = "/login"; // Redirect to home page
      } else {
        console.error('Çıkış işlemi başarısız oldu:', response.statusText);
      }
    } catch (error) {
      console.error('Çıkış isteği sırasında bir hata oluştu:', error);
    }
  }

  return (
    <div className={css.drop}>
      <button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={css.ppbutton1}
      >
        <div
          style={{
            border: `3px solid ${borderColor}`,
          }}
          className={css.ppdiv}
        >
          <img
            className={css.ppbutton}
            src={profileImgPath ? `${MAINURL}uploads/${profileImgPath}` : '/profile.jpg'}
            alt="User Profile"
          />
        </div>
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className={css.bulanik}
      >
        <a href='/settings/my360id' className={css.a}>
          <MenuItem className={css.dropdown_li} onClick={handleClose}>
            <img src='/dropdown_id.svg' className={css.dropdownbtn} />
            <p className={css.dropdownp}>My360ID</p>
            <img className={css.chevron} src='/chevroncol.svg' />
          </MenuItem>
        </a>
        <a href='/coming_soon' className={css.a}>
          <MenuItem className={css.dropdown_li} onClick={handleClose}>
            <img src='/dropdown_360.svg' className={css.dropdownbtn} />
            <p className={css.dropdownp}>360+</p>
            <img className={css.chevron} src='/chevroncol.svg' />
          </MenuItem>
        </a>
        <a href='/settings' className={css.a}>
          <MenuItem className={css.dropdown_li} onClick={handleClose}>
            <img src='/dropdown_settings.svg' className={css.dropdownbtn} />
            <p className={css.dropdownp}>Settings</p>
            <img className={css.chevron} src='/chevroncol.svg' />
          </MenuItem>
        </a>
        <a href='/technical_support' className={css.a}>
          <MenuItem className={css.dropdown_li} onClick={handleClose}>
            <img src='/dropdown_support.svg' className={css.dropdownbtn} />
            <p className={css.dropdownp}>Support</p>
            <img className={css.chevron} src='/chevroncol.svg' />
          </MenuItem>
        </a>
      
        <MenuItem id={css.logout_li} className={css.dropdown_li}>
          <Logout/>
        </MenuItem>
      </Menu>
    </div>
  );
}
