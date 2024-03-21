import { useContext, useEffect, useRef, useState } from "react";
import AdditionalParameters from "./components/AdditionalParameters";
import ContentCart from "./components/ContentCart";
import EngineInformation from "./components/EngineInformation";
import CharacteristicsEquipment from "./components/EquipmentCharacteristics";
import styles from "./save.module.css";
import arrow from "src/assets/icons/arrow-left.svg";
import arrowRight from "src/assets/icons/arrow-right.svg";
import { useFormik } from "formik";
import { EquipmentValidatorForm } from "src/validators";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAxios } from "src/hooks";
import { EquipmentService } from "src/services";
import { UIContext } from "src/context";
import { privateRoutes } from "src/models";

const Save = () => {
  const [params, _] = useSearchParams();
  const id = params.get("id") || 0;
  const navigate = useNavigate();
  const isInitialized = useRef<boolean>(false);
  const { callEndpoint } = useAxios();
  const [activeComponent, setActiveComponent] = useState<number>(0);
  const { toggleCheking } = useContext(UIContext);

  const handleSetActiveComponent = (index: number) => {
    setActiveComponent(index);
  };

  const formik = useFormik({
    initialValues: EquipmentValidatorForm.initialState,
    validationSchema: EquipmentValidatorForm.validatorSchemaOperation,
    validateOnMount: false,
    onSubmit: async (values) => {
      if (formik.isValid) {
        toggleCheking();
        const res = await callEndpoint(EquipmentService.save(values));
        if (res && res.status === 201) {
          if (values.files.length) {
            const formdata = new FormData();
            Array.from(values.files).forEach((file: File) => {
              formdata.append("file", file);
            });
            const { data } = res.data;
            await callEndpoint(
              EquipmentService.uploadPhotos(data.id_user_team, formdata)
            );
          }
          navigate(`/${privateRoutes.CLIENT}/${privateRoutes.EQUIPMENT}`);
        }
        toggleCheking();
      }
    },
  });

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      const getSaveData = async () => {
        toggleCheking();
        const res = await callEndpoint(
          EquipmentService.getSaveData(id.toString())
        );
        if (res) {
          const { data } = res.data;
          formik.setValues(data);
        }
        toggleCheking();
      };
      getSaveData();
    }
    return () => {};
  }, []);

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        className={styles.edit_equipment}
      >
        <div>
          <ContentCart formik={formik} id_user_team={id.toString()} />
        </div>
        <div className={styles.content_right}>
          <div className={styles.list}>
            <ul>
              <li
                className={activeComponent === 0 ? styles.active : ""}
                onClick={() => handleSetActiveComponent(0)}
              >
                <strong>1</strong>Características del equipo
              </li>
              <li
                className={activeComponent === 1 ? styles.active : ""}
                onClick={() => handleSetActiveComponent(1)}
              >
                <strong>2</strong>Información del motor
              </li>
              <li
                className={activeComponent === 2 ? styles.active : ""}
                onClick={() => handleSetActiveComponent(2)}
              >
                <strong>3</strong>Parámetros adicionales
              </li>
            </ul>
            <CharacteristicsEquipment
              isHidden={activeComponent !== 0}
              formik={formik}
            />
            <EngineInformation
              formik={formik}
              isHidden={activeComponent !== 1}
            />
            <AdditionalParameters
              formik={formik}
              isHidden={activeComponent !== 2}
            />
          </div>

          <div className={styles.content_button}>
            <div className={styles.prev_next}>
              <button
                type="button"
                onClick={() =>
                  setActiveComponent((prev) => Math.max(0, prev - 1))
                }
                className={activeComponent === 0 ? styles.hide : ""}
              >
                <img src={arrow} alt="icon" />
                Anterior
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveComponent((prev) => Math.min(2, prev + 1))
                }
                className={activeComponent === 2 ? styles.hide : ""}
              >
                Siguiente
                <img src={arrowRight} alt="icon" />
              </button>
            </div>
            <div className={styles.btn_save}>
              <button disabled={!formik.dirty || !formik.isValid} type="submit">
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Save;
