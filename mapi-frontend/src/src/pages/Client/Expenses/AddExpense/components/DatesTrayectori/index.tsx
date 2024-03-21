import { useAxios } from "src/hooks";
import styles from "./datestrayectori.module.css";
import { UserTeamsService } from "src/services";
import { ChangeEvent, useEffect, useState } from "react";
import { formatCurrency } from "src/utilities";


type Props = {
  formik: any
}

const DatesTrayectori = ({formik} : Props) => {

  const { callEndpoint } = useAxios();
  const [ carPlates, setCarPlates ] = useState([]);
  const [ drivers, setDrivers ] = useState<any>([]);
  const [ price, setPrice ] = useState('');


  const getAllPlates = async () => {
    const res:any = await callEndpoint(UserTeamsService.getUserTeamsPlates());
    if(res && res.status === 200) {
      const { data } = res.data
      setCarPlates(data);
    }
  }
  
  const getAllDrivers = async () => {
    const res:any = await callEndpoint(UserTeamsService.getUserTeamsDrivers());
    if(res && res!.status === 200) {
      const { data } = res.data
      setDrivers(data);
    }
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.target.name == 'ope_id_driver'
    ? formik.setFieldValue('ope_id_driver', event.target.value)
    : formik.setFieldValue('ope_car_plate', event.target.value);
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
        case 'ope_company':
          formik.setFieldValue('ope_company', event.target.value)
        break;
        case 'ope_name_manager':
          formik.setFieldValue('ope_name_manager', event.target.value)
          break;
        case 'ope_advance_company':
            let cleanValue = event.target.value.replace(/[^0-9]/g, "");
            if (cleanValue.length > 16) {
              return;
            }
            if (cleanValue === "") {
              setPrice('')
              formik.setFieldValue('ope_advance_company', null)
              return;
            }
            setPrice(formatCurrency(parseInt(cleanValue)))
            formik.setFieldValue('ope_advance_company', parseInt(cleanValue))
          break;
        case 'ope_phone_manager':
            formik.setFieldValue('ope_phone_manager', event.target.value)
          break;
    
      default:
        break;
    }
    event.target.name == 'driver_name'
  
  }

  useEffect(() => {
    getAllPlates();
    getAllDrivers();
    
    return () => {}
  }, [])

  return (
    <>
      <section className={styles.content}>
        <h4>Datos y trayectoria</h4>
        <hr />
        <div className={styles.form}>
          <div className={styles.form_content}>
            <div className={styles.form_list}>
              <label htmlFor="">Placa del equipo</label>
              <select 
                name="ope_car_plate"
                value={formik.values.ope_car_plate || ''}
                onChange={(event)=>handleSelectChange(event)}
                className={styles.select}>
                  <option value="">Selecciona una opción</option>
                {carPlates && carPlates.map((plate:any , i) => (
                  <option key={i} value={plate.ut_car_plate} >{plate.ut_car_plate}</option>
                ))}
              </select>
            </div>

            <div className={styles.form_list}>
              <label htmlFor="">Conductor</label>
              <select 
                name="ope_id_driver"
                onChange={(event)=>handleSelectChange(event)}
                value={formik.values.ope_id_driver || ''}
                className={styles.select}>
                  <option value="">Selecciona una opción</option>
              {drivers && drivers.map((driver:any , i:any) => (
                  <option key={i} value={driver.id_personal}>{driver.personal_names}{driver.personal_surnames}</option>
                ))}
              </select>
            </div>

            <div className={styles.form_list}>
              <label htmlFor="total">Número de contacto</label>
              <input
                name="ope_phone_manager"
                placeholder="Escribe el número de contacto"
                value={formik.values.ope_phone_manager || ''}
                onChange={(event)=>handleInputChange(event)}
                type="number"/>
            </div>
            <div className={styles.form_list}>
              <label htmlFor="total">Nombre de la empresa</label>
              <input
                name="ope_company"
                placeholder="Escribe el nombre de la empresa"
                value={formik.values.ope_company || ''}
                onChange={(event)=>handleInputChange(event)}
                type="text"
              />
            </div>
            <div className={styles.form_list}>
              <label htmlFor="total">Nombre del encargado</label>
              <input 
                placeholder="Nombre del encargado" 
                name="ope_name_manager"
                onChange={(event)=>handleInputChange(event)}
                value={formik.values.ope_name_manager || ''}
                type="text" 
                />
            </div>
            <div className={styles.form_list}>
              <label htmlFor="total">Anticipo de la empresa</label>
              <input
                placeholder="$0"
                type="string"
                name="ope_advance_company"
                value={price || ''}
                onChange={(event)=>handleInputChange(event)}
                className={`${styles.input} ${styles.text_right}`}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DatesTrayectori;
