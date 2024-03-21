import SystemTablet from "../SystemTablet";
import filterBlackIcon from "src/assets/icons/filter-black.svg";
import styles from "./systemlis.module.css";
import Pagination from "src/components/UI/Pagination";

const SistemListSearch = () => {
  return (
    <section className={styles.list_system}>
      <div className={styles.system_actions}>
        <div className={styles.input_search}>
          <p>Mantenimientos realizados </p>
        </div>
        <div className={styles.list_actions}>
          <div className={styles.input_order}>
            <img src={filterBlackIcon} alt="Filter icon" />
            <select>
              <option>Ordenar por</option>
            </select>
          </div>
          <input type="text" placeholder="Buscar mantenimiento por código" />
        </div>
      </div>

      <SystemTablet />
      <div className={styles.Pagination}>
        <Pagination last_page={3} />
      </div>
    </section>
  );
};

export default SistemListSearch;
