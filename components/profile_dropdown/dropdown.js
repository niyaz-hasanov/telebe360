import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import css from './css.module.css'

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={css.drop}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={css.ppbutton1} 
      >
      <img className={css.ppbutton} src='/pp.svg'/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }} className={css.bulanik}
      >
      <a href='/settings/my360id' className={css.a}>  <MenuItem className={css.dropdown_li} onClick={handleClose}><img src='/dropdown_id.svg' className={css.dropdownbtn}/> <p className={css.dropdownp}>My360ID</p><img className={css.chevron} src='/chevroncol.svg'/></MenuItem></a>
       <a href='/coming_soon' className={css.a}> <MenuItem  className={css.dropdown_li}  onClick={handleClose}><img src='/dropdown_360.svg' className={css.dropdownbtn}/><p className={css.dropdownp}>360+</p><img className={css.chevron} src='/chevroncol.svg'/></MenuItem></a>
        <a href='/settings' className={css.a}><MenuItem  className={css.dropdown_li}  onClick={handleClose}><img src='/dropdown_settings.svg' className={css.dropdownbtn}/><p className={css.dropdownp}>Settings</p><img className={css.chevron} src='/chevroncol.svg'/></MenuItem></a>
       <a href='/technical_support' className={css.a}> <MenuItem  className={css.dropdown_li}  onClick={handleClose}><img src='/dropdown_support.svg' className={css.dropdownbtn}/><p className={css.dropdownp}>Support</p><img className={css.chevron} src='/chevroncol.svg'/></MenuItem></a>
      <MenuItem id={css.logout_li}  className={css.dropdown_li}  onClick={handleClose}><img src='/dropdown_signout.svg' id={css.logoutbtn} className={css.dropdownbtn}/><p id={css.logoutp} className={css.dropdownp}>Sign Out</p><img id={css.logoutchevron} className={css.chevron} src='/chevroncol.svg'/></MenuItem>
        
      </Menu>
    </div>
  );
}
    