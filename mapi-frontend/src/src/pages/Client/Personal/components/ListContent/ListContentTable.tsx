import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAxios } from "src/hooks";
import { privateRoutes } from "src/models";
import { formatCurrency } from "src/utilities";
import { PersonalService } from "src/services";
import { PersonalContext } from "src/context";
import AlertDelete from "../AlertDelete";
import Pagination from "src/components/UI/Pagination";
import editIcon from "src/assets/icons/edit.svg";
import deleteIcon from "src/assets/icons/delete.svg";
import styles from "./listcontenttable.module.css";

const ListContentTable = () => {
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const { callEndpoint } = useAxios();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page") ?? "1") ?? 1;

  const [idPersonal, setIdPersonal] = useState<number>(0);

  const { personalState, setPersonal, setTotalPages } =
    useContext(PersonalContext);

  useEffect(() => {
    getPersonal(page, personalState.search);
    return () => {};
  }, [page, personalState.search]);

  const getPersonal = async (currentPage: number, search: string) => {
    const res = await callEndpoint(PersonalService.getAll(currentPage, search));
    if (res) {
      const { data } = res.data;
      setPersonal(data.personals);
      setTotalPages(data.totalPages);
    }
  };

  const showDelete = (id: number) => {
    setIdPersonal(id);
    setModalDelete(true);
  };

  const closeModal = async () => {
    setModalDelete(false);
    setIdPersonal(0);
    const page = parseInt(queryParams.get("page") ?? "1") ?? 1;
    await getPersonal(page, personalState.search);
  };

  return (
    <div className={styles.table_system}>
      <div className={styles.table_header}>
        <ul>
          <li>Foto</li>
          <li>Nombre</li>
          <li>Número de identidad</li>
          <li>Número de contacto</li>
          <li>Salario base</li>
          <li>Cargo u ocupación</li>
          <li>Acciones</li>
        </ul>
      </div>
      <div className={styles.table_content}>
        <div
          className={`animate__animated animate__fadeIn ${styles.table_item}`}
        >
          <label>
            {personalState.personal.length ? (
              personalState.personal.map((item, i) => {
                return (
                  <ul key={i}>
                    <li>
                      <img src={item.personal_photo} alt="motors icon" />
                    </li>
                    <li>
                      <p>{item.personal_names}</p>
                    </li>
                    <li>
                      <p>{item.personal_document}</p>
                    </li>
                    <li>
                      <p>{item.personal_phone}</p>
                    </li>
                    <li>
                      <p>{formatCurrency(item.personal_salary)}</p>
                    </li>
                    <li>
                      <strong>{item.technician_name}</strong>
                    </li>
                    <div className={styles.buttons}>
                      <Link
                        to={`/${privateRoutes.CLIENT}/${privateRoutes.PERSONAL}/${privateRoutes.SAVEPERSONAL}?id=${item.id_personal}`}
                        className={styles.customer_portal}
                      >
                        <img src={editIcon} alt="edit icon" />
                      </Link>

                      <button onClick={() => showDelete(item.id_personal)}>
                        <img src={deleteIcon} alt="delete icon" />
                      </button>
                    </div>
                  </ul>
                );
              })
            ) : (
              <p>No se encontrarón resultados</p>
            )}
          </label>
        </div>
        {personalState.totalPages > 1 && (
          <Pagination last_page={personalState.totalPages} />
        )}
      </div>
      {modalDelete && (
        <AlertDelete id_personal={idPersonal} closeModal={closeModal} />
      )}
    </div>
  );
};

export default ListContentTable;
