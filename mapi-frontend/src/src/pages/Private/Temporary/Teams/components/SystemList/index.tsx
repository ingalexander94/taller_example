import {
  ChangeEvent,
  useRef,
  useState,
  MouseEvent,
  useEffect,
  useContext,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import SystemTable from "../SystemTable";
import { Component } from "src/interfaces";
import { useAxios } from "src/hooks";
import { ComponentService } from "src/services";
import { TemporaryContext } from "src/context";
import AddComponentModal from "../AddComponentModal";
import errorIcon from "src/assets/icons/error.svg";
import searchIcon from "src/assets/icons/search.svg";
import arrowIcon from "src/assets/icons/arrow.svg";
import plusIcon from "src/assets/icons/plus-icon.svg";
import infoIcon from "src/assets/icons/info-outline.svg";
import mechanic from "src/assets/Background_mechanic 2.svg";
import styles from "./systemlist.module.css";

const SystemList = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { callEndpoint } = useAxios();
  const [show, setShow] = useState<boolean>(false);

  const {
    temporaryState,
    setComponentActive,
    setSearch,
    setShowEmpty,
    setComponents,
  } = useContext(TemporaryContext);

  const debouncedSearchByCode = useRef(
    debounce(async (code: string) => {
      setSearch(code);
    }, 1000)
  );

  useEffect(() => {
    const getComponents = async () => {
      if (temporaryState.teamActive) {
        setLoading(true);
        const res = await callEndpoint(
          ComponentService.all(temporaryState.teamActive.id_team)
        );
        if (res) {
          const { data } = res.data;
          setComponents(data);
          if (data.length) {
            setComponentActive(data[0]);
          }
        }
        setLoading(false);
      }
    };

    getComponents();
    return () => {
      debouncedSearchByCode.current.cancel();
    };
  }, [temporaryState.teamActive]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    debouncedSearchByCode.current(e.target.value);
  };

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (code.length) {
      setCode("");
      setSearch("");
      setShowEmpty(false);
    }
  };

  const handleMoveSlider = (left: number) => {
    tagsRef.current?.scrollBy({
      top: 0,
      behavior: "smooth",
      left: left,
    });
  };

  const handleActiveComponent = (component: Component) => {
    navigate(location.pathname);
    setComponentActive(component);
  };

  return (
    <>
      <section className={styles.list_system}>
        {!loading && (
          <aside className={styles.empty}>
            <h3>¡Aún no tienes componentes agregados para este equipo!</h3>
            <p>
              Antes de continuar por favor agrega los componentes de este
              equipo. No esperes más para aprovechar todas las ventajas que
              nuestra plataforma tiene para ofrecerte.
            </p>
            <button onClick={() => setShow(true)} className="btn_black">
              <img src={plusIcon} alt="Plus icon" />
              Agregar componente
            </button>
            <img src={mechanic} alt="Mechanic image" />
          </aside>
        )}

        {temporaryState.components.length > 0 && (
          <>
            <div className={styles.info_system}>
              <div>
                <input type="checkbox" name="info" id="show_info" />
                <label htmlFor="show_info">
                  <img src={infoIcon} alt="Info icon" />
                </label>
                <ul>
                  <li>
                    <strong>Aplicación:</strong>{" "}
                    {temporaryState.modelActive?.model_application}
                  </li>
                  <li>
                    <strong>Años:</strong>{" "}
                    {temporaryState.modelActive?.model_init_year}-
                    {temporaryState.modelActive?.model_final_year}
                  </li>
                  <li>
                    <strong>Motor:</strong>{" "}
                    {temporaryState.modelActive?.model_engine}
                  </li>
                  <li>
                    <strong>Puente trasero:</strong>{" "}
                    {temporaryState.modelActive?.model_rear_bridge}
                  </li>
                  <li>
                    <strong>Transmisión:</strong>{" "}
                    {temporaryState.modelActive?.model_transmission}
                  </li>
                </ul>
                ({temporaryState.modelActive?.model_code}) -{" "}
                {temporaryState.modelActive?.model_name} -{" "}
                {temporaryState.modelActive?.model_application}
              </div>
              <div className={styles.system_search}>
                <input
                  ref={inputRef}
                  type="text"
                  value={code}
                  onChange={handleChange}
                  placeholder="Buscar operación por código"
                />
                <button
                  onClick={handleReset}
                  className={`${styles.search_icon} ${
                    code.length ? styles.active : ""
                  }`}
                >
                  <img
                    src={code.length ? errorIcon : searchIcon}
                    alt="Error icon"
                  />
                </button>
              </div>
            </div>
            <div className={styles.system_actions}>
              <div
                className={`${styles.list_components} ${styles.list_components_buttons}`}
              >
                <button onClick={() => handleMoveSlider(-100)}>
                  <img src={arrowIcon} alt="Arrow icon" />
                </button>
                <ul ref={tagsRef}>
                  {temporaryState.components.map((component, index) => (
                    <li
                      key={index}
                      className={`animate__animated animate__fadeInLeft animate__faster ${
                        temporaryState.componentActive?.id_component ===
                        component.id_component
                          ? styles.active
                          : ""
                      }`}
                      onClick={() => handleActiveComponent(component)}
                    >
                      {component.component_name}
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleMoveSlider(+100)}>
                  <img src={arrowIcon} alt="Arrow icon" />
                </button>
              </div>
              <button onClick={() => setShow(true)} className="btn_black">
                <img src={plusIcon} alt="Plus icon" />
                Agregar componente
              </button>
            </div>
            <SystemTable handleReset={handleReset} />
          </>
        )}
      </section>
      {show && <AddComponentModal closeModal={() => setShow(false)} />}
    </>
  );
};

export default SystemList;
