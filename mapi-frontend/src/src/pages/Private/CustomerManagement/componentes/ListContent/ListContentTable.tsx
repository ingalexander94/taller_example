import styles from "./listcontenttable.module.css";
import { useState } from "react";
import AddTechnician from "../AddTechnician";
import AlertDelete from "../AlertDelete";
import arrow from "src/assets/icons/arrow-down.svg";
import { Link } from "react-router-dom";

const ListContentTables = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  return (
    <div className={styles.table_system}>
      <div className={styles.table_header}>
        <ul>
          <li>Nit</li>
          <li>Nombre de la empresa</li>
          <li>Nombre del gerente</li>
          <li>Nro. de contacto</li>
          <li>Responsable</li>
          <li>Estado</li>
          <li>Acciones</li>
        </ul>
      </div>
      <div className={styles.table_content}>
        <div className={styles.table_item}>
          <input type="checkbox" id={styles.system1} />
          <label htmlFor={styles.system1}>
            <ul>
              <li>
                <strong>0.000.000</strong>
              </li>

              <li>
                <p>Nombre de la empresa</p>
              </li>
              <li>
                <strong>Jhon Edward Felix</strong>
              </li>
              <li>
                <p>300 234 3456</p>
              </li>
              <li>
                <strong>Nombre del responsable</strong>
              </li>
              <li className={styles.text_estado}>
                <p>Activo</p>
              </li>
              <Link to="#" className={styles.customer_portal}>
                Ver portal de cliente
                <img src={arrow} alt="arrow" />
              </Link>
            </ul>
          </label>
        </div>
        <div className={styles.table_item}>
          <input type="checkbox" id={styles.system2} />
          <label htmlFor={styles.system2}>
            <ul>
              <li>
                <strong>0.000.000</strong>
              </li>

              <li>
                <p>Nombre de la empresa</p>
              </li>
              <li>
                <strong>Jhon Edward Felix</strong>
              </li>
              <li>
                <p>300 234 3456</p>
              </li>
              <li>
                <strong>Nombre del responsable</strong>
              </li>
              <li className={styles.text_estado}>
                <p>Activo</p>
              </li>
              <Link to="#" className={styles.customer_portal}>
                Ver portal de cliente
                <img src={arrow} alt="arrow" />
              </Link>
            </ul>
          </label>
        </div>
        <div className={styles.table_item}>
          <input type="checkbox" id={styles.system3} />
          <label htmlFor={styles.system3}>
            <ul>
              <li>
                <strong>0.000.000</strong>
              </li>

              <li>
                <p>Nombre de la empresa</p>
              </li>
              <li>
                <strong>Jhon Edward Felix</strong>
              </li>
              <li>
                <p>300 234 3456</p>
              </li>
              <li>
                <strong>Nombre del responsable</strong>
              </li>
              <li className={styles.text_estado}>
                <p>Activo</p>
              </li>
              <Link to="#" className={styles.customer_portal}>
                Ver portal de cliente
                <img src={arrow} alt="arrow" />
              </Link>
            </ul>
          </label>
        </div>
        <div className={styles.table_item}>
          <input type="checkbox" id={styles.system4} />
          <label htmlFor={styles.system4}>
            <ul>
              <li>
                <strong>0.000.000</strong>
              </li>

              <li>
                <p>Nombre de la empresa</p>
              </li>
              <li>
                <strong>Jhon Edward Felix</strong>
              </li>
              <li>
                <p>300 234 3456</p>
              </li>
              <li>
                <strong>Nombre del responsable</strong>
              </li>
              <li className={styles.text_estado}>
                <p>Activo</p>
              </li>
              <Link to="#" className={styles.customer_portal}>
                Ver portal de cliente
                <img src={arrow} alt="arrow" />
              </Link>
            </ul>
          </label>
        </div>
        <div className={styles.table_item}>
          <input type="checkbox" id={styles.system5} />
          <label htmlFor={styles.system5}>
            <ul>
              <li>
                <strong>0.000.000</strong>
              </li>

              <li>
                <p>Nombre de la empresa</p>
              </li>
              <li>
                <strong>Jhon Edward Felix</strong>
              </li>
              <li>
                <p>300 234 3456</p>
              </li>
              <li>
                <strong>Nombre del responsable</strong>
              </li>
              <li className={styles.text_estado}>
                <p>Activo</p>
              </li>
              <Link to="#" className={styles.customer_portal}>
                Ver portal de cliente
                <img src={arrow} alt="arrow" />
              </Link>
            </ul>
          </label>
        </div>
        <div className={styles.table_item}>
          <input type="checkbox" id={styles.system6} />
          <label htmlFor={styles.system6}>
            <ul>
              <li>
                <strong>0.000.000</strong>
              </li>

              <li>
                <p>Nombre de la empresa</p>
              </li>
              <li>
                <strong>Jhon Edward Felix</strong>
              </li>
              <li>
                <p>300 234 3456</p>
              </li>
              <li>
                <strong>Nombre del responsable</strong>
              </li>
              <li className={styles.text_state_inactive}>
                <p>Inactivo</p>
              </li>
              <Link to="#" className={styles.customer_portal}>
                Ver portal de cliente
                <img src={arrow} alt="arrow" />
              </Link>
            </ul>
          </label>
        </div>
        <div className={styles.table_item}>
          <input type="checkbox" id={styles.system7} />
          <label htmlFor={styles.system6}>
            <ul>
              <li>
                <strong>0.000.000</strong>
              </li>

              <li>
                <p>Nombre de la empresa</p>
              </li>
              <li>
                <strong>Jhon Edward Felix</strong>
              </li>
              <li>
                <p>300 234 3456</p>
              </li>
              <li>
                <strong>Nombre del responsable</strong>
              </li>
              <li className={styles.text_estado}>
                <p>Activo</p>
              </li>

              <Link to="#" className={styles.customer_portal}>
                Ver portal de cliente
                <img src={arrow} alt="arrow" />
              </Link>
            </ul>
          </label>
        </div>
        <div className={styles.table_item}>
          <input type="checkbox" id={styles.system8} />
          <label htmlFor={styles.system6}>
            <ul>
              <li>
                <strong>0.000.000</strong>
              </li>

              <li>
                <p>Nombre de la empresa</p>
              </li>
              <li>
                <strong>Jhon Edward Felix</strong>
              </li>
              <li>
                <p>300 234 3456</p>
              </li>
              <li>
                <strong>Nombre del responsable</strong>
              </li>
              <li className={styles.text_state_test}>
                <p>Prueba</p>
              </li>
              <Link to="#" className={styles.customer_portal}>
                Ver portal de cliente
                <img src={arrow} alt="arrow" />
              </Link>
            </ul>
          </label>
        </div>
      </div>
      {/* <Pagination last_page={0} /> */}
      {modalVisible && (
        <AddTechnician
          title={"Editar"}
          closeModal={() => setModalVisible(false)}
        />
      )}

      {modalDelete && <AlertDelete closeModal={() => setModalDelete(false)} />}
    </div>
  );
};

export default ListContentTables;
