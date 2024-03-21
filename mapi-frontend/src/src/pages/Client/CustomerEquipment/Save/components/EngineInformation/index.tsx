import { ChangeEvent } from "react";
import styles from "./engineinformation.module.css";

type props = {
  isHidden: boolean;
  formik: any;
};

const EngineInformation = ({ isHidden, formik }: props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formik.setFieldValue(`engine.${name}`, value);
  };

  return (
    <>
      <article
        className={`${styles.content_information} ${
          isHidden ? styles.hidden : ""
        }`}
      >
        <div>
          <h3>Información del motor</h3>
        </div>
        <div>
          <section>
            <div>
              <label htmlFor="engine_brand">Marca del motor</label>
              <input
                type="text"
                placeholder="Escribe la marca del motor"
                name="engine_brand"
                value={formik.values.engine?.engine_brand ?? ""}
                onBlur={formik.handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="engine_model">Modelo del motor</label>
              <input
                type="text"
                placeholder="Escribe la marca del motor"
                name="engine_model"
                id="engine_model"
                value={formik.values.engine?.engine_model ?? ""}
                onBlur={formik.handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="engine_cylinder_capacity">Cilindraje</label>
              <input
                type="text"
                placeholder="Escribe el cilindraje en litros"
                name="engine_cylinder_capacity"
                value={formik.values.engine?.engine_cylinder_capacity ?? ""}
                onBlur={formik.handleBlur}
                onChange={handleChange}
                id="engine_cylinder_capacity"
              />
            </div>
            <div>
              <label htmlFor="engine_serial">Número del serial</label>
              <input
                type="text"
                placeholder="Escribe el número del serial"
                name="engine_serial"
                id="engine_serial"
                value={formik.values.engine?.engine_serial ?? ""}
                onBlur={formik.handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="engine_power">Potencia indicada</label>
              <input
                type="text"
                placeholder="Escribe el número de la potencia indicada"
                name="engine_power"
                id="engine_power"
                value={formik.values.engine?.engine_power ?? ""}
                onBlur={formik.handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="engine_torque">Torque</label>
              <input
                type="text"
                placeholder="Escribe el número de torque Lb.pie"
                name="engine_torque"
                id="engine_torque"
                value={formik.values.engine?.engine_torque ?? ""}
                onBlur={formik.handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="engine_governed_speed">Velocidad gobernada</label>
              <input
                type="text"
                placeholder="Escribe la velocidad en RPMr"
                name="engine_governed_speed"
                id="engine_governed_speed"
                value={formik.values.engine?.engine_governed_speed ?? ""}
                onBlur={formik.handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="engine_ecm_name">Nombre del ECM</label>
              <input
                type="text"
                placeholder="Escribe el nombre de ECM"
                name="engine_ecm_name"
                id="engine_ecm_name"
                value={formik.values.engine?.engine_ecm_name ?? ""}
                onBlur={formik.handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="engine_ecm_code">Código del ECM</label>
              <input
                type="text"
                placeholder="Escribe el código ECM"
                name="engine_ecm_code"
                id="engine_ecm_code"
                value={formik.values.engine?.engine_ecm_code ?? ""}
                onBlur={formik.handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="engine_part_ecm">Número parte del ECM</label>
              <input
                type="text"
                placeholder="Escribe el número parte del ECM"
                name="engine_part_ecm"
                id="engine_part_ecm"
                value={formik.values.engine?.engine_part_ecm ?? ""}
                onBlur={formik.handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="engine_serial_ecm">Serial del ECM</label>
              <input
                type="text"
                placeholder="Escribe el número del serial"
                name="engine_serial_ecm"
                id="engine_serial_ecm"
                value={formik.values.engine?.engine_serial_ecm ?? ""}
                onBlur={formik.handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="engine_cpl">Número de CPL</label>
              <input
                type="text"
                placeholder="Escribe el número de CPL"
                name="engine_cpl"
                id="engine_cpl"
                value={formik.values.engine?.engine_cpl ?? ""}
                onBlur={formik.handleBlur}
                onChange={handleChange}
              />
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default EngineInformation;
