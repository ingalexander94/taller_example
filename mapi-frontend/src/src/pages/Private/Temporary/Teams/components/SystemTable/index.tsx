import { MouseEvent, useContext, useEffect, useState } from "react";
import Pagination from "src/components/UI/Pagination";
import { Operation, SystemFilter } from "src/interfaces";
import { TemporaryContext } from "src/context";
import { useAxios } from "src/hooks";
import { OperationService } from "src/services";
import filterBlackIcon from "src/assets/icons/filter-black.svg";
import kilometres from "src/assets/icons/kilometres.svg";
import hours from "src/assets/icons/time.svg";
import styles from "./systemtable.module.css";
import { formatCurrency } from "src/utilities";
import { Link } from "react-router-dom";
import { privateRoutes, temporaryRoutes } from "src/models";
import EmptyList from "src/components/EmptyList";

type Props = {
  handleReset: (e: MouseEvent<HTMLButtonElement>) => void;
};

const SystemTable = ({ handleReset }: Props) => {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [checkedAll, setCheckedAll] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const {
    temporaryState,
    setSystems,
    activeSystem,
    activeAllSystem,
    setShowEmpty,
  } = useContext(TemporaryContext);
  const { callEndpoint } = useAxios();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page") ?? "1") ?? 1;

  useEffect(() => {
    if (temporaryState.componentActive) {
      getOperations(page);
    }
    return () => {};
  }, [page, temporaryState.modelActive, temporaryState.componentActive]);

  useEffect(() => {
    if (temporaryState.search.length) {
      searchOperationByCode();
    } else {
      const queryParams = new URLSearchParams(location.search);
      const page = parseInt(queryParams.get("page") ?? "1") ?? 1;
      getOperations(page);
    }
    return () => {};
  }, [temporaryState.search]);

  const searchOperationByCode = async () => {
    if (temporaryState.teamActive) {
      setLoading(true);
      const res = await callEndpoint(
        OperationService.searchByCode(
          temporaryState.search,
          temporaryState.teamActive?.id_team
        )
      );
      if (res) {
        const { data } = res.data;
        if (data.length) {
          setOperations(data);
          setShowEmpty(false);
        } else {
          setShowEmpty(true);
        }
        setTotalPages(0);
      }
      setLoading(false);
    }
  };

  const getOperations = async (
    currentPage: number = 1,
    querySystem: string = "all",
    isSystem: boolean = false
  ) => {
    setLoading(true);
    if (temporaryState.modelActive) {
      const res = await callEndpoint(
        OperationService.getOperationFilterByPage(
          temporaryState.modelActive?.id_model,
          temporaryState.componentActive?.id_component ?? 0,
          currentPage,
          querySystem
        )
      );
      if (res) {
        const { data } = res.data;  
        if (!isSystem || data.operations.length) {
          setOperations(data.operations);
          setTotalPages(data.totalPages);
          setSystems(data.systems);
          setCheckedAll(data.checkAll);
          setShowEmpty(false);
        } else {
          if (isSystem) {
            if (!data.operations.length) {
              setShowEmpty(true);
            } else {
              setShowEmpty(false);
              setOperations(data.operations);
              setTotalPages(data.totalPages);
              setSystems(data.systems);
              setCheckedAll(data.checkAll);
            }
          }
        }
      }
    } else {
      setOperations([]);
      setTotalPages(0);
      setSystems([]);
    }
    setLoading(false);
  };

  const handleChangeAll = () => {
    activeAllSystem(!checkedAll);
    setCheckedAll(!checkedAll);
  };

  const handleChangeSystem = (system: SystemFilter) => {
    if (system.isActive) {
      setCheckedAll(false);
    } else {
      let count = 0;
      temporaryState.systems.forEach(({ isActive }) => {
        if (!isActive) {
          count++;
        }
      });
      setCheckedAll(count === 1);
    }
    activeSystem(system.id_system);
  };

  const filterBySystems = (systems: SystemFilter[]) => {
    let active: SystemFilter[] = [];
    if (!checkedAll) {
      active = systems.filter((system) => system.isActive);
    }
    if (checkedAll || active.length) {
      let query = "all";
      if (!checkedAll) {
        query = active.map(({ id_system }) => id_system).join(",");
      }
      getOperations(page, query, true);
    }
  };

  return (
    <div className={styles.table_system}>
      {operations.length > 0 && (
        <div className={styles.table_header}>
          <ul>
            <li className={styles.system_filter}>
              {temporaryState.systems.length ? (
                <label htmlFor="filter_system">
                  <p className={styles.text_primary}>
                    <img src={filterBlackIcon} alt="filter icon" /> Sistema
                  </p>
                </label>
              ) : (
                "Componente"
              )}
              <input type="checkbox" id="filter_system" />
              <ul>
                <li>
                  <label htmlFor="system1">
                    <input
                      type="checkbox"
                      checked={checkedAll}
                      onChange={handleChangeAll}
                      name="system"
                      id="system1"
                    />
                    Seleccionar Todo
                    <div></div>
                  </label>
                </li>
                {temporaryState.systems.map((system) => (
                  <li key={system.id_system}>
                    <label htmlFor={`system${system.id_system}`}>
                      <input
                        type="checkbox"
                        checked={system.isActive}
                        name="system"
                        onChange={() => handleChangeSystem(system)}
                        id={`system${system.id_system}`}
                      />
                      {system.system_code} {system.system_name}
                      <div></div>
                    </label>
                  </li>
                ))}
                <label
                  onClick={() => filterBySystems(temporaryState.systems)}
                  className={styles.accept}
                  htmlFor="filter_system"
                >
                  OK
                </label>
              </ul>
            </li>
            <li>Cód.</li>
            <li>Descripción de operación</li>
            <li>
              <img src={filterBlackIcon} alt="Filter icon" /> Tipo de
              mantenimiento
            </li>
            <li>Valor</li>
          </ul>
        </div>
      )}
      <div className={styles.table_content}>
        {!loading && (
          <section>
            <h3>¡Este componente aún no tiene operaciones asignadas!</h3>
            <p>
              En esta pantalla encontrarás la estructura de todas las
              operaciones agregadas al modelo OEM y el componente seleccionado.
              Ahora puedes agregar tu primera operación desde la pestaña de la
              matriz de operaciones.
            </p>
            <Link
              className="btn_black"
              to={`/${privateRoutes.PRIVATE}/${privateRoutes.TEMPORARY}/${temporaryRoutes.OPERATIONS}`}
            >
              Ir a Matriz de operaciones
            </Link>
          </section>
        )}

        {temporaryState.showEmpty && <EmptyList handleReset={handleReset} />}

        {!temporaryState.showEmpty &&
          operations.map((operation, index) => (
            <div
              key={index}
              className={`animate__animated animate__fadeIn animate__faster ${styles.table_item}`}
            >
              <input type="checkbox" id={`system${index}`} />
              <label htmlFor={`system${index}`}>
                <ul>
                  <li>
                    <figure>
                      <img
                        className={
                          operation.operation_measure === 1 ? styles.time : ""
                        }
                        src={
                          operation.operation_measure === 2 ? kilometres : hours
                        }
                        alt="time-icon"
                      />
                      {operation.operation_measure === 2 ? "Km." : "Hr."}
                    </figure>
                    <strong>{operation.system}</strong>
                  </li>
                  <li>
                    <strong>{operation.code}</strong>
                  </li>
                  <li>{operation.operation_description}</li>

                  <li>
                    <strong>
                      {operation.maintenance_type_name ?? "Sin especificar"}
                    </strong>
                  </li>
                  <li className={styles.show}>
                    <p>
                      {operation.operation_total
                        ? formatCurrency(operation.operation_total)
                        : "Sin especificar"}
                    </p>
                    <strong>Ver</strong>
                  </li>
                </ul>
              </label>
              <div>
                <div>
                  <p>
                    <span>Cód. técnico</span>
                    {operation.technician_code ?? "Sin especificar"}
                  </p>
                  <p>
                    <span>Modelo OEM</span>
                    {operation.operation_models.length
                      ? operation.operation_models
                          .reduce(
                            (acc, cur) => (acc += `${cur.model_code},`),
                            ""
                          )
                          .slice(0, -1)
                      : "Sin especificar"}
                  </p>
                </div>
                <div>
                  <p>
                    <span>Duración</span>
                    {operation.operation_duration_hours ? (
                      <>
                        <strong>
                          {operation.operation_duration_minutes}
                          (Min.)
                        </strong>
                        {operation.operation_duration_hours}(Hr.)
                      </>
                    ) : (
                      "Sin especificar"
                    )}
                  </p>
                  <p>
                    <span>Intervalo</span>
                    {operation.operation_hours ||
                    operation.operation_kilometres ? (
                      <>
                        {operation.operation_kilometres ?? 0} km <br />{" "}
                        {operation.operation_hours ?? 0} horas
                      </>
                    ) : (
                      "Sin especificar"
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
      {totalPages > 1 && <Pagination last_page={totalPages} />}
    </div>
  );
};

export default SystemTable;
