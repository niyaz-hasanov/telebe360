import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import css from './navbar.module.css';
import Categories from '../../utils/categories';
import Backdrop from '@mui/material/Backdrop';
import Logout from '../logout_modal/modal';
import Link from 'next/link';
import Image from 'next/image';
import Feedback from '../feedback_modal/modal';
import Profile from '../profile_dropdown/dropdown';
import Notification from '../notification_modal/index';
import Cookies from 'js-cookie';
import { MAINURL, APIURL } from '../../utils/constants';

const drawerWidth = 200;

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
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  display: 'flex',
  height: '50vvh',
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
    display: open ? 'none' : 'block',
  },
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
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
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  background: 'white',
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
    left: `calc(${theme.spacing(7)} + 1px)`,
  }),
}));

export default function MiniDrawer() {
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [profileImgPath, setProfileImgPath] = useState('');
  const [backdropOpen, setBackdropOpen] = useState(false); // Backdrop kontrolü
  const [isStudentVerified, setIsStudentVerified] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    const token = Cookies.get('access_token');
    setAuthenticated(!!token);

    // token yoksa profil yüklenmesini bitmiş say
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
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // hata olduğunda yanlış uyarı vermemek için bilinmiyor durumunda bırak
        setIsStudentVerified(null);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();

    return () => controller.abort();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
    setBackdropOpen(true); // Drawer açıldığında backdrop görünür
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setBackdropOpen(false); // Drawer kapandığında backdrop kapanır
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  return (
    <Box sx={{ marginBottom: '50px' }}>
      <CssBaseline />
      <AppBar open={open} className={css.appbar}>
        <Toolbar className={css.navbar}>
          <span className={css.nav_div_left}>
            <Link href='/'><img className={css.sidebar_360img} src='/wide360logo.svg' /></Link>
          </span>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <Image src='/Burger.svg' className={css.hamburger} width='0' height='0' />
          </IconButton>

          <span className={css.nav_div_left2}>
            <Link href='/'><img className={css.sidebar_360img} src='/wide360logo.svg' /></Link>
          </span>

          <span>
            {authenticated && !isLoadingProfile && isStudentVerified === false ? (
              <span className={css.sidebar_middle_text}>
                <p style={{ color: 'red' }}>
                  <img src='/mod_alert.svg' />
                  Hesabınız moderatorlar tərəfindən təsdiq edilməmişdir
                </p>
              </span>
            ) : null}
          </span>

          <div className={css.nav_div_right}>
            <span className={css.feedback}><Feedback /></span>

            {authenticated ? (
              <span className={css.noti_and_ticket}>
                <a href='/my_tickets'><img src='/tiicket.svg' className={css.ticket_logo} /></a>
              </span>
            ) : (<h1></h1>)}

            <span>
              {authenticated ? (
                <Profile isStudentVerified={isStudentVerified} profileImgPath={profileImgPath} />
              ) : (
                <button onClick={handleLoginClick} className={css.loginButton}>
                  Daxil Ol
                </button>
              )}
            </span>
          </div>
        </Toolbar>
      </AppBar>

      {/* Backdrop */}
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1, // AppBar'ın altında Backdrop olacak
          display: { xs: 'block', sm: 'none' }, // Mobilde gösterilecek, bilgisayarda gizli olacak
        }}
        open={backdropOpen}
        onClick={handleDrawerClose} // Backdrop'a tıklanınca Drawer kapanacak
      />

      <Box>
        <Drawer variant="permanent" open={open} className={css.sidebar}>
          <div><Categories className={css.category} /></div>
          <div className={css.sidebar_bottom_div}>
            {authenticated ? (
              <Link href='/settings'><img src='/settings.svg' className={css.bottom_div_img} /></Link>
            ) : (
              <h1 className={css.fake}></h1>
            )}
            <Link href='/technical_support'><img src='/contact.svg' className={css.bottom_div_img} /></Link>
            {authenticated ? (
              <span><Logout /></span>
            ) : (
              <h1 className={css.fake}></h1>
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

