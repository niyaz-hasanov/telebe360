import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './css.module.css';
import { APIURL } from '../../utils/constants';

const Index = ({ ticketId }) => {
  const handleClick = () => {
    Swal.fire({
      title: 'Bileti əldə etmək istəyirsiniz?',
      text: "Uyğun məbləğdə coin balansınızdan silinəcək!",
      showCancelButton: true,
      confirmButtonText: 'Bəli',
      cancelButtonText: 'Ləğv et',
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        const cancelButton = Swal.getCancelButton();

        confirmButton.style.backgroundColor = '#8F00FF';
        confirmButton.style.color = '#ffffff';
        confirmButton.style.border = 'none';
        
        cancelButton.style.backgroundColor = 'white';
        cancelButton.style.color = 'grey';
        cancelButton.style.border = 'none';
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const token = Cookies.get('access_token');

        axios.post(`${APIURL}tickets/createTicket/${ticketId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(response => {
            Swal.fire('Təbriklər!', 'Bilet uğurla əldə olundu. İstifadə etmək üçün biletlərim səhifəsinə baxın.', 'success');
          })
          .catch(error => {
            if (error.response) {
              if (error.response.status === 403) {
                Swal.fire('Xəta!', 'Hesabınız moderatorlar tərəfindən təsdiq olunmayıb. Hesabınız təsdiq olunmadan bilet əldə edə bilməzsiniz.', 'error');
              } else if (error.response.status === 404) {
                Swal.fire('Xəta!', 'Bilet tapılmadı. Zəhmət olmasa bir daha cəhd edin.', 'error');
              } else if (error.response.status === 400) {
               
                const detail = error.response.data.detail;
                if (detail === "Ticket with this student already exists") {
                  Swal.fire('Xəta!', 'Bu bileti artıq əldə etmisiniz. Biletlərim səhifəsində əldə etdiyiniz biletləri görə bilərsiniz.', 'error');
                } else if (detail === "Ticket already used") {
                  Swal.fire('Xəta!', 'Bu biletdən artıq istifadə etmisiniz. Hər biletdənn yalnız 1 dəfə istifadə etmək haqqınız var.', 'error');
                } else {
                  Swal.fire('Xəta!', 'Bu bileti əldə etmək mümkün olmadı. Zəhmət olmasa bir daha cəhd edin.', 'error');
                }
              } else if (error.response.status === 401) {
                Swal.fire('Xəta!', 'Bu bileti əldə etmək səlahiyyətinə sahib deyilsiniz.', 'error');
              } else {
                Swal.fire('Xəta!', 'Biletin alınması zamanı problem. Zəhmət olmasa bir daha cəhd edin.', 'error');
              }
            } else {
              Swal.fire('Xəta!', 'Biletin alınması zamanı problem. Zəhmət olmasa bir daha cəhd edin.', 'error');
            }
          });
      } else {
        Swal.close();
      }
    });
  };

  return (
    <button onClick={handleClick} className={styles.submit_button}>
      Əldə et
    </button>
  );
};

export default Index;
