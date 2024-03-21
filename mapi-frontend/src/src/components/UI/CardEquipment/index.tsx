import arrow from "src/assets/icons/arrow-down.svg";
import edit from "src/assets/icons/editwhite.svg";
import { privateRoutes } from "src/models";
import { Link } from "react-router-dom";
import styles from "./card.module.css";
import { Equipment } from "src/interfaces";

type Props = {
  showEditButton: boolean;
  equipment: Equipment;
};

const CardEquipment = ({ showEditButton, equipment }: Props) => {
  const detailsRoute = showEditButton
    ? `/${privateRoutes.CLIENT}/${privateRoutes.EQUIPMENT}/${privateRoutes.DETAILEQUIPMENT}/${equipment.id_user_team}`
    : `/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}`;

  return (
    <section className={`animate__animated animate__fadeIn ${styles.card}`}>
      <img src={equipment.ut_photo} alt="Photo card" />
      <div className={styles.title_card}>
        <h3>
          {equipment.team_name} - {equipment.ut_car_plate}
        </h3>
        <span>
          {equipment.brand_name} {equipment.model_name}
        </span>
      </div>
      <div className={styles.propertie_cart}>
        <div className={styles.cart_states}>
          <strong>{equipment.ut_car_plate}</strong>
          <p>Placa</p>
        </div>
        <span></span>
        <div className={styles.cart_kilometries}>
          <strong>{equipment.mp_kilometers} km</strong>
          <p>Km. recorrido</p>
        </div>
        <span></span>
        <div className={styles.state}>
          <strong className={styles.active}>Activo</strong>
          <p>Estado actual</p>
        </div>
      </div>
      <div className={styles.container_buttons}>
        {showEditButton && (
          <Link
            to={`/${privateRoutes.CLIENT}/${privateRoutes.EQUIPMENT}/${privateRoutes.SAVEEQUIPMENT}?id=${equipment.id_user_team}`}
            className={"btn_black"}
          >
            <img src={edit} alt="Plus icon" />
            Editar equipo
          </Link>
        )}
        <Link
          to={detailsRoute}
          className={`btn_secondary ${styles.detailsButtonOnly}`}
        >
          Ver detalles
          <img src={arrow} alt="arrow" />
        </Link>
      </div>
    </section>
  );
};

export default CardEquipment;
