import styles from './css.module.css';
import Head from "next/head"
import Link from 'next/link'
export default function Home() {
    return (
        
      <div className={styles.container}>
         <style jsx global>{`
              body {
             
                background-color: #63636300;
              
            }
      `}</style>
        <Head>
        <title>Texniki dəstək</title>
        <link rel="icon" href="/home/360minilogo.svg" />
      </Head>

        <div className={styles.top_div}><h1 className={styles.title}>Texniki Dəstək</h1> <Link href='/home'><img src='X.svg'/></Link></div>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Name</label>
            <div className={styles.inputGroup}>
              <input className={styles.input} id={styles.ad_soyad} type="text" placeholder="Adınız" />
              <input className={styles.input}  id={styles.ad_soyad} type="text" placeholder="Soyadınız" />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} >Email</label>
            <div className={styles.inputGroup}>
              <input className={styles.input} id={styles.email} type="email" placeholder="Email adresiniz" />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nömrə</label>
            <div className={styles.inputGroup}>
              <select className={styles.select} id={styles.prefix}>
                <option value="055">055</option>
                <option value="070">070</option>
                <option value="050">050</option>
                <option value="099">099</option>
              </select>
              <input className={styles.input} id={styles.number} type="text" placeholder="123-45-67" />
            </div>
          </div>
          <div className={styles.formGroup}  id={styles.last_group}>
            <label className={styles.label} id={styles.textlabel}>Sual və ya Şikayətiniz</label>
            <div className={styles.inputGroup}>
              <textarea className={styles.textarea} placeholder="Buraya yazınız..."></textarea>
            </div>
          </div>
          <button className={styles.button} id={styles.button}type="submit">Göndər</button>
        </form>
      </div>
    );
  }