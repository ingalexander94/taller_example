import plusIcon from "src/assets/icons/plus-icon.svg";
import filtericon from "src/assets/icons/filter-black.svg";
import styles from "./wordordersfilter.module.css";

const WorkOrdersFilter = () => {
  return (
    <>
      <section className={styles.wordorders_filter}>
        <div className={styles.select_equip}>
          <p>Selecciona el equipo</p>
          <ul>
            <li className={styles.active}>WOM-371</li>
            <li>WOM-371</li>
            <li>WOM-371</li>
          </ul>
        </div>
        <div className={styles.content_filter}>
          <div className={styles.input_order}>
            <img src={filtericon} alt="Filter icon" />
            <select>
              <option>Ordenar por</option>
            </select>
          </div>
          <div className={styles.btn_register}>
            <button className="btn_black">
              <img src={plusIcon} alt="Plus icon" />
              Agregar registro
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkOrdersFilter;
