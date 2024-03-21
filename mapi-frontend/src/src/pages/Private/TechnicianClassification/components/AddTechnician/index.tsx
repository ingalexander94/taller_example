import {
  useEffect,
  useState,
  MouseEvent,
  useRef,
  ChangeEvent,
  useContext,
} from "react";
import Mechanics from "src/assets/icons/Mechanics.svg";
import Electricity from "src/assets/icons/Electricity.svg";
import Blacks from "src/assets/icons/Blacks.svg";
import Motor from "src/assets/icons/Motor.svg";
import Arrow from "src/assets/icons/arrow.svg";
import Loading from "src/assets/icons/loading.svg";
import styles from "./addtechnician.module.css";
import { useFormik } from "formik";

import InputTechnicianCode from "./components/InputTechnicianCode";
import InputTechnicianName from "./components/InputTechnicianName";
import { AddTechnicianValidatorForm } from "src/validators";
import { TechnicianService } from "src/services/technician.service";
import { useFetch } from "src/hooks";
import { UIContext } from "src/context";

type Props = {
  closeModal: () => void;
  title: string;
  technicianId: number;
};

const AddTechnician = ({ closeModal, title, technicianId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [salary, setSalary] = useState<string>("");
  const [currentName, setCurrentName] = useState<string>("");
  const [currentCode, setCurrentCode] = useState<string>("");
  const [currentId, setCurrentId] = useState<string>("");
  const [icon, setIcon] = useState<string>(Motor);
  const selectImageRef = useRef<HTMLUListElement>(null);
  const { callEndpoint } = useFetch();

  const { setRefreshTechnicians } = useContext(UIContext);

  const maxChars = 200;

  useEffect(() => {
    const getTechniciandata = async () => {
      if (technicianId === 0) return;
      const response = await callEndpoint(
        TechnicianService.getDetail(technicianId)
      );
      setCurrentName(response.data.technician_name);
      setCurrentCode(response.data.technician_code);
      setCurrentId(response.data.id_technician);
      formik.setValues(response.data);
      if (response.data.technician_salary) {
        const formattedValue = Intl.NumberFormat("es-CO", {
          currency: "COP",
        }).format(response.data.technician_salary);
        setSalary(formattedValue);
      }
      setIcon(response.data.technician_icon ?? Motor);
    };

    getTechniciandata();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [technicianId]);

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 16) {
      return;
    }

    if (value === "") {
      setSalary("");
      formik.setFieldValue("technician_salary", null);
      return;
    }

    const numericValue = parseInt(value);
    if (isNaN(numericValue)) {
      formik.setFieldValue(
        "technician_salary",
        e.target.value.replace(/[^0-9]/g, "")
      );
    } else {
      let formattedValue = "";
      formattedValue = Intl.NumberFormat("es-CO", {
        currency: "COP",
      }).format(numericValue);

      setSalary(formattedValue);
      formik.setFieldValue(
        "technician_salary",
        e.target.value.replace(/[^0-9]/g, "")
      );
    }
  };

  const handleIcon = (e: MouseEvent<HTMLUListElement>) => {
    if (e.target instanceof HTMLLIElement) {
      const previusElement =
        e.currentTarget.previousSibling?.previousSibling?.previousSibling;
      if (previusElement instanceof HTMLInputElement) {
        previusElement.click();
      }

      setIcon(e.target.children[0].getAttribute("src") ?? Motor);
      formik.values.technician_icon = e.target.children[0].getAttribute("src");
    }

    if (e.target instanceof HTMLImageElement) {
      const previusElement =
        e.currentTarget.previousSibling?.previousSibling?.previousSibling;
      if (previusElement instanceof HTMLInputElement) {
        previusElement.click();
      }

      setIcon(e.target.src);
      formik.values.technician_icon = e.target.src;
    }
  };

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
        <h2>{title} técnico </h2>
        <hr className={styles.line_body} />
        <form
          onSubmit={formik.handleSubmit}
          className={styles.form}
          autoComplete="off"
        >
          <div>
            <div className={styles.formColumn}>
              <input
                type="checkbox"
                name="technician_icon_check"
                id="technician_icon_check"
                style={{ display: "none" }}
              />
              <input
                type="text"
                name="technician_icon"
                id="technician_icon"
                value={formik.values.technician_icon ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ display: "none" }}
              />
              <label htmlFor="technician_icon_check">
                Icono
                <div>
                  <img src={icon} style={{ width: "16px" }} alt="Mecánica" />
                  <img src={Arrow} alt="Flecha abajo" />
                </div>
              </label>
              <ul onClick={handleIcon} ref={selectImageRef}>
                <li className={styles.listIcons}>
                  <img src={Motor} style={{ width: "20px" }} alt="" />
                </li>
                <li className={styles.listIcons}>
                  <img src={Blacks} alt="" />
                </li>
                <li className={styles.listIcons}>
                  <img style={{ width: "20px" }} src={Mechanics} alt="" />
                </li>
                <li className={styles.listIcons}>
                  <img src={Electricity} alt="" />
                </li>
              </ul>
            </div>

            <InputTechnicianName initialValue={currentName} formik={formik} />
            <InputTechnicianCode initialValue={currentCode} formik={formik} />
          </div>

          <div>
            <div className={styles.formColumn}>
              <label htmlFor="nivelEducativo">Nivel de educación</label>
              <input
                placeholder="Definir el nivel educativo"
                type="text"
                id="technician_education"
                name="technician_education"
                value={formik.values.technician_education ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.intput}
              />
            </div>

            <div className={styles.formColumn}>
              <label htmlFor="nivelEducativo">Salario básico</label>
              <input
                placeholder="$0"
                type="text"
                id="technician_salary"
                name="technician_salary"
                value={salary}
                onChange={handlePriceChange}
                className={styles.intputs}
              />
            </div>
          </div>

          <div className={`${styles.formGroup} `}>
            <label htmlFor="descripcionOperacion">Descripción del perfil</label>
            <textarea
              className={styles.textarea}
              id="technician_description"
              name="technician_description"
              placeholder="Escribe aquí la descripción del perfil"
              value={formik.values.technician_description ?? ""}
              onChange={formik.handleChange}
              maxLength={maxChars}
            />

            <h3
              className={`${
                formik.values.technician_description &&
                formik.values.technician_description.length === 200
                  ? styles.exceeded
                  : ""
              } ${styles.number_total}`}
            >
              {formik.values.technician_description &&
                formik.values.technician_description.length === 200 && (
                  <p className={styles.warning_message}>
                    Se ha llegado al límite de caracteres.
                  </p>
                )}
              {formik.values.technician_description
                ? formik.values.technician_description.length
                : "0"}
              /{maxChars}
            </h3>
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
              {title} técnico{" "}
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

export default AddTechnician;
