import { useContext, useEffect } from "react";
import { useAxios } from "src/hooks";
import { EquipmentService } from "src/services";
import CardEquipment from "src/components/UI/CardEquipment";
import styles from "./listcontenttable.module.css";
import { EquipmentContext } from "src/context/equipment";
import Pagination from "src/components/UI/Pagination";

const ListContentTables = () => {
  const { callEndpoint } = useAxios();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page") ?? "1") ?? 1;
  const { equipmentState, setEquipments, setTotalPages } =
    useContext(EquipmentContext);

  useEffect(() => {
    if (equipmentState.team > 0) {
      getUserTeams(page, equipmentState.search, equipmentState.team);
    }
    return () => {};
  }, [page, equipmentState.search, equipmentState.team]);

  const getUserTeams = async (
    currentPage: number,
    search: string,
    team: number
  ) => {
    const res = await callEndpoint(
      EquipmentService.getByPage(currentPage, search, team)
    );
    if (res) {
      const { data } = res.data;
      setEquipments(data.equipments);
      setTotalPages(data.totalPages);
    }
  };

  return (
    <>
      <article className={styles.list_equipments}>
        {equipmentState.equipments.length ? (
          equipmentState.equipments.map((equipment, i) => (
            <CardEquipment
              key={i}
              equipment={equipment}
              showEditButton={true}
            />
          ))
        ) : (
          <p>No se encontrarón resultados</p>
        )}
      </article>
      {equipmentState.totalPages > 1 ? (
        <Pagination last_page={equipmentState.totalPages} />
      ) : (
        <></>
      )}
    </>
  );
};

export default ListContentTables;
