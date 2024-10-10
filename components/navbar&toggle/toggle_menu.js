import { useState } from 'react';
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { chevron } from '../../public/chevron.svg'
import burger from '../../public/Burger.svg';
import LogoutModal from '../logout_modal/modal'

import { chevroncol } from '../../public/chevroncol.svg'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FaBars, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

import css from './navbar.module.css'
const ToggleMenu = () => {
   const [isFirstListOpen, setIsFirstListOpen] = useState(true);
   const [isSecondListOpen, setIsSecondListOpen] = useState(false);
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };
   const toggleLists = () => {
      setIsFirstListOpen(!isFirstListOpen);
      setIsSecondListOpen(!isSecondListOpen);
   };
   const toggleBoth = () => {
      toggleMenu();
      toggleLists();
   };

   return (
      <div className={css.togglediv}>
         

      </div>
   );
};

export default ToggleMenu;
