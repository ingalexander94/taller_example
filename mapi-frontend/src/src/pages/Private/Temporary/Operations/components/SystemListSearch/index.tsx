import {
  ChangeEvent,
  useRef,
  useState,
  MouseEvent,
  useContext,
  useEffect,
} from "react";
import { debounce } from "lodash";
import SystemTablet from "../SystemTablet";
import AddOperationModal from "../AddOperationModal";
import plusIcon from "src/assets/icons/plus-icon.svg";
import errorIcon from "src/assets/icons/error.svg";
import searchIcon from "src/assets/icons/search.svg";
import filterBlackIcon from "src/assets/icons/filter-black.svg";
import styles from "./systemlis.module.css";
import { TemporaryContext, UIContext } from "src/context";
import DownloadExcel from "src/components/DownloadToExcel";
import { useAxios } from "src/hooks";
import { OperationService } from "src/services";

const SistemListSearch = () => {
  const [code, setCode] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const { callEndpoint } = useAxios();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page") ?? "1") ?? 1;

  const { toggleCheking } = useContext(UIContext);
  const {
    setOperations,
    temporaryState,
    setTotalPagesOperation,
    setOrderBy,
    setSearch,
    setShowEmpty,
  } = useContext(TemporaryContext);

  const debouncedValidate = useRef(
    debounce(async (code_search: string) => {
      setSearch(code_search);
    }, 1000)
  );

  useEffect(() => {
    getOperations(page);
    return () => {};
  }, [page, temporaryState.orderBy]);

  useEffect(() => {
    if (temporaryState.showEmpty) {
      setCode("");
      findOperationSearch();
    } else if (temporaryState.search.length) {
      findOperationSearch();
    } else {
      const queryParams = new URLSearchParams(location.search);
      const page = parseInt(queryParams.get("page") ?? "1") ?? 1;
      getOperations(page);
    }
    return () => {};
  }, [temporaryState.search]);

  const findOperationSearch = async () => {
    toggleCheking();
    const res = await callEndpoint(
      OperationService.searchOperation({ code: temporaryState.search, page })
    );
    if (res) {
      const response = res.data;
      setTotalPagesOperation(response.data.totalPages);
      if (response.data.operations.length) {
        setOperations(response.data.operations);
        setShowEmpty(false);
      } else {
        setShowEmpty(true);
      }
    }
    toggleCheking();
  };

  const getOperations = async (currentPage: number) => {
    setLoading(true);
    const res = await callEndpoint(
      OperationService.getOperationsByPage(currentPage, temporaryState.orderBy)
    );
    if (res) {
      const { data } = res.data;
      setOperations(data.operations);
      setTotalPagesOperation(data.totalPages);
    }
    setLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let searchValue = e.target.value;
    setCode(searchValue);
    debouncedValidate.current(searchValue);
  };

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (code.length) {
      setSearch("");
      setCode("");
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleChangeOrderBy = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(event.target.value);
  };

  return (
    <section className={styles.list_system}>
      {!loading && (
        <aside>
          <h3>¡Aún no tiene operaciones creadas!</h3>
          <p>
            En esta pantalla encontrarás la estructura de todas las operaciones
            agregadas para los diferentes equipos agregados desde la pestaña
            clasificación de equipo. Ahora puedes agregar tu primera operación.
          </p>
          <button className="btn_black" onClick={showModal}>
            Agregar operación
          </button>
        </aside>
      )}

      {temporaryState.operations.length > 0 && (
        <>
          <div className={styles.system_actions}>
            <div className={styles.input_search}>
              <p>Matriz de operaciones</p>
              <div className={styles.input_order} title="Ordenar por">
                <img src={filterBlackIcon} alt="Filter icon" />
                <select
                  name="orderBy"
                  onChange={handleChangeOrderBy}
                  id="orderBy"
                  value={temporaryState.orderBy}
                >
                  <option value="ASC">Ascendente</option>
                  <option value="DESC">Descendente</option>
                </select>
              </div>
            </div>
            <div className={styles.list_actions}>
              <button className="btn_black" onClick={showModal}>
                <img src={plusIcon} alt="Plus icon" /> Agregar operación
              </button>
              <DownloadExcel
                title_sheet="Operaciones"
                table_headers={[
                  "ID",
                  "Descripción de operación",
                  "Duración (Minutos)",
                  "Duración (Horas)",
                  "Kilometros",
                  "Horas",
                  "Valor total",
                  "Nombre del tipo de mantenimiento",
                  "Código del técnico",
                  "Sistema",
                  "Código de operación",
                  "Modelos",
                ]}
                service={async () => {
                  const response = await callEndpoint(
                    OperationService.getAllOperations()
                  );
                  if (response) {
                    return response!.data.data.operations;
                  }
                }}
              />
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
          <SystemTablet />
        </>
      )}
      {modalVisible && (
        <AddOperationModal
          title={"Agregar"}
          closeModal={() => setModalVisible(false)}
        />
      )}
    </section>
  );
};

export default SistemListSearch;
