import motorsIcon from "src/assets/icons/Motor.svg";
import editIcon from "src/assets/icons/edit.svg";
import deleteIcon from "src/assets/icons/delete.svg";
import styles from "./listcontenttable.module.css";
import { useState, useContext, MouseEvent } from "react";
import Pagination from "src/components/UI/Pagination";
import AddTechnician from "../AddTechnician";
import AlertDelete from "src/components/AlertDelete";
import { useFetch } from "src/hooks";
import { TechnicianService } from "src/services/technician.service";
import { Technician } from "src/interfaces/technician.interface";
import { useSearchParams } from "react-router-dom";
import { TechnicianContext } from "src/context/technician/technician.context";
import EmptyList from "src/components/EmptyList";

type Props = {
  handleReset: (e: MouseEvent<HTMLButtonElement>) => void;
};

const ListContentTable = ({ handleReset }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [editTechnician, setEditTechnician] = useState<number>(0);
  const { setTechnicians, technicianState } = useContext(TechnicianContext);

  const { callEndpoint } = useFetch();

  const [searchParams, setSearchParams] = useSearchParams();
  const current_page = searchParams.get("page") ?? "1";

  const getTechnicians = async () => {
    const res = await callEndpoint(TechnicianService.getAll(current_page));
    if (
      res?.data.technician.length === 0 &&
      res?.data.current_page > res?.data.last_page
    ) {
      setSearchParams({ page: res?.data.last_page });
    }
    setTechnicians(res.data.technician);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const showDelete = () => {
    setModalDelete(true);
  };

  const formatPrice = (price: string | null) => {
    if (!price) return "Sin definir";
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(parseInt(price));
  };

  return (
    <div className={styles.table_system}>
      <div className={styles.table_header}>
        <ul>
          <li>Nombre</li>
          <li>Código</li>
          <li>Descripción del perfil</li>
          <li>Nivel de educación</li>
          <li>Sueldo básico</li>
        </ul>
      </div>
      <div className={styles.table_content}>
        {technicianState.showEmpty && <EmptyList handleReset={handleReset} />}

        {!technicianState.showEmpty &&
          technicianState.list_technician.map((item: Technician, i) => (
            <div
              key={i}
              onClick={() => setEditTechnician(item.id_technician)}
              className={styles.table_item}
            >
              <input type="checkbox" id={styles.system1} />
              <label htmlFor={styles.system1}>
                <ul>
                  <li>
                    <img
                      src={item.technician_icon ?? motorsIcon}
                      alt="motors icon"
                    />
                    <strong>{item.technician_name}</strong>
                  </li>
                  <li>
                    <strong>{item.technician_code}</strong>
                  </li>
                  <li>
                    <p>{item.technician_description ?? "Sin definir"}</p>
                  </li>
                  <li>
                    <p>{item.technician_education ?? "Sin definir"}</p>
                  </li>
                  <li>
                    <strong>{formatPrice(item.technician_salary)}</strong>
                  </li>
                  <div className={styles.buttons}>
                    <button onClick={showModal} className={styles.btn_edit}>
                      <img src={editIcon} alt="edit icon" />
                    </button>
                    <button
                      onClick={() => {
                        showDelete();
                        setEditTechnician(item.id_technician);
                      }}
                    >
                      <img src={deleteIcon} alt="delete icon" />
                    </button>
                  </div>
                </ul>
              </label>
            </div>
          ))}
      </div>

      {technicianState.last_page > 1 && (
        <Pagination last_page={technicianState.last_page ?? 0} />
      )}

      {modalVisible && (
        <AddTechnician
          title={"Editar"}
          technicianId={editTechnician}
          closeModal={() => {
            setEditTechnician(0);
            setModalVisible(false);
          }}
        />
      )}
      {modalDelete && (
        <AlertDelete
          title="un técnico"
          subtitle={"este técnico"}
          to_delete={async () => {
            const response = await callEndpoint(
              TechnicianService.delete(editTechnician)
            );
            if (response.status) {
              getTechnicians();
              return response;
            }
          }}
          closeModal={() => {
            setModalDelete(false);
          }}
        />
      )}
    </div>
  );
};

export default ListContentTable;
