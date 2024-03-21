import { useState, MouseEvent, useContext } from "react";
import errorIcon from "src/assets/icons/error.svg";
import searchIcon from "src/assets/icons/search.svg";
import filterBlackIcon from "src/assets/icons/filter-black.svg";
import styles from "./maintenancesearch.module.css";
import { TemporaryContext } from "src/context";
import DetailContent from "../DetailContent";

const DetailSearch = () => {
  const [code, setCode] = useState<string>("");

  const { setSearch } = useContext(TemporaryContext);

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (code.length) {
      setSearch("");
      setCode("");
    }
  };

  return (
    <section className={styles.list_system}>
      <div className={styles.system_actions}>
        <div className={styles.input_search}>
          <p>Detalles de mantenimiento</p>
        </div>
        <div className={styles.list_actions}>
          <div className={styles.input_order}>
            <img src={filterBlackIcon} alt="Filter icon" />
            <select>
              <option value="ASC">Ordenar por</option>
            </select>
          </div>
          <input type="text" placeholder="Buscar operación por código" />
          <button
            onClick={handleReset}
            className={`${styles.search_icon} ${
              code.length ? styles.active : ""
            }`}
          >
            <img src={code.length ? errorIcon : searchIcon} alt="Error icon" />
          </button>
        </div>
      </div>
      <DetailContent />
    </section>
  );
};

export default DetailSearch;
