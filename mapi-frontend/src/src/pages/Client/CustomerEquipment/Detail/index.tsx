import { Link, useParams } from "react-router-dom";
import DetailEquipments from "./componentes/ContentEquipment";
import { privateRoutes } from "src/models";
import arrowIcon from "src/assets/icons/arrow.svg";
import styles from "./details.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useAxios } from "src/hooks";
import { EquipmentService } from "src/services";
import { UIContext } from "src/context";
import { EquipmentDetail } from "src/interfaces";

const Detail = () => {
  const isInitialized = useRef<boolean>(false);
  const { id } = useParams();
  const { callEndpoint } = useAxios();
  const { toggleCheking } = useContext(UIContext);

  const [details, setDetails] = useState<EquipmentDetail | null>(null);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      getDetail();
    }

    return () => {};
  }, []);

  const getDetail = async () => {
    toggleCheking();
    const res = await callEndpoint(EquipmentService.getDetail(id!));
    if (res) {
      const { data } = res.data;
      setDetails(data);
    }
    toggleCheking();
  };

  return (
    <>
      <section className={styles.breadcrumb}>
        <Link to={`/${privateRoutes.CLIENT}/${privateRoutes.EQUIPMENT}`}>
          Equipos
        </Link>
        <img src={arrowIcon} alt="Arrow icon" />
        <p>
          {details
            ? `${details.team_name} - ${details.ut_car_plate}`
            : "Cargando..."}
        </p>
      </section>
      <div
        className={`animate__animated animate__fadeIn ${styles.classification_wrapper}`}
      >
        {details && <DetailEquipments details={details} />}
      </div>
    </>
  );
};

export default Detail;
