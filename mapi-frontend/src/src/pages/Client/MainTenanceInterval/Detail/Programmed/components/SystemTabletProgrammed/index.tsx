import styles from "./systemtablet.module.css";
import Kilometres from "src/assets/icons/kilometres.svg";
import Arrow from "src/assets/icons/arrow-down.svg";
import { privateRoutes } from "src/models";
import { Link } from "react-router-dom";

const SystemTablet = () => {
  return (
    <>
      <div className={styles.content_programmed}>
        <div className={styles.header}>
          <ul>
            <li> Kilometros</li>
            <li>Tipo de mantenimiento</li>
            <li>Tiempo de mantenimiento</li>
            <li>Costo de mantenimiento</li>
            <li>Acciones</li>
          </ul>
        </div>

        <div className={styles.table_content}>
          <ul>
            <li>
              <img src={Kilometres} alt="icon" />
              3,000 km
            </li>
            <li>MCK1 + MPK1</li>
            <li>44 Minutos</li>
            <li>$44.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCE}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>
              <img src={Kilometres} alt="icon" />
              3,000km
            </li>
            <li>Engrase</li>
            <li>44 Minutos</li>
            <li>$44.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCE}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>
              <img src={Kilometres} alt="icon" />
              6,000 km
            </li>
            <li>Engrase</li>
            <li>44 Minutos</li>
            <li>$518.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCE}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>
              <img src={Kilometres} alt="icon" />
              9,000 km
            </li>
            <li>MCK1 + MPK1 + MPK2</li>
            <li>44 Minutos</li>
            <li>$44.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCE}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>
              <img src={Kilometres} alt="icon" />
              12,000 km
            </li>
            <li>MCK1 + MPK1 + MPK2</li>
            <li>44 Minutos</li>
            <li>$44.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCE}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>
              <img src={Kilometres} alt="icon" />
              3,000 km
            </li>
            <li>MCK1 + MPK1 + MPK2</li>
            <li>44 Minutos</li>
            <li>$44.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCE}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>
              <img src={Kilometres} alt="icon" />
              15,000 km
            </li>
            <li>MCK1 + MPK1 + MPK2</li>
            <li>44 Minutos</li>
            <li>$518.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCE}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>
              <img src={Kilometres} alt="icon" />
              3,000 km
            </li>
            <li>MCK1 + MPK1</li>
            <li>44 Minutos</li>
            <li>$44.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCE}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>
              <img src={Kilometres} alt="icon" />
              899,000 km
            </li>
            <li>Engrase</li>
            <li>44 Minutos</li>
            <li>$518.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCE}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>
              <img src={Kilometres} alt="icon" />
              473,000 km
            </li>
            <li>MCK1 + MPK1 + MPK2</li>
            <li>44 Minutos</li>
            <li>$44.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCE}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SystemTablet;
