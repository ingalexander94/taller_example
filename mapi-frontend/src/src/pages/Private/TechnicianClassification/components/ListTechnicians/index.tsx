import { useRef, useState, MouseEvent, useContext, useEffect } from "react";
import styles from "./listoftechnician.module.css";
import plusIcon from "src/assets/icons/plus-icon.svg";
import errorIcon from "src/assets/icons/error.svg";
import searchIcon from "src/assets/icons/search.svg";
import AddTechnician from "../AddTechnician";
import ListContentTable from "../ListContent/ListContentTable";
import { debounce } from "lodash";
import { TechnicianService } from "src/services/technician.service";
import { useAxios } from "src/hooks";
import DownloadExcel from "src/components/DownloadToExcel";
import { TechnicianContext } from "src/context/technician/technician.context";
import { useSearchParams } from "react-router-dom";
import { UIContext } from "src/context";

const ListTechnicians = () => {
  const { setTechnicians, technicianState, setShowEmpty, setLastPage } =
    useContext(TechnicianContext);
  const [search, setSearch] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { callEndpoint } = useAxios();
  const [searchParams, setSearchParams] = useSearchParams();
  const current_page = searchParams.get("page") ?? "1";

  const { uiState } = useContext(UIContext);

  const debouncedValidate = useRef(
    debounce(async (searchValue: string) => {
      const res = await callEndpoint(
        TechnicianService.search({ key: searchValue, page: 1 })
      );
      if (res) {
        const { data } = res.data;
        if (data.technician.length) {
          setTechnicians(data.technician);
          setLastPage(data.last_page);
          setShowEmpty(false);
        } else {
          setShowEmpty(true);
        }
      }
    }, 1000)
  );

  useEffect(() => {
    getTechnicians();
    return () => {};
  }, [current_page, uiState.refreshTechnicians]);

  const getTechnicians = async () => {
    setLoading(true);
    const res = await callEndpoint(TechnicianService.getAll(current_page));
    if (res) {
      const { data } = res.data;
      if (
        data.technician.length === 0 &&
        data.current_page > res?.data.last_page
      ) {
        setSearchParams({ page: data.last_page });
      }
      setTechnicians(data.technician);
      setLastPage(data.last_page);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchValue = e.target.value;
    setSearch(searchValue);
    if (searchValue.length > 2) debouncedValidate.current(searchValue);
  };

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    debouncedValidate.current("");
    if (search.length) setSearch("");
  };

  const showModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <section className={styles.list_system}>
        {!loading && (
          <aside>
            <h3>¡Aún no tienes técnicos agregados!</h3>
            <p>
              En esta pantalla encontrarás la estructura de todos los tipos de
              técnicos agregados y una proyección de suelto básico. Estos tipos
              de técnico son necesarios para la asignación de la mano de obra de
              las diferentes operaciones.
            </p>
            <button className="btn_black" onClick={showModal}>
              Agregar técnico
            </button>
          </aside>
        )}

        {technicianState.list_technician.length > 0 && (
          <>
            <div className={styles.system_actions}>
              <div className={styles.input_search}>
                <p>Listado de técnicos</p>
                <input
                  type="text"
                  autoComplete="off"
                  value={search}
                  onChange={handleChange}
                  placeholder="Buscar técnico por nombre ó código"
                />
                <button
                  onClick={handleReset}
                  className={`${styles.search_icon} ${
                    search.length ? styles.active : ""
                  }`}
                >
                  <img
                    src={search.length ? errorIcon : searchIcon}
                    alt="Error icon"
                  />
                </button>
              </div>
              <div className={styles.list_actions}>
                <button className="btn_black" onClick={showModal}>
                  <img src={plusIcon} alt="Plus icon" /> Agregar técnico
                </button>
                <DownloadExcel
                  title_sheet="Técnicos"
                  table_headers={[
                    "ID",
                    "Nombre",
                    "Código",
                    "Descripción",
                    "Educación",
                    "Salario",
                    "Estado",
                    "Creado",
                    "Actualizado",
                  ]}
                  service={async () => {
                    const res: any = await callEndpoint(
                      TechnicianService.getAll("0")
                    );
                    if (res && res.status) {
                      return res.data.data.technician;
                    }
                    return [];
                  }}
                />
              </div>
            </div>
            <ListContentTable handleReset={handleReset} />
          </>
        )}
      </section>
      {modalVisible && (
        <AddTechnician
          title={"Agregar"}
          technicianId={0}
          closeModal={() => setModalVisible(false)}
        />
      )}
    </>
  );
};

export default ListTechnicians;
