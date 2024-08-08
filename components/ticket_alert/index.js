import React from 'react';
import Swal from 'sweetalert2';
import styles from './css.module.css'; // CSS dosyasını import ediyoruz

const Index = () => {
  const handleClick = () => {
    Swal.fire({
      title: 'Kuponu əldə etmək istəyirsiniz?',
      text: "Kuponu aldığınız təqdirdə qalan kupon alma haqqınız azalacaqdır",
      showCancelButton: true,
      confirmButtonText: 'Bəli',
      cancelButtonText: 'Ləğv et',
      customClass: {
        popup: styles.myPopup,
        title: styles.myTitle,
        content: styles.myContent,
        confirmButton: styles.myConfirmButton,
        cancelButton: styles.myCancelButton,
      },
     
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Təbriklər!', ' Bu kuponu əldə etdiniz.', 'success');
      } else {
        Swal.fire('Ləğv edildi', 'Kupon alma əməliyyatı ləğv edildi', 'error');
      }
    });
  };

  return (
    <button onClick={handleClick} className={styles.submit_button}>
      Show Alert
    </button>
  );
};

export default Index;
