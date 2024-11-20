import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { APIURL ,MAINURL } from '../../utils/constants'
import css from './kfc.module.css';
import Image from 'next/image'
import Head from 'next/head';
import Link from 'next/link';
import Alert from '../../components/ticket_alert/index'
import Cookies from 'js-cookie';
import Carousel from '../../components/desk_company_carousel/carousel'
import MobileCarousel from '../../components/mobile_company_carousel/carousel'

const TicketPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState('');
  const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {
    const token = Cookies.get('access_token');
    setAuthenticated(!!token);
    if (id) {
      const fetchTicket = async () => {
        try {
          const response = await axios.get(`${APIURL}tickets/${id}`);
          setTicket(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching ticket:', error);
          setLoading(false);
        }
      };

      fetchTicket();
    }
  }, [id]);

  // Kalan süreyi hesaplayan fonksiyon
  useEffect(() => {
    if (ticket) {
      const calculateRemainingTime = () => {
        const now = new Date();
        const endTime = new Date(ticket.end_time);
        const timeDifference = endTime - now;

        if (timeDifference <= 0) {
          setRemainingTime('Bitib');
          return;
        }

        const oneDayInMs = 24 * 60 * 60 * 1000; // 24 saat
        if (timeDifference > oneDayInMs) {
          const daysRemaining = Math.floor(timeDifference / oneDayInMs);
          setRemainingTime(`${daysRemaining} gün`);
        } else {
          const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
          const seconds = Math.floor((timeDifference / 1000) % 60);
          setRemainingTime(`${hours} : ${minutes} : ${seconds}`);
        }
      };

      const interval = setInterval(calculateRemainingTime, 1000);
      return () => clearInterval(interval); // Bileşen unmounted olduğunda interval'i temizle
    }
  }, [ticket]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ticket) {
    return <div>Ticket not found</div>;
  }
 

  return (
    <div className={css.ticketContainer}>
           <style jsx global>{`
            body {
             
                background-color: #F2F3F2;
              
            }
      `}</style>
      <Head>
      <title>{ticket.company.name}-{ticket.name} </title>
        <link rel="icon" href="/home/360minilogo.svg" />
      </Head>
      
     
      <div className={css.container}>
        <div className={css.kfcbanner}>
          <div className={css.overlay}>
            <div className={css.div}>
              <div className={css.top}>
              <div className={css.top_left}>  
               <Link href={`/categories/${ticket.category.slug}`}> <img className={css.icon} src='/leftarrow.svg' alt="Back" /></Link>
                <p className={css.paragraph}>{ticket.company.name} - {ticket.name} • {ticket.company.address}</p>
                </div>
                <div className={css.topleft}>
                  <img className={css.icon} src='/whitebookmark.svg' alt="Bookmark" />
                  <img className={css.icon} id={css.itkin} src='/share.svg' alt="Share" />
                </div>
              </div>
              <div className={css.bottom}>
                <div className={css.bottom_left}>
                  <img className={css.kfcpp} src={`${MAINURL}uploads/${ticket.company.logo_path}`} alt={ticket.company.name} />
                  <div>
                    <span id={css.wolt}>{ticket.count} ədəd</span>
                    <span id={css.day}> 
                      {remainingTime === 'Bitib' ? (
                        <span className={css.expired}>Bitib</span>
                      ) : (
                        <span> {remainingTime}</span>
                      )}
                    </span>
                    <span id={css.percent}>{ticket.discount}%</span>
                  </div>
                </div>
                <div>
                {authenticated ? (
                 <Alert ticketId={ticket.id} />
              ) : (
                <span  className={css.loginButton}>
                  
                </span>
              )}
                </div>
              </div>
            </div>
          </div>
          <img className={css.bannerr} src='/kfcbanner.svg' alt="Banner" />
        </div>

        <div className={css.textdiv}>
          <h3>{ticket.company.name} haqqında</h3>
          <p id={css.textdivp}>{ticket.company.description}</p>
         </div>

        <div className={css.carousel_container}>
        <h3>{ticket.company.name}'dən daha çox kuponlar</h3>
        <div className={css.carousel}><Carousel ticket={ticket}/></div>
        <div className={css.mobile_carousel}><MobileCarousel ticket={ticket}/></div>
        </div>

      </div>
    </div>
  );
};;

export default TicketPage;
