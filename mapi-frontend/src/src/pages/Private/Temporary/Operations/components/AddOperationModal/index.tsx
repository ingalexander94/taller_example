import {
  useEffect,
  useState,
  ChangeEvent,
  useRef,
  useContext,
  Fragment,
} from "react";
import { useFormik } from "formik";
import { debounce } from "lodash";
import { OperationValidatorForm } from "src/validators";
import { useAxios } from "src/hooks";
import { OperationService } from "src/services";
import {
  MaintenanceType,
  Team,
  TechnicianOperation,
  ComponentOperation,
  ModelOperation,
  Operation,
} from "src/interfaces";
import { Alerts } from "src/lib";
import { TemporaryContext } from "src/context";
import errorIcon from "src/assets/icons/error.svg";
import styles from "./addmodal.module.css";

type Props = {
  closeModal: () => void;
  title: string;
  operation?: Operation | null;
};

const AddOperationModal = ({ closeModal, title, operation }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const isInitialized = useRef<boolean>(false);
  const selectRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [componentText, setComponentText] =
    useState<string>("Selecciona un tipo");
  const { callEndpoint } = useAxios();
  const [teams, setTeams] = useState<Team[]>([]);
  const [maintenanceTypes, setMaintenanceTypes] = useState<MaintenanceType[]>(
    []
  );
  const [technicians, setTechnicians] = useState<TechnicianOperation[]>([]);
  const [components, setComponents] = useState<ComponentOperation[]>([]);
  const [options, setOptions] = useState<ModelOperation[]>([]);

  const { setOperations, temporaryState, setTotalPagesOperation } =
    useContext(TemporaryContext);

  const getOperations = async () => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("page") ?? "1") ?? 1;
    const res = await callEndpoint(OperationService.getOperationsByPage(page));
    if (res) {
      const { data } = res.data;
      setTotalPagesOperation(data.totalPages);
      if (temporaryState.operations.length < 10) {
        setOperations(data.operations);
      }
    }
  };

  const formik = useFormik({
    initialValues: operation ?? OperationValidatorForm.initialState,
    validationSchema: OperationValidatorForm.validatorSchemaOperation,
    validateOnMount: false,
    onSubmit: async (values) => {
      if (formik.isValid) {
        setLoading(true);
        values = {
          ...values,
          operation_duration_hours: values.operation_duration_hours || 0,
          operation_duration_minutes: values.operation_duration_minutes || 0,
        };
        const res = await callEndpoint(OperationService.saveOperation(values));
        if (res) {
          const { status } = res.data;
          if (status) {
            await getOperations();
            Alerts.showToast(
              "success",
              `Operación ${!operation ? "creada" : "actualizada"} exitosamente`
            );
          }
          closeModal();
        }
      }
    },
  });

  const debouncedSearchModel = useRef(
    debounce(async (dataFormik: Operation, model_code: string) => {
      setOptions([]);
      if (model_code) {
        const res = await callEndpoint(
          OperationService.getModelsByIdTeam(
            dataFormik.operation_team.toString(),
            model_code
          )
        );
        if (res) {
          const data: ModelOperation[] = res.data.data;
          if (data.length) {
            const modelsUniques: ModelOperation[] = [];
            data.forEach(function (obj2) {
              var isUnique = true;
              dataFormik.operation_models.forEach(function (obj1) {
                if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
                  isUnique = false;
                }
              });
              if (isUnique) {
                modelsUniques.push(obj2);
              }
            });
            setOptions(modelsUniques);
          }
        }
      }
    }, 500)
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (!isInitialized.current) {
      isInitialized.current = true;

      if (
        formik.values.operation_maintenance_type === null ||
        formik.values.operation_maintenance_type > 2
      ) {
        setDisabled(true);
      }

      const getModalInfo = async () => {
        setLoading(true);
        const res = await callEndpoint(OperationService.getModalData());
        if (res) {
          const { data } = res.data;
          setTeams(data.teams);
          setMaintenanceTypes(data.maintenances);
          setTechnicians(data.technicians);
          if (operation) {
            const res2 = await callEndpoint(
              OperationService.getComponentsByIdTeam(
                operation.operation_team.toString()
              )
            );
            if (res2) {
              const { data } = res2.data;
              setComponents(data);
              setComponentText(operation.system!);
            }
          }
        }
        setLoading(false);
      };

      getModalInfo();
    }

    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearchModel.current.cancel();
    };
  }, []);

  const [charCount, setCharCount] = useState<number>(0);
  const maxChars = 200;

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    formik.setFieldValue("operation_description", value);
    setCharCount(value.length);
  };

  const handleSalaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    value = value.length ? value : "";
    formik.setFieldValue("operation_total", value ?? null);
  };

  const handleChangeKilometers = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    value = value.length ? value : "";
    formik.setFieldValue("operation_kilometres", value ?? null);
  };

  const handleChangeHours = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    value = value.length ? value : "";
    formik.setFieldValue("operation_hours", value ?? null);
  };

  const handleChangeTeam = async (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    formik.setFieldValue("operation_team", value);
    formik.setFieldValue("operation_models", []);
    setComponents([]);
    setOptions([]);
    const res = await callEndpoint(
      OperationService.getComponentsByIdTeam(value)
    );
    if (res) {
      const { data } = res.data;
      setComponents(data);
    }
  };

  const handleAddModel = (model: ModelOperation) => {
    const aux = formik.values.operation_models;
    aux.push(model);
    formik.setFieldValue("operation_models", aux);
    if (searchRef.current) {
      searchRef.current.value = "";
      setOptions([]);
      searchRef.current.focus();
    }
  };

  const handleRemoveModel = (index: number) => {
    const aux = formik.values.operation_models;
    aux.splice(index, 1);
    formik.setFieldValue("operation_models", aux);
    formik.validateForm();
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  const handleChangeMaintenanceType = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    formik.setFieldValue("operation_maintenance_type", value);
    if (parseInt(value) === 0 || parseInt(value) > 2) {
      setDisabled(true);
      formik.setFieldValue("operation_kilometres", null);
      formik.setFieldValue("operation_hours", null);
    } else {
      setDisabled(false);
      if (operation) {
        formik.setFieldValue(
          "operation_kilometres",
          operation.operation_kilometres
        );
        formik.setFieldValue("operation_hours", operation.operation_hours);
      }
    }
  };

  const handleChangeSearchModel = (
    event: ChangeEvent<HTMLInputElement>,
    dataFormik: Operation
  ) => {
    const { value } = event.target;
    debouncedSearchModel.current(dataFormik, value);
  };

  const handleChangeMinutes = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    formik.setFieldValue("operation_duration_minutes", value);
    if (parseFloat(value) > 0) {
      formik.setFieldValue(
        "operation_duration_hours",
        (parseFloat(value) / 60).toFixed(1).replace(/\.0$/, "")
      );
    } else {
      formik.setFieldValue("operation_duration_hours", 0);
    }
  };

  const handleChangeHour = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formik.setFieldValue("operation_duration_hours", value);
    if (parseFloat(value) > 0) {
      formik.setFieldValue(
        "operation_duration_minutes",
        parseFloat(value) * 60
      );
    } else {
      formik.setFieldValue("operation_duration_minutes", 0);
    }
  };

  const handleSetComponent = (
    e: ChangeEvent<HTMLInputElement>,
    text: string
  ) => {
    formik.handleChange(e);
    setComponentText(text);
    if (selectRef.current) {
      selectRef.current.checked = false;
    }
  };

  return (
    <article
      ref={modalRef}
      className={`animate__animated animate__fadeIn animate__faster ${styles.container_modal}`}
    >
      <div className={styles.modal}>
        <h2>{title} operación </h2>
        <hr className={styles.line_body} />
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <div className={styles.formColumn}>
              <label htmlFor="team">
                Seleccionar equipo <span>*</span>
              </label>
              <select
                id="team"
                disabled={loading}
                name="operation_team"
                className={`${styles.select} ${
                  formik.touched.operation_team && formik.errors.operation_team
                    ? "invalid"
                    : ""
                }`}
                value={formik.values.operation_team ?? ""}
                onBlur={formik.handleBlur}
                onChange={handleChangeTeam}
              >
                <option value={0}>Selecciona un tipo</option>
                {teams.length &&
                  teams.map(({ id_team, team_name }) => (
                    <option key={id_team} value={id_team}>
                      {team_name}
                    </option>
                  ))}
              </select>
              <span>
                {formik.touched.operation_team && formik.errors.operation_team
                  ? `${formik.errors.operation_team}`
                  : ""}
              </span>
            </div>
            <div className={styles.formColumn}>
              <label htmlFor="component">
                Seleccionar componente <span>*</span>
              </label>
              <label
                className={`${styles.select} ${
                  loading || !components.length ? styles.disabled : ""
                }`}
                htmlFor="select_component"
              >
                {componentText}
              </label>
              <input type="checkbox" ref={selectRef} id="select_component" />
              <ul>
                {components.map((component, i) => (
                  <Fragment key={i}>
                    {component.hasSystems && (
                      <span>
                        {component.component_code}. {component.component_name}
                      </span>
                    )}
                    {component.systems.length > 0 && (
                      <div>
                        {component.systems.map((system) => (
                          <li key={system.id_system}>
                            <label htmlFor={`system${system.id_system}`}>
                              <input
                                type="radio"
                                name="operation_component"
                                id={`system${system.id_system}`}
                                checked={
                                  formik.values.operation_component ===
                                  `S-${system.id_system}`
                                }
                                disabled={loading}
                                value={`S-${system.id_system}`}
                                onChange={(e) =>
                                  handleSetComponent(
                                    e,
                                    `(${system.system_code}) ${system.system_name}`
                                  )
                                }
                              />
                              <div></div>({system.system_code}){" "}
                              {system.system_name}
                            </label>
                          </li>
                        ))}
                      </div>
                    )}
                    {!component.hasSystems && (
                      <li>
                        <label htmlFor={`component${i}`}>
                          <input
                            type="radio"
                            name="operation_component"
                            id={`component${i}`}
                            checked={
                              formik.values.operation_component ===
                              `C-${component.id_component}`
                            }
                            disabled={loading || !components.length}
                            value={`C-${component.id_component}`}
                            onChange={(e) =>
                              handleSetComponent(
                                e,
                                `(${component.component_code}) ${component.component_name}`
                              )
                            }
                          />
                          <div></div>({component.component_code}){" "}
                          {component.component_name}
                        </label>
                      </li>
                    )}
                  </Fragment>
                ))}
              </ul>
              <span>
                {formik.errors.operation_component
                  ? `${formik.errors.operation_component}`
                  : ""}
              </span>
            </div>
            <div className={styles.formColumn}>
              <label htmlFor="measure">
                Medir por <span>*</span>
              </label>
              <select
                id="measure"
                name="operation_measure"
                disabled={loading}
                value={formik.values.operation_measure}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={`${styles.select} ${
                  formik.touched.operation_measure &&
                  formik.errors.operation_measure
                    ? "invalid"
                    : ""
                }`}
              >
                <option value={0}>Selecciona una medida</option>
                <option value={1}>Horas</option>
                <option value={2}>Kilometros</option>
              </select>
              <span>
                {formik.touched.operation_measure &&
                formik.errors.operation_measure
                  ? `${formik.errors.operation_measure}`
                  : ""}
              </span>
            </div>
          </div>
          <div className={styles.formColumn}>
            <label htmlFor="description">
              Descripción de la operación <span>*</span>
            </label>
            <div>
              <textarea
                className={`${styles.textarea} ${
                  formik.touched.operation_description &&
                  formik.errors.operation_description
                    ? "invalid"
                    : ""
                }`}
                id="description"
                disabled={loading}
                name="operation_description"
                placeholder="Escribe aquí la descripción de la operación"
                onChange={handleDescriptionChange}
                maxLength={maxChars}
                value={formik.values.operation_description ?? ""}
                onBlur={formik.handleBlur}
              />
              <h3 className={styles.number_total}>
                {charCount}/{maxChars}
              </h3>
            </div>
            <span>
              {formik.touched.operation_description &&
              formik.errors.operation_description
                ? `${formik.errors.operation_description}`
                : ""}
            </span>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.formColumn}>
              <label htmlFor="technician">Asignación tipo de técnico</label>
              <select
                id="technician"
                name="operation_technician"
                disabled={loading}
                value={formik.values.operation_technician ?? ""}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={styles.select}
              >
                <option value={0}>Selecciona un tipo</option>
                {technicians.length &&
                  technicians.map(
                    (
                      { id_technician, technician_code, technician_name },
                      index
                    ) => (
                      <option key={index} value={id_technician}>
                        {technician_code}. {technician_name}
                      </option>
                    )
                  )}
              </select>
            </div>
            <div className={`${styles.formColumn} ${styles.timer}`}>
              <label htmlFor="duration">Tiempo de mano de obra</label>
              <div>
                <div>
                  <input
                    placeholder="0"
                    type="number"
                    id="operation_duration_minutes"
                    title="Minutos"
                    disabled={loading}
                    name="operation_duration_minutes"
                    value={formik.values.operation_duration_minutes ?? ""}
                    onBlur={formik.handleBlur}
                    onChange={handleChangeMinutes}
                    className={styles.input}
                  />
                  <span>min</span>
                </div>
                <div>
                  <input
                    placeholder="0"
                    type="number"
                    id="operation_duration_hours"
                    title="Horas"
                    disabled={loading}
                    name="operation_duration_hours"
                    value={formik.values.operation_duration_hours ?? ""}
                    onBlur={formik.handleBlur}
                    onChange={handleChangeHour}
                    className={styles.input}
                  />
                  <span>hor</span>
                </div>
              </div>
            </div>
            <div className={styles.formColumn}>
              <label htmlFor="total">Total de mano de obra</label>
              <input
                placeholder="$0"
                type="text"
                disabled={loading}
                onChange={handleSalaryChange}
                value={formik.values.operation_total ?? ""}
                onBlur={formik.handleBlur}
                id="total"
                name="operation_total"
                className={`${styles.input} ${styles.text_right}`}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.formColumn}>
              <label htmlFor="maintenance_type">Tipo de mantenimiento</label>
              <select
                id="maintenance_type"
                name="operation_maintenance_type"
                className={styles.select}
                disabled={loading}
                value={formik.values.operation_maintenance_type ?? ""}
                onBlur={formik.handleBlur}
                onChange={handleChangeMaintenanceType}
              >
                <option value={0}>Selecciona un tipo</option>
                {maintenanceTypes.length &&
                  maintenanceTypes.map(
                    ({ id_maintenance_type, maintenance_type_name }, i) => (
                      <option key={i} value={id_maintenance_type}>
                        {maintenance_type_name}
                      </option>
                    )
                  )}
              </select>
            </div>
            <div className={styles.formColumn}>
              <label htmlFor="kilometres">Kilómetros recomendados</label>
              <input
                placeholder="Escribe aqui los kilómetros"
                type="number"
                id="kilometres"
                disabled={loading || disabled}
                name="operation_kilometres"
                value={formik.values.operation_kilometres ?? ""}
                onBlur={formik.handleBlur}
                onChange={handleChangeKilometers}
                className={styles.input}
              />
            </div>
            <div className={styles.formColumn}>
              <label htmlFor="hours">Horas recomendadas</label>
              <input
                placeholder="Escribe aqui las horas"
                type="number"
                disabled={loading || disabled}
                onChange={handleChangeHours}
                value={formik.values.operation_hours ?? ""}
                onBlur={formik.handleBlur}
                id="hours"
                name="operation_hours"
                className={styles.input}
              />
            </div>
          </div>

          <label htmlFor="models">Agregar modelos</label>
          <div id="models" className={styles.wrapper_models}>
            {formik.values.operation_models.length ? (
              formik.values.operation_models.map(({ model_code }, i) => (
                <div
                  key={i}
                  className={`animate__animated animate__fadeIn animate__faster ${styles.item_model}`}
                >
                  <span>{model_code}</span>
                  <button onClick={() => handleRemoveModel(i)} type="button">
                    <img src={errorIcon} alt="Delete icon" />
                  </button>
                </div>
              ))
            ) : (
              <></>
            )}
            <div className={styles.model_options}>
              <input
                disabled={
                  loading || formik.values.operation_team.toString() === "0"
                }
                ref={searchRef}
                type="text"
                placeholder="Buscar..."
                onChange={(e) => handleChangeSearchModel(e, formik.values)}
              />
              {options.length ? (
                <ul className="animate__animated animate__fadeIn animate__faster">
                  {options.map((model, i) => (
                    <li onClick={() => handleAddModel(model)} key={i}>
                      {model.model_code}
                    </li>
                  ))}
                </ul>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={styles.formButtons}>
            <button
              type="button"
              className="btn_secondary"
              onClick={() => {
                if (modalRef.current) {
                  modalRef.current.classList.add("animate__fadeOut");
                }
                setTimeout(() => {
                  closeModal();
                }, 500);
              }}
            >
              Cancelar
            </button>
            <button
              disabled={
                loading || (!operation && !formik.dirty) || !formik.isValid
              }
              type="submit"
              className={styles.btn_keep}
            >
              Guardar actualización
            </button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default AddOperationModal;
