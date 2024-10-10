import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { APIURL , MAINURL } from './constants'
import css from './categories.module.css'



const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${APIURL}categories`);
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={css.sidebar_list}>
          <div >
             <Link href='/telebe360+' passHref>
              <div className={css.sidebar_item}>
                <div className={css.sidebar_item_image_div}>
                  <img src='/home/crown.svg' alt='360logo' className={css.sidebar_item_icon}/>
                </div>
                <p className={ `${css.sidebar_item_text} ${css.telebe360text}`} > Tələbə360+ </p>
              </div>
               </Link>
            </div>
            <div >
             <Link href='/' passHref>
              <div className={css.sidebar_item}>
                <div className={css.sidebar_item_image_div}>
                  <img src='/home/offers.svg' alt='allofferslogo' className={css.sidebar_item_icon}/>
                </div>
                <p className={ `${css.sidebar_item_text}`} > All Offers </p>
              </div>
               </Link>
            </div>
          {categories.map((category) => (
            <div key={category.id}  >
             <Link href={`/categories/${category.slug}`} passHref>
              <div className={css.sidebar_item}>
             
                  <img src={`${MAINURL}uploads/${category.icon_path}`} alt={category.name} className={css.sidebar_item_icon}/>
                
                <p className={css.sidebar_item_text}> {category.name} </p>
              </div>
               </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;