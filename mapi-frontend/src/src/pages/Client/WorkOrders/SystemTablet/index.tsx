import Pagination from "src/components/UI/Pagination";
import styles from "./systemtablet.module.css";
import filterIcon from "src/assets/icons/filter-black.svg";
import download from "src/assets/icons/download.svg";
import arrow from "src/assets/icons/arrow-right.svg";
import { Link } from "react-router-dom";
import { privateRoutes } from "src/models";

const SystemTablet = () => {
  return (
    <div className={styles.table_system}>
      <div className={styles.table_header}>
        <ul>
          <li>Código de entrada</li>
          <li>Conductor</li>
          <li>
            <img src={filterIcon} alt="icon" />
            Fecha de ingreso
          </li>
          <li>Modelo</li>
          <li>Año del equipo</li>
          <li>placa del equipo</li>
          <li>Acciones</li>
        </ul>
      </div>
      <div className={styles.table_content}>
        <div className={styles.table_item}>
          <ul>
            <li>
              <strong>MC000001</strong>
            </li>

            <li>
              <strong>Francisco Rolón</strong>
            </li>
            <li>
              <strong>20/01/2023</strong>
            </li>
            <li>
              <strong>Kenworth T800</strong>
            </li>
            <li>
              <strong>2002</strong>
            </li>
            <li>
              <strong>WOM-371</strong>
            </li>
            <li className={styles.li_btn}>
              <button className={styles.btn_download}>
                Imprimir Orden
                <img src={download} alt="icon" />
              </button>

              <Link to={`${privateRoutes.WORDORDERSDETAIL}`}>
                Ver detalles
                <img src={arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Pagination last_page={1} />
    </div>
  );
};

export default SystemTablet;
