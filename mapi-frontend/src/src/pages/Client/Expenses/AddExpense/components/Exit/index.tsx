import { ChangeEvent } from "react";
import styles from "./exit.module.css";

type Props = {
  formik: any;
};

const Exit = ({formik}:Props) => {

  const handleChange = (event : ChangeEvent<HTMLInputElement> ) => {
    switch (event.target.name) {
      case 'ope_departure_date':
        formik.setFieldValue('ope_departure_date', event.target.value)  
        break;
      case 'ope_departure_location':
        formik.setFieldValue('ope_departure_location', event.target.value)
        break;
    }
  } 

  return (
    <>
      <section className={styles.content}>
        <h4>Salida</h4>
        <hr />
        <div className={styles.form}>
          <div className={styles.form_content}>
            <div className={`${styles.form_list} ${styles.input}`}>
              <label htmlFor="">Fecha de salida</label>
              <input 
                placeholder="dd/mm/aaaa" 
                type="date" 
                name="ope_departure_date"
                value={formik.values.ope_departure_date || ''}
                onChange={(event)=>handleChange(event)}
              />
            </div>

          
            <div className={styles.form_list}>
              <label htmlFor="arrived">Lugar de salida</label>
              <input 
                placeholder="Escribe el lugar de salida" 
                type="text" 
                name="ope_departure_location"
                value={formik.values.ope_departure_location || ''}
                onChange={(event)=>handleChange(event)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Exit;
