import styles from "./alertdelete.module.css";

type Props = {
  closeModal: () => void;
};

const AlertDelete = ({ closeModal }: Props) => {
  return (
    <article className={styles.container_modal}>
      <div onClick={closeModal} className={styles.overlay}></div>
      <div className={styles.modal}>
        <h2>Eliminar técnico</h2>
        <hr className={styles.line_body} />

        <div className={styles.container_content}>
          <p>¿Estás seguro que deseas eliminar este técnico?</p>
        </div>

        <div className={styles.container_btn}>
          <button
            type="button"
            className={styles.btn_cancel}
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.btn_keep}>
            Eliminar técnico
          </button>
        </div>
      </div>
    </article>
  );
};

export default AlertDelete;
