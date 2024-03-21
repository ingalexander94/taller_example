import styles from "./editmodal.module.css";

type Props = {
  closeModal: () => void;
};

const EditModal = ({ closeModal }: Props) => {
  const handleOverlayClick = () => {
    closeModal();
  };

  const handleCancelButtonClick = () => {
    closeModal();
  };

  return (
    <article className={styles.container_modal}>
      <div onClick={handleOverlayClick} className={styles.overlay}></div>

      <div className={styles.modal}>
        <h2>equipo</h2>
        <hr className={styles.line_body} />
        <form className={styles.form}>
          <div className={styles.formColumn}>
            <label>Placa</label>
            <input
              placeholder="Asigna una placa"
              type="text"
              name="codigo"
              className={styles.intput}
            />
          </div>
          <div className={styles.formColumn}>
            <label>Placa</label>
            <input
              placeholder="Asigna una placa"
              type="text"
              name="codigo"
              className={styles.intput}
            />
          </div>
          <div className={styles.formColumn}>
            <label>Placa</label>
            <input
              placeholder="Asigna una placa"
              type="text"
              name="codigo"
              className={styles.intput}
            />
          </div>
          <div className={styles.formColumn}>
            <label>Placa</label>
            <input
              placeholder="Asigna una placa"
              type="text"
              name="codigo"
              className={styles.intput}
            />
          </div>
          <div className={styles.formColumn}>
            <label>Placa</label>
            <input
              placeholder="Asigna una placa"
              type="text"
              name="codigo"
              className={styles.intput}
            />
          </div>
        </form>
        <div className={styles.formButtons}>
          <button
            type="button"
            className={styles.btn_cancel}
            onClick={handleCancelButtonClick}
          >
            Cancelar
          </button>
          <button type="button" className={styles.btn_keep}>
            Guardar cambios
          </button>
        </div>
      </div>
    </article>
  );
};

export default EditModal;
