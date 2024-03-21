import { useState } from "react";
import { useAxios } from "src/hooks";
import { PersonalService } from "src/services";
import Icono from "src/assets/icons/Icono_informativo.svg";
import styles from "./alertdelete.module.css";

type Props = {
  closeModal: () => void;
  id_personal: number;
};

const AlertDelete = ({ closeModal, id_personal }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { callEndpoint } = useAxios();

  const hanldeDelete = async () => {
    setLoading(true);
    await callEndpoint(PersonalService.delete(id_personal));
    setLoading(false);
    closeModal();
  };

  return (
    <article className={styles.container_modal}>
      <div onClick={closeModal} className={styles.overlay}></div>
      <div className={styles.modal}>
        <img
          src={Icono}
          alt="Close icon"
          style={{
            width: "150px",
            margin: "0 auto",
          }}
        />

        <h2>Esta a punto de eliminar una persona</h2>

        <div className={styles.container_content}>
          <p>¿Estás seguro que deseas eliminar esta persona?</p>
        </div>

        <div className={styles.container_btn}>
          <button
            disabled={loading}
            type="button"
            className={styles.btn_cancel}
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            disabled={loading}
            type="button"
            onClick={hanldeDelete}
            className={styles.btn_keep}
          >
            Eliminar persona
          </button>
        </div>
      </div>
    </article>
  );
};

export default AlertDelete;
