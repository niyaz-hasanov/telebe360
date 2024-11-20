import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Slider from '../../components/desk_weekly_bests/carousel'; // Karusel bileşeninizin yolu
import MobileSlider from '../../components/mobile_weekly_bests_carousel/carousel';
import css from './css.module.css'; // CSS dosyanızın yolu
import { APIURL } from '../../utils/constants';
import Head from 'next/head';
import BannerUp from '../../components/desk_carousel/carousel'
import BannerUPMobile from '../../components/mobile_carousel/carousel'
import BannerDown from '../../components/desk_carousel_2/carousel'
import BannerDownMobile from '../../components/mobile_carousel_2/carousel'
const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (router.isReady && slug) {
      const fetchTickets = async () => {
        try {
          const categoriesResponse = await axios.get(`${APIURL}categories/`);
          const category = categoriesResponse.data.find(cat => cat.slug === slug);
          
          if (category) {
            setCategoryName(category.name);
            const ticketsResponse = await axios.get(`${APIURL}tickets/category/${category.id}`);
            setTickets(ticketsResponse.data);  
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching tickets:', error);
          setLoading(false);
        }
      };

      fetchTickets();
    }
  }, [router.isReady, slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
     <style jsx global>{`
            body {
             
                background-color: #F2F3F2;
              
            }
      `}</style>
      <Head>
      <title>{slug} </title>
        <link rel="icon" href="/home/360minilogo.svg" />
      </Head>
    <div className={css.container}>
      <div className={css.up_banner}>
        <div className={css.banner_desktop}><BannerUp/></div>
        <div className={css.banner_mobile}><BannerUPMobile/></div>
      </div>
      <div className={css.div}>
      <h1>{categoryName}</h1>
    <span  className={css.desktop_slider}>  <Slider tickets={tickets}/> </span>
     <span  className={css.mobile_slider}> <MobileSlider tickets={tickets}/></span>
      </div>
      <div className={css.down_banner}>
         <div className={css.banner_desktop}>
         <BannerDown/>
         </div>
         <div className={css.banner_mobile}>
          <BannerDownMobile/>
         </div>
      </div>
    </div>
  </>);
};

export default CategoryPage;
