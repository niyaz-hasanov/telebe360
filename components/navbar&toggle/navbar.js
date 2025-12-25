import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import axios from 'axios';

import css from './navbar.module.css';

import Logout from '../logout_modal/modal';
import Profile from '../profile_dropdown/dropdown';
import { MAINURL, APIURL } from '../../utils/constants';

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  display: 'flex',
  borderRight: 'none',
  
  boxShadow: 'none',
  paddingLeft: '0.6vw',
  justifyContent: 'space-around',
  borderTopRightRadius: '20px',
  borderBottomRightRadius: '20px',
      scrollbarWidth:'none',
  msOverflowStyle: 'none',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
    scrollbarWidth:'none',
  msOverflowStyle: 'none',
  display: 'flex',

  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  [theme.breakpoints.down('sm')]: {
    transform: 'translate(0px)',
  },
  borderRight: 'none',
  boxShadow: 'none',
  paddingLeft: '0.6vw',
  justifyContent: 'space-around',
  borderTopRightRadius: '20px',
  borderBottomRightRadius: '20px',
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: 'transparent',
  position: 'relative',
  border: 'none',
  boxShadow: 'none',

  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
   
  },
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    position:'sticky',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

const ChevronDiv = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  position: 'fixed',
  top: 0,
  left: open ? `${drawerWidth}px` : `calc(${theme.spacing(7)} + 1px)`,
  background: 'white',

  zIndex: '999',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  transition: theme.transitions.create(['left'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  ...(open && {
    left: drawerWidth,
  }),
  ...(!open && {
    left: `calc(${theme.spacing(7)} + 6px)`,
  }),
}));

export default function MiniDrawer() {
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [profileImgPath, setProfileImgPath] = useState('');
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [isStudentVerified, setIsStudentVerified] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [coinCount, setCoinCount] = useState(0);

  // ⬇ Kategoriler için state
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Profil & auth
  useEffect(() => {
    const token = Cookies.get('access_token');
    setAuthenticated(!!token);

    if (!token) {
      setIsLoadingProfile(false);
      return;
    }

    const controller = new AbortController();

    const fetchProfile = async () => {
      try {
        setIsLoadingProfile(true);
        const response = await fetch(`${APIURL}students/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        if (!response.ok) console.log('Bad response');

        const data = await response.json();
        setIsStudentVerified(!!data.is_student_verified);
        setProfileImgPath(data.profile_img_path || '');
        setCoinCount(data.coins || '0');
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setIsStudentVerified(null);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();

    return () => controller.abort();
  }, []);

  // ⬇ Kategoriler için useEffect
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${APIURL}categories/`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
    setBackdropOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setBackdropOpen(false);
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  return (
    <Box sx={{ marginBottom: '50px' }}>
      <CssBaseline />
      <AppBar open={open} className={css.appbar}>
        <Toolbar className={css.navbar}>
          <span className={css.nav_div_left}></span>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <Image src="/Burger.svg" className={css.hamburger} width="0" height="0" alt="menu" />
          </IconButton>

          {/* <span className={css.nav_div_left2}>
            <Link href="/">
              <img className={css.sidebar_360img} src="/wide360logo.svg" alt="Tələbə360" />
            </Link>
          </span> */}
     
          <span>
            {authenticated && !isLoadingProfile && isStudentVerified === false ? (
              <span className={css.sidebar_middle_text}>
                <p style={{ color: 'red' }}>
                  <img src="/mod_alert.svg" alt="alert" />
                  Hesabınız moderatorlar tərəfindən təsdiq edilməmişdir
                </p>
              </span>
            ) : null}
          </span>

          <div className={css.nav_div_right}>
            {authenticated ? (
              <span className={css.noti_and_ticket}>
                <a href="/telebecoin_info">
                 <p>{coinCount}</p>
                  <img src="/navbar_telebecoin.svg" className={css.ticket_logo} alt="coins" />
                </a>
               
              </span>
            ) : (
              <h1></h1>
            )}

            {authenticated ? (
              <span className={css.noti_and_ticket}>
                <a href="/my_tickets">
                  <img src="/navbar_ticket.svg" className={css.ticket_logo} alt="tickets" />
                </a>
            
              </span>
            ) : (
              <h1></h1>
            )}

            <span>
              {authenticated ? (
                <span className={css.profile}>
                  <Profile
                    isStudentVerified={isStudentVerified}
                    profileImgPath={profileImgPath}
                  />
               
                </span>
              ) : (
                <button onClick={handleLoginClick} className={css.loginButton}>
                  Daxil Ol
                </button>
              )}
            </span>
          </div>
        </Toolbar>
      </AppBar>

      {/* Backdrop (mobilde drawer arkasında karartma) */}
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1,
          display: { xs: 'block', sm: 'none' },
        }}
        open={backdropOpen}
        onClick={handleDrawerClose}
      />

      <Box>
        <Drawer
          variant="permanent"
          open={open}
          className={`${css.sidebar} ${open ? css.openDrawer : css.closedDrawer}`}
        >
          <div className={css.t360icon}>
            <Link href="/">
              <img className={css.sidebar_360img} src="/wide360logo.svg" alt="Tələbə360" />
            </Link>
          </div>

          {/* ⬇ Categories Component yerine inline kategori listesi */}
          <div className={css.category}>
            {categoriesLoading ? (
              <CircularProgress size={24} />
            ) : (
              <div className={css.sidebar_list}>
                {/* Tələbə360+ */}
                <div>
                  <Link href="/coming_soon" passHref>
                    <div className={css.sidebar_item}>
                      <div className={css.sidebar_item_image_div}>
                        <img
                          src="/home/crown.svg"
                          alt="360+"
                          className={css.sidebar_item_icon}
                          id={css.crownimg}
                        />
                      </div>
                      <p
                        className={`${css.sidebar_item_text} ${css.telebe360text}`}
                      >
                        Tələbə360+
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Ana səhifə */}
                <div>
                  <Link href="/" passHref>
                    <div className={css.sidebar_item}>
                      <div className={css.sidebar_item_image_div}>
                        <img
                          src="/home/offers.svg"
                          alt="Ana səhifə"
                          className={css.sidebar_item_icon}
                          id={css.alloffersimg}
                        />
                      </div>
                      <p className={css.sidebar_item_text}>Ana səhifə</p>
                    </div>
                  </Link>
                </div>

                {/* API'den gelen kategoriler */}
                {categories.map((category) => (
                  <div key={category.id}>
                    <Link href={`/categories/${category.slug}`} passHref>
                      <div className={css.sidebar_item}>
                        <img
                          src={`${MAINURL}uploads/${category.icon_path}`}
                          alt={category.name}
                          className={css.sidebar_item_icon}
                        />
                        <p className={css.sidebar_item_text}>{category.name}</p>
                      </div>
                    </Link>
                  </div>
                ))}
                   <div className={css.sidebar_bottom_div}>
            {authenticated ? (
              <Link href="/settings">
                <img
                  src="/settings.svg"
                  draggable="false"
                  className={css.bottom_div_img}
                  alt="Ayarlar"
                />
              </Link>
            ) : (
              <h1 className={css.fake}></h1>
            )}

            <Link href="/technical_support">
              <img
                src="/contact.svg"
                draggable="false"
                className={css.bottom_div_img}
                alt="Dəstək"
              />
            </Link>

            {/* {authenticated ? (
              <span className={css.logout}>
                <Logout />
              </span>
            ) : (
              <h1 className={css.fake}></h1>
            )} */}
          </div>
              </div>
              
            )}
          </div>

       
        </Drawer>

        <ChevronDiv open={open} className={`${css.chevron_div} ${!open ? css.closed : ''}`}>
          {open ? (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon className={css.chevron_icon} />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerOpen}>
              <ChevronRightIcon className={css.chevron_icon} />
            </IconButton>
          )}
        </ChevronDiv>
      </Box>
    </Box>
  );
}
