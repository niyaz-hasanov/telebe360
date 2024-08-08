import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Slider from '../../components/desk_weekly_bests/carousel'; // Karusel bileşeninizin yolu
import css from './css.module.css'; // CSS dosyanızın yolu

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (slug) {
      const fetchTickets = async () => {
        try {
          const categoriesResponse = await axios.get(`https://telebe360.elxanhuseynli.com/api/categories`);
          const category = categoriesResponse.data.find(cat => cat.slug === slug);
          
          if (category) {
            setCategoryName(category.name);
            const ticketsResponse = await axios.get(`https://telebe360.elxanhuseynli.com/api/categories/${category.id}/tickets`);
            setTickets(ticketsResponse.data.tickets);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching tickets:', error);
          setLoading(false);
        }
      };

      fetchTickets();
    }
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={css.container}>
      <h1>{categoryName}</h1>
      <Slider tickets={tickets} />
    </div>
  );
};

export default CategoryPage;
