import { ChangeEvent } from "react";
import styles from "./arrived.module.css";


type Props = { 
  formik: any;
};  

const Arrived = ({formik}: Props) => {

  const handleChange = (event : ChangeEvent<HTMLInputElement> ) => {
    switch (event.target.name) {
      case 'ope_arrival_date':
        formik.setFieldValue('ope_arrival_date', event.target.value)  
        break;
      case 'ope_arrival_place':
        formik.setFieldValue('ope_arrival_place', event.target.value)
        break;
      case 'ope_km_driven':
        formik.setFieldValue('ope_km_driven', event.target.value)
        break;
    }
  } 


  return (
    <>
      <section className={styles.content}>
        <h4>Llegada</h4>
        <hr />
        <div className={styles.form}>
          <div className={styles.form_content}>
            <div className={`${styles.form_list} ${styles.input}`}>
              <label htmlFor="">Fecha de llegada</label>
              <input 
                placeholder="dd/mm/aaaa" 
                type="date" 
                name="ope_arrival_date"
                value={formik.values.ope_arrival_date || ''}
                onChange={(event)=>handleChange(event)}
               />
            </div>

            <div className={styles.form_list}>
              <label htmlFor="exit">Kilómetros de llegada</label>
              <input 
                placeholder="00" 
                type="number"
                name="ope_km_driven"
                value={formik.values.ope_km_driven || ''}
                onChange={(event)=>handleChange(event)}
              />
            </div>
            <div className={styles.form_list}>
              <label htmlFor="arrived">Lugar de llegada</label>
              <input 
                placeholder="Escribe el lugar de salida" 
                type="text" 
                name="ope_arrival_place"
                value={formik.values.ope_arrival_place || ''}
                onChange={(event)=>handleChange(event)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Arrived;
