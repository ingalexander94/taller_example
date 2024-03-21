import { useState, useContext } from "react";

import Loading from "src/assets/icons/loading.svg";
import styles from "./addtechnician.module.css";
import { useFormik } from "formik";

import { AddTechnicianValidatorForm } from "src/validators";
import { TechnicianService } from "src/services/technician.service";
import { useFetch } from "src/hooks";
import { UIContext } from "src/context";

type Props = {
  closeModal: () => void;
  title: string;
  technicianId: number;
};

const AddFilter = ({ closeModal, title }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>("");
  const { callEndpoint } = useFetch();

  const { setRefreshTechnicians } = useContext(UIContext);

  const formik = useFormik({
    initialValues: AddTechnicianValidatorForm.initialState,
    validationSchema: AddTechnicianValidatorForm.validatorSchemaAddTechnician,
    validateOnMount: false,
    onSubmit: async (data: any) => {
      if (currentId) data.id_technician = currentId;

      setIsLoading(true);
      if (formik.isValid) {
        const response = await callEndpoint(TechnicianService.save(data));
        if (response.status) {
          closeModal();
          setCurrentId("");
          setIsLoading(false);
          setRefreshTechnicians();
        }
      }
    },
  });

  return (
    <article className={styles.container_modal}>
      <div onClick={closeModal} className={styles.overlay}></div>
      <div className={styles.modal}>
        <h2>{title} compra de filtros</h2>
        <hr className={styles.line_body} />
        <form className={styles.form} autoComplete="off">
          <div className={styles.content_form}>
            <div className={styles.formColumn}>
              <label>Número de referencia</label>
              <input
                placeholder="Escribe el número del referente"
                type="text"
              />
            </div>

            <div className={styles.formColumn}>
              <label htmlFor="nivelEducativo">Cantidad</label>
              <input placeholder="Escribe la cantidad comprada" type="text" />
            </div>
            <div className={styles.formColumn}>
              <label htmlFor="nivelEducativo">Nombre del repuesto</label>
              <input
                placeholder="Escribe la descripción o el nombre del repuesto"
                type="text"
              />
            </div>
            <div className={styles.formColumn}>
              <label htmlFor="nivelEducativo">Valor sin IVA</label>
              <input
                placeholder="Escribe el valor del repuesto sin IVA"
                type="text"
              />
            </div>
            <div className={styles.formColumn}>
              <label htmlFor="nivelEducativo">IVA</label>
              <input placeholder="Escribe el valor del IVA" type="text" />
            </div>
            <div className={styles.formColumn}>
              <label htmlFor="nivelEducativo">Valor de la unidad</label>
              <input placeholder="Escribe el número de la unidad" type="text" />
            </div>
            <div className={styles.formColumn}>
              <label htmlFor="nivelEducativo">Valor con IVA</label>
              <input
                placeholder="$0"
                className={styles.input_dark}
                type="text"
              />
            </div>
          </div>
          <div className={styles.formButtons}>
            <button
              type="button"
              className={styles.btn_cancel}
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.btn_keep}
              disabled={!formik.isValid || !formik.dirty}
            >
              Guardar repuestos
              <img
                className={`${!isLoading ? styles.hidden : ""}`}
                src={Loading}
                alt=""
              />
            </button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default AddFilter;
