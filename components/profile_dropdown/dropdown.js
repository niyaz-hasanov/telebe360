import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie';
import { MAINURL } from '../../utils/constants';
import css from './css.module.css';
import Logout from '../logout_modal_mobile/modal';

export default function BasicMenu({ profileImgPath, isStudentVerified }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Determine the border color based on verification status
  const borderColor = isStudentVerified ? '#8F00FF' : 'red';

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
        window.location.href = "/login"; // Redirect to login page
      } else {
        console.error('Sign-out failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during sign-out:', error);
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
            <p className={css.dropdownp}>Tənzimləmələr</p>
            <img className={css.chevron} src='/chevroncol.svg' />
          </MenuItem>
        </a>
        <a href='/technical_support' className={css.a}>
          <MenuItem className={css.dropdown_li} onClick={handleClose}>
            <img src='/dropdown_support.svg' className={css.dropdownbtn} />
            <p className={css.dropdownp}>Dəstək</p>
            <img className={css.chevron} src='/chevroncol.svg' />
          </MenuItem>
        </a>

        <MenuItem id={css.logout_li} className={css.dropdown_li}>
          <Logout />
        </MenuItem>
      </Menu>
    </div>
  );
}
