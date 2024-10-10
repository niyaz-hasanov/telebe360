import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie'; // Import js-cookie
import { MAINURL } from '../../utils/constants';
import css from './css.module.css';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileImgPath, setProfileImgPath] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const open = Boolean(anchorEl);

  // Fetch user data to get the verification status and profile image
  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = Cookies.get('access_token'); // Get access token from cookies

      const response = await fetch(`${MAINURL}api/v1/students/me`, {
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
      } else {
        // Handle error response
        console.error('Failed to fetch user data', response.status);
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
            src={`${MAINURL}uploads/${profileImgPath}`} 
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
        <MenuItem id={css.logout_li} className={css.dropdown_li} onClick={handleClose}>
          <img src='/dropdown_signout.svg' id={css.logoutbtn} className={css.dropdownbtn} />
          <p id={css.logoutp} className={css.dropdownp}>Sign Out</p>
          <img id={css.logoutchevron} className={css.chevron} src='/chevroncol.svg' />
        </MenuItem>
      </Menu>
    </div>
  );
}
