import { useContext, useRef, useState } from "react";
import alertIcon from "src/assets/alert.svg";
import styles from "./addbrand.module.css";
import { useFormik } from "formik";
import { AddBrandValidatorForm } from "src/validators";
import { TemporaryContext } from "src/context";
import { useAxios } from "src/hooks";
import { BrandService } from "src/services";

type Props = {
  closeModal: (refresh: boolean) => void;
};

const AddBrandModal = ({ closeModal }: Props) => {
  const saveModalRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { temporaryState } = useContext(TemporaryContext);
  const { callEndpoint } = useAxios();

  const formik = useFormik({
    initialValues: AddBrandValidatorForm.initialState,
    validationSchema: AddBrandValidatorForm.validatorSchemaBrand,
    validateOnMount: false,
    onSubmit: async (values) => {
      if (formik.isValid && temporaryState.teamActive) {
        setLoading(true);
        values.brand_team = temporaryState.teamActive.id_team;
        await callEndpoint(BrandService.create(values));
        setLoading(false);
        handleCancel(true);
      }
    },
  });

  const handleCancel = (refresh: boolean) => {
    if (saveModalRef.current) {
      saveModalRef.current.classList.add("animate__fadeOut");
    }
    setTimeout(() => {
      closeModal(refresh);
    }, 500);
  };

  return (
    <div
      className={`animate__animated animate__fadeIn animate__faster ${styles.save_modal}`}
      ref={saveModalRef}
    >
      <div onClick={() => handleCancel(false)}></div>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <img src={alertIcon} alt="Alert icon" />
        <h3>Agregar marca</h3>
        <p>
          Estas a punto de agregar una nueva marca de equipos originales de
          fabrica.
        </p>
        <fieldset>
          <input
            name="brand_name"
            id="brand_name"
            type="text"
            value={formik.values.brand_name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            autoFocus
            placeholder="Asignar un nombre a la marca"
          />
          <p>
            {formik.touched.brand_name && formik.errors.brand_name
              ? `* ${formik.errors.brand_name}`
              : ""}
          </p>
        </fieldset>
        <div>
          <button
            onClick={() => handleCancel(false)}
            className={styles.cancel_btn}
            type="button"
          >
            Cancelar
          </button>
          <button
            disabled={loading || !formik.dirty || !formik.isValid}
            type="submit"
          >
            Crear marca
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBrandModal;
