import { ChangeEvent } from "react";
import styles from "./additionalparameters.module.css";

type props = {
  isHidden: boolean;
  formik: any;
};

const AdditionalParameters = ({ isHidden, formik }: props) => {
  const handleChangeTransmision = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    formik.setFieldValue(`transmission.${name}`, value);
  };

  const handleChangeBridges = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formik.setFieldValue(`bridge.${name}`, value);
  };

  return (
    <>
      <article
        className={`${styles.content_parameters} ${
          isHidden ? styles.hidden : ""
        }`}
      >
        <div>
          <div>
            <h3>Transmisión</h3>
          </div>
          <div>
            <section>
              <div>
                <label htmlFor="transmission_brand">
                  Marca de la transmisión
                </label>
                <input
                  type="text"
                  placeholder="Escribe la marca de la transmisión"
                  name="transmission_brand"
                  id="transmission_brand"
                  value={formik.values.transmission?.transmission_brand ?? ""}
                  onBlur={formik.handleBlur}
                  onChange={handleChangeTransmision}
                />
              </div>
              <div>
                <label htmlFor="transmission_model">
                  Modelo de la transmisión
                </label>
                <input
                  type="text"
                  placeholder="Escribe el modelo de la transmisión"
                  name="transmission_model"
                  id="transmission_model"
                  value={formik.values.transmission?.transmission_model ?? ""}
                  onBlur={formik.handleBlur}
                  onChange={handleChangeTransmision}
                />
              </div>
              <div>
                <label htmlFor="transmission_oil_cooler">
                  Enfriador de aceite
                </label>
                <select
                  name="transmission_oil_cooler"
                  id="transmission_oil_cooler"
                  value={
                    formik.values.transmission?.transmission_oil_cooler ?? ""
                  }
                  onBlur={formik.handleBlur}
                  onChange={handleChangeTransmision}
                >
                  <option value="">Selecciona Si o No</option>
                  <option value={1}>Si</option>
                  <option value={2}>No</option>
                </select>
              </div>
              <div>
                <label htmlFor="transmission_serial">
                  Número del serial de la transmisión
                </label>
                <input
                  type="text"
                  value={formik.values.transmission?.transmission_serial ?? ""}
                  onBlur={formik.handleBlur}
                  onChange={handleChangeTransmision}
                  placeholder="Escribe el número del serial"
                  name="transmission_serial"
                  id="transmission_serial"
                />
              </div>
            </section>
          </div>
        </div>
        <div>
          <div>
            <h3>Puente delantero</h3>
          </div>
          <div>
            <section>
              <div>
                <label htmlFor="bridge_front_brand">
                  Marca del puente delantero
                </label>
                <input
                  type="text"
                  placeholder="Escribe la marca del puente delantero"
                  id="bridge_front_brand"
                  value={formik.values.bridge?.bridge_front_brand ?? ""}
                  onChange={handleChangeBridges}
                  name="bridge_front_brand"
                />
              </div>
              <div>
                <label htmlFor="bridge_front_model">
                  Modelo del puente delantero
                </label>
                <input
                  type="text"
                  placeholder="Escribe el modelo del puente delantero"
                  name="bridge_front_model"
                  id="bridge_front_model"
                  value={formik.values.bridge?.bridge_front_model ?? ""}
                  onChange={handleChangeBridges}
                />
              </div>
              <div>
                <label htmlFor="bridge_serial">
                  Serial del puente delantero
                </label>
                <input
                  type="text"
                  placeholder="Escribe el serial del puente delantero"
                  id="bridge_serial"
                  value={formik.values.bridge?.bridge_serial ?? ""}
                  onChange={handleChangeBridges}
                  name="bridge_serial"
                />
              </div>
              <div>
                <label htmlFor="bridge_front_suspension">
                  Suspensión delantera 64”
                </label>
                <input
                  type="text"
                  placeholder="Escribe el número de la suspensión"
                  name="bridge_front_suspension"
                  id="bridge_front_suspension"
                  value={formik.values.bridge?.bridge_front_suspension ?? ""}
                  onChange={handleChangeBridges}
                />
              </div>
            </section>
          </div>
        </div>
        <div>
          <div>
            <h3>Puente trasero</h3>
          </div>
          <div>
            <section>
              <div className={styles.brand_rear}>
                <label htmlFor="bridge_rear_brand">
                  Marca del puente trasero
                </label>
                <input
                  type="text"
                  placeholder="Escribe la marca del puente delantero"
                  name="bridge_rear_brand"
                  id="bridge_rear_brand"
                  value={formik.values.bridge?.bridge_rear_brand ?? ""}
                  onChange={handleChangeBridges}
                />
              </div>
              <div>
                <label htmlFor="bridge_rear_model">
                  Modelo del puente trasero
                </label>
                <input
                  type="text"
                  placeholder="Escribe el modelo del puente delantero"
                  id="bridge_rear_model"
                  value={formik.values.bridge?.bridge_rear_model ?? ""}
                  onChange={handleChangeBridges}
                  name="bridge_rear_model"
                />
              </div>
              <div>
                <label htmlFor="bridge_rear_suspension">
                  Suspensión trasera RT-46”
                </label>
                <input
                  type="text"
                  placeholder="Escribe el número de la suspensión"
                  name="bridge_rear_suspension"
                  id="bridge_rear_suspension"
                  value={formik.values.bridge?.bridge_rear_suspension ?? ""}
                  onChange={handleChangeBridges}
                />
              </div>
              <div>
                <label htmlFor="bridge_intermediate_differential">
                  Difenrencial intermedio
                </label>
                <input
                  type="text"
                  placeholder="Escribe el serial del puente delantero"
                  id="bridge_intermediate_differential"
                  value={
                    formik.values.bridge?.bridge_intermediate_differential ?? ""
                  }
                  onChange={handleChangeBridges}
                  name="bridge_intermediate_differential"
                />
              </div>
              <div>
                <label htmlFor="bridge_rear_differential">
                  Diferencial trasero
                </label>
                <input
                  type="text"
                  placeholder="Escribe el serial del puente delantero"
                  name="bridge_rear_differential"
                  id="bridge_rear_differential"
                  value={formik.values.bridge?.bridge_rear_differential ?? ""}
                  onChange={handleChangeBridges}
                />
              </div>
            </section>
          </div>
        </div>
        <div>
          <div>
            <h3>Llantas y rines</h3>
          </div>
          <div>
            <section>
              <div className={styles.brand_rear}>
                <label htmlFor="ut_wheels_number">Rines</label>
                <input
                  type="number"
                  placeholder="Escribe el número de rines"
                  name="ut_wheels_number"
                  id="ut_wheels_number"
                  value={formik.values.ut_wheels_number ?? ""}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label htmlFor="ut_front_tires_number">
                  Llantas delanteras
                </label>
                <input
                  type="number"
                  placeholder="Escribe los valores de las llantas delanteras"
                  name="ut_front_tires_number"
                  id="ut_front_tires_number"
                  value={formik.values.ut_front_tires_number ?? ""}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label htmlFor="ut_rear_tires_number">Llantas traseras</label>
                <input
                  type="number"
                  placeholder="Escribe los valores de las llantas traseras"
                  name="ut_rear_tires_number"
                  id="ut_rear_tires_number"
                  value={formik.values.ut_rear_tires_number ?? ""}
                  onChange={formik.handleChange}
                />
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
};

export default AdditionalParameters;
