import React, { useState, useEffect } from 'react';
import MobileSlider from '../mobile_weekly_bests_carousel/carousel';
import DesktopSlider from '../desk_weekly_bests/carousel';

const MainSlider = () => {
    const [tickets, setTickets] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const fetchTickets = async () => {
            const response = await fetch('https://telebe360.elxanhuseynli.com/api/tickets');
            const data = await response.json();
            setTickets(data);
        };

        fetchTickets();

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            {isMobile ? <MobileSlider tickets={tickets} /> : <DesktopSlider tickets={tickets} />}
        </div>
    );
};

export default MainSlider;