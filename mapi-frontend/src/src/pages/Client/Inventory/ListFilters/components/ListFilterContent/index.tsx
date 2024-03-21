import editIcon from "src/assets/icons/edit.svg";
import deleteIcon from "src/assets/icons/delete.svg";
import styles from "./listpartscontent.module.css";
import { useState } from "react";
import Pagination from "src/components/UI/Pagination";
import AddFilter from "../AddFilters";

const ListFilterContent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editTechnician, setEditTechnician] = useState<number>(0);

  const showModal = () => {
    setModalVisible(true);
  };

  return (
    <div className={styles.table_system}>
      <div className={styles.table_header}>
        <ul>
          <li>Nro.</li>
          <li>Nombre del filtro</li>
          <li>Referencia</li>
          <li>Cantidad</li>
          <li>Valor de la unidad</li>
          <li>Valor sin IVA</li>
          <li>IVA</li>
          <li>Valor con IVA</li>
          <li>Acciones</li>
        </ul>
      </div>
      <div className={styles.table_content}>
        <div className={styles.table_item}>
          <ul>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>
                Filtro de combustible 25 micras Filtro de combustible 25 micras
              </strong>
            </li>
            <li>FS19765</li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <div className={styles.buttons}>
              <button onClick={showModal} className={styles.btn_edit}>
                <img src={editIcon} alt="edit icon" />
              </button>
              <button className={styles.btn_delete}>
                <img src={deleteIcon} alt="delete icon" />
              </button>
            </div>
          </ul>
        </div>
        <div className={styles.table_item}>
          <ul>
            <li>
              <strong>2</strong>
            </li>
            <li>
              <strong>Filtro separador ISX</strong>
            </li>
            <li>FS19765</li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <div className={styles.buttons}>
              <button onClick={showModal} className={styles.btn_edit}>
                <img src={editIcon} alt="edit icon" />
              </button>
              <button className={styles.btn_delete}>
                <img src={deleteIcon} alt="delete icon" />
              </button>
            </div>
          </ul>
        </div>
        <div className={styles.table_item}>
          <ul>
            <li>
              <strong>3</strong>
            </li>
            <li>
              <strong>Filtro de aceite (homologo LF9080)</strong>
            </li>
            <li>FS19765</li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <div className={styles.buttons}>
              <button onClick={showModal} className={styles.btn_edit}>
                <img src={editIcon} alt="edit icon" />
              </button>
              <button className={styles.btn_delete}>
                <img src={deleteIcon} alt="delete icon" />
              </button>
            </div>
          </ul>
        </div>
        <div className={styles.table_item}>
          <ul>
            <li>
              <strong>4</strong>
            </li>
            <li>
              <strong>Filtro combustible 10 Micras</strong>
            </li>
            <li>FS19765</li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <div className={styles.buttons}>
              <button onClick={showModal} className={styles.btn_edit}>
                <img src={editIcon} alt="edit icon" />
              </button>
              <button className={styles.btn_delete}>
                <img src={deleteIcon} alt="delete icon" />
              </button>
            </div>
          </ul>
        </div>
        <div className={styles.table_item}>
          <ul>
            <li>
              <strong>5</strong>
            </li>
            <li>
              <strong>Filtro de agua ISX</strong>
            </li>
            <li>FS19765</li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <div className={styles.buttons}>
              <button onClick={showModal} className={styles.btn_edit}>
                <img src={editIcon} alt="edit icon" />
              </button>
              <button className={styles.btn_delete}>
                <img src={deleteIcon} alt="delete icon" />
              </button>
            </div>
          </ul>
        </div>
        <div className={styles.table_item}>
          <ul>
            <li>
              <strong>6</strong>
            </li>
            <li>
              <strong>Filtro de combustible ISC</strong>
            </li>
            <li>FS19765</li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <div className={styles.buttons}>
              <button onClick={showModal} className={styles.btn_edit}>
                <img src={editIcon} alt="edit icon" />
              </button>
              <button className={styles.btn_delete}>
                <img src={deleteIcon} alt="delete icon" />
              </button>
            </div>
          </ul>
        </div>
        <div className={styles.table_item}>
          <ul>
            <li>
              <strong>4</strong>
            </li>
            <li>
              <strong>Filtro de combustible JAC/FOTON</strong>
            </li>
            <li>FS19765</li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <div className={styles.buttons}>
              <button onClick={showModal} className={styles.btn_edit}>
                <img src={editIcon} alt="edit icon" />
              </button>
              <button className={styles.btn_delete}>
                <img src={deleteIcon} alt="delete icon" />
              </button>
            </div>
          </ul>
        </div>
        <div className={styles.table_item}>
          <ul>
            <li>
              <strong>4</strong>
            </li>
            <li>
              <strong>Elemento filtro separador</strong>
            </li>
            <li>FS19765</li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <div className={styles.buttons}>
              <button onClick={showModal} className={styles.btn_edit}>
                <img src={editIcon} alt="edit icon" />
              </button>
              <button className={styles.btn_delete}>
                <img src={deleteIcon} alt="delete icon" />
              </button>
            </div>
          </ul>
        </div>
        <div className={styles.table_item}>
          <ul>
            <li>
              <strong>4</strong>
            </li>
            <li>
              <strong>Filtro de aire interno Kenworth nuevo</strong>
            </li>
            <li>FS19765</li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <div className={styles.buttons}>
              <button onClick={showModal} className={styles.btn_edit}>
                <img src={editIcon} alt="edit icon" />
              </button>
              <button className={styles.btn_delete}>
                <img src={deleteIcon} alt="delete icon" />
              </button>
            </div>
          </ul>
        </div>
        <div className={styles.table_item}>
          <ul>
            <li>
              <strong>4</strong>
            </li>
            <li>
              <strong>Filtro primario de combustible (10 micras)</strong>
            </li>
            <li>FS19765</li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>1</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <li>
              <strong>$0</strong>
            </li>
            <div className={styles.buttons}>
              <button onClick={showModal} className={styles.btn_edit}>
                <img src={editIcon} alt="edit icon" />
              </button>
              <button className={styles.btn_delete}>
                <img src={deleteIcon} alt="delete icon" />
              </button>
            </div>
          </ul>
        </div>
      </div>

      <Pagination last_page={2} />

      {modalVisible && (
        <AddFilter
          title={"Editar"}
          technicianId={editTechnician}
          closeModal={() => {
            setEditTechnician(0);
            setModalVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default ListFilterContent;
