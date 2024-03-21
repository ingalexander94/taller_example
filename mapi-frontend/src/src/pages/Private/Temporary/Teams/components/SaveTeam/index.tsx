import { useFormik } from "formik";
import styles from "./savemodal.module.css";
import { TeamValidatorForm } from "src/validators";
import { useContext, useEffect, useRef, useState } from "react";
import { TemporaryContext } from "src/context";
import { useAxios } from "src/hooks";
import { useNavigate } from "react-router-dom";
import { TeamService } from "src/services";
import alertIcon from "src/assets/alert.svg";

type Props = {
  closeModal: () => void;
};

const SaveTeam = ({ closeModal }: Props) => {
  const saveModalRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef<boolean>(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { temporaryState, setTeamSave } = useContext(TemporaryContext);
  const { callEndpoint } = useAxios();

  const formik = useFormik({
    initialValues: TeamValidatorForm.initialState,
    validationSchema: TeamValidatorForm.validatorSchemaTeam,
    validateOnMount: false,
    onSubmit: async (values) => {
      if (formik.isValid) {
        setLoading(true);
        if (temporaryState.teamSave?.team_name !== values.team_name) {
          const res = await callEndpoint(TeamService.save(values));
          if (res) {
            const { data } = res?.data;
            if (data.is_new) {
              navigate(`editar/${data.team.id_team}`);
            } else {
              setTeamSave(data.team);
            }
          }
        }
        setLoading(false);
        handleCancel();
      }
    },
  });

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      formik.setFieldValue("id_team", temporaryState.teamSave!.id_team);
      formik.setFieldValue("team_name", temporaryState.teamSave!.team_name);
    }
  }, []);

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
      ref={saveModalRef}
      className={`animate__animated animate__fadeIn animate__faster ${styles.save_modal}`}
    >
      <div onClick={handleCancel}></div>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <img src={alertIcon} alt="Alert icon" />
        <h3>
          Esta a punto de{" "}
          {temporaryState.teamSave!.id_team === 0 ? "crear" : "actualizar"} un
          equipo
        </h3>
        {temporaryState.teamSave!.id_team === 0 && (
          <p>
            Recuerda que en este caso se va a generar un tempario que debes
            alimentar desde 0, debes agregarle los módelos y sus componentes por
            aparte
          </p>
        )}
        <fieldset>
          <input
            name="team_name"
            id="team_name"
            value={formik.values.team_name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            autoFocus
            placeholder="Asigna un nombre al equipo"
          />
          <p>
            {formik.touched.team_name && formik.errors.team_name
              ? `* ${formik.errors.team_name}`
              : ""}
          </p>
        </fieldset>
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
            {temporaryState.teamSave!.id_team === 0 ? "Crear " : "Guardar "}
            equipo
          </button>
        </div>
      </form>
    </div>
  );
};

export default SaveTeam;
