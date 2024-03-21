import { useState } from "react";
import styles from "./listpartssearchs.module.css";
import plusIcon from "src/assets/icons/plus-icon.svg";
import searchIcon from "src/assets/icons/search.svg";
import dowloadIcon from "src/assets/icons/download.svg";
import AddPart from "../AddFilters";
import ListFilterContent from "../ListFilterContent";

const ListFilterSearch = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  return (
    <section className={styles.list_system}>
      <div className={styles.system_actions}>
        <div className={styles.input_search}>
          <input
            type="text"
            autoComplete="off"
            placeholder="Buscar filtro por descripción o referencia"
          />
          <button className={styles.search_icon}>
            <img src={searchIcon} alt="icon" />
          </button>
        </div>
        <div className={styles.list_actions}>
          <button className="btn_black" onClick={showModal}>
            <img src={plusIcon} alt="Plus icon" /> Agregar Filtro
          </button>
          <button className="btn_secondary">
            <img src={dowloadIcon} alt="Plus icon" /> Descargar
          </button>
        </div>
      </div>

      {modalVisible && (
        <AddPart
          title={"Agregar"}
          technicianId={0}
          closeModal={() => setModalVisible(false)}
        />
      )}
      <ListFilterContent />
    </section>
  );
};

export default ListFilterSearch;
