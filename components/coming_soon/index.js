
import css from './css.module.css'
const index = () => {
    return (
        <div className={css.coming_soon_div}>
            <div className={css.coming_soon_text_div}>   
                 <h1 className={css.coming_soon_h1}>Çox Yaxında</h1>
                <p className={css.coming_soon_p}>Tələbə360+ Abunəliyinə qoşularaq siz Tələbə360 xüsusi endirimlərindən faydalana biləcəksiniz</p>
            </div>

            <div className={css.coming_soon_form_div}>
                <form className={css.coming_soon_form}>
                    <input placeholder='Emailiniz' type='email' className={css.coming_soon_input}></input>
                    <button type='submit' value='' className={css.coming_soon_button}>Təsdiqlə</button>
                </form>
                <a href='/' ><button className={css.coming_soon_button}>Ana səhifəyə qayıt</button></a>
            </div>
        </div>
    )
}

export default index