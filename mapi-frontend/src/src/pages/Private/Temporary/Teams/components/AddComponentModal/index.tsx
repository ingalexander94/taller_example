import { useContext, useRef, useState } from "react";
import alertIcon from "src/assets/alert.svg";
import styles from "./addcomponent.module.css";
import { TemporaryContext } from "src/context";
import { useFormik } from "formik";
import { AddComponentValidatorForm } from "src/validators";
import { useAxios } from "src/hooks";
import { ComponentService } from "src/services";

type Props = {
  closeModal: () => void;
};

const AddComponentModal = ({ closeModal }: Props) => {
  const saveModalRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { temporaryState, addComponent, setComponentActive } =
    useContext(TemporaryContext);
  const { callEndpoint } = useAxios();

  const formik = useFormik({
    initialValues: AddComponentValidatorForm.initialState,
    validationSchema: AddComponentValidatorForm.validatorSchemacomponent,
    validateOnMount: false,
    onSubmit: async (values) => {
      if (formik.isValid && temporaryState.teamActive) {
        values.component_team = temporaryState.teamActive.id_team;
        setLoading(true);
        const res = await callEndpoint(ComponentService.create(values));
        if (res) {
          const { data: component } = res.data;
          addComponent(component);
          setComponentActive(component);
        }
        setLoading(false);
        handleCancel();
      }
    },
  });

  const handleCancel = () => {
    if (saveModalRef.current) {
      saveModalRef.current.classList.add("animate__fadeOut");
    }
    setTimeout(() => {
      closeModal();
    }, 500);
  };

  return (
    <div
      className={`animate__animated animate__fadeIn animate__faster ${styles.save_modal}`}
      ref={saveModalRef}
    >
      <div onClick={handleCancel}></div>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <img src={alertIcon} alt="Alert icon" />
        <h3>Agregar componente</h3>
        <p>
          Estas a punto de agregar un nuevo componente para el equipo
          <strong> {temporaryState.teamActive?.team_name}</strong>
        </p>
        <div className={styles.form_inputs}>
          <fieldset>
            <input
              name="component_code"
              id="component_code"
              type="text"
              value={formik.values.component_code}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              autoFocus
              placeholder="Asignar un código al componente"
            />
            <p>
              {formik.touched.component_code && formik.errors.component_code
                ? `* ${formik.errors.component_code}`
                : ""}
            </p>
          </fieldset>
          <fieldset>
            <input
              name="component_name"
              id="component_name"
              type="text"
              value={formik.values.component_name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Asignar un nombre al componente"
            />
            <p>
              {formik.touched.component_name && formik.errors.component_name
                ? `* ${formik.errors.component_name}`
                : ""}
            </p>
          </fieldset>
        </div>
        <div>
          <button
            onClick={handleCancel}
            className={styles.cancel_btn}
            type="button"
          >
            Cancelar
          </button>
          <button
            disabled={loading || !formik.dirty || !formik.isValid}
            type="submit"
          >
            Crear componente
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComponentModal;
