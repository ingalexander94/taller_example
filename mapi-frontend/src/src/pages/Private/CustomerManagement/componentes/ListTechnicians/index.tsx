import { ChangeEvent, useRef, useState, MouseEvent } from "react";
import styles from "./listoftechnician.module.css";
import plusIcon from "src/assets/icons/plus-icon.svg";
import errorIcon from "src/assets/icons/error.svg";
import searchIcon from "src/assets/icons/search.svg";
import AddTechnician from "../AddTechnician";
import ListContentTable from "../ListContent/ListContentTable";

const ListTechnicians = () => {
  const [search, setSearch] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (search.length) setSearch("");
  };

  const showModal = () => {};

  return (
    <section className={styles.list_system}>
      <div className={styles.system_actions}>
        <div className={styles.input_search}>
          <p>Listado de clientes</p>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Buscar cliente por nombre ó nit"
          />
          <button
            onClick={handleReset}
            className={`${styles.search_icon} ${
              search.length ? styles.active : ""
            }`}
          >
            <img
              src={search.length ? errorIcon : searchIcon}
              alt="Error icon"
            />
          </button>
        </div>
        <div className={styles.list_actions}>
          <button className="btn_black" onClick={showModal}>
            <img src={plusIcon} alt="Plus icon" /> Crear nuevo cliente
          </button>
        </div>
      </div>

      {modalVisible && (
        <AddTechnician
          title={"Agregar"}
          closeModal={() => setModalVisible(false)}
        />
      )}
      <ListContentTable />
    </section>
  );
};

export default ListTechnicians;
