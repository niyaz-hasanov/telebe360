import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import css from './css.module.css';
import Head from 'next/head';
import BasicModal from '../../components/ticket_qr/index'; // Import BasicModal
import {MAINURL} from '../../utils/constants'
const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null); // To store selected ticket for QR

  useEffect(() => {
    const fetchTickets = async () => {
      const token = Cookies.get('access_token');
      try {
        const response = await fetch(`${MAINURL}api/v1/tickets/student/ticket`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        } else {
          console.error('Failed to fetch tickets');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className={css.ticket_div}>
      <style jsx global>{`
        body {
          background-color: #6363631a;
        }
      `}</style>
      <Head>
        <title>Biletlər</title>
        <link rel="icon" href="/home/360minilogo.svg" />
      </Head>
      <h1>Kuponlarım</h1>
      <ul className={css.ticket_ul}>
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <li key={ticket.id} className={css.ticket_li}>
              <div className={css.ticket_li_left}>
                <img src={`${MAINURL}uploads/${ticket.registrator.company.logo_path}`} alt={ticket.registrator.company.name} />
                <p>{`${ticket.registrator.company.name} - ${ticket.registrator.name} • ${ticket.registrator.company.address}`}</p>
              </div>
              <div className={css.ticket_li_right}>
                <span
                  className={css.ticket_li_right_button_1}
                  id={css.qr}
                  onClick={() => setSelectedTicket({
                    qrCode: ticket.qr_code,
                    companyName: ticket.registrator.company.name,
                    discount: ticket.registrator.discount,
                  })} 
                >
                 Bilet
                </span>
                <span className={css.ticket_li_right_button_1}>{ticket.used ? 'Bitdi' : 'Aktiv'}</span>
                <span className={css.ticket_li_right_button_2}>{`${ticket.registrator.discount}%`}</span>
               
              </div>
            </li>
          ))
        ) : (
          <li>Kupon yoxdur</li>
        )}
      </ul>

      {/* Render the modal with selected QR code and additional info */}
      {selectedTicket && (
        <BasicModal 
          qrCode={selectedTicket.qrCode} 
          companyName={selectedTicket.companyName}

          discount={selectedTicket.discount}
          onClose={() => setSelectedTicket(null)} 
        />
      )}
    </div>
  );
};

export default TicketPage;
