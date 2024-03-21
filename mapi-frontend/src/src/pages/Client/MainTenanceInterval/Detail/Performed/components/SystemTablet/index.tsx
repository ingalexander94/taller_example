import styles from "../SystemTablet/systemtablet.module.css";
import Arrow from "src/assets/icons/arrow-down.svg";
import { Link } from "react-router-dom";
import { privateRoutes } from "src/models";

const SystemTablet = () => {
  return (
    <>
      <div className={styles.content_performed}>
        <div className={styles.header}>
          <ul>
            <li> Kilometros programados</li>
            <li>Kilometros de realización</li>
            <li>Tipo de mantenimiento</li>
            <li>Duración programada</li>
            <li>Duración empleada</li>
            <li> Costo programado</li>
            <li> Costo de realización</li>
            <li> Acciones</li>
          </ul>
        </div>

        <div className={styles.table_content}>
          <ul>
            <li>3,000 km</li>
            <li>3,000 km</li>
            <li>Engrase</li>
            <li>44 Minutos</li>
            <li>44 Minutos</li>
            <li>$44.000</li>
            <li>$50.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCEPERFORMED}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>3,000 km</li>
            <li>3,000 km</li>
            <li>Engrase</li>
            <li>44 Minutos</li>
            <li>44 Minutos</li>
            <li>$44.000</li>
            <li>$50.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCEPERFORMED}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>6,000 km</li>
            <li>6,000 km</li>
            <li>Engrase</li>
            <li>44 Minutos</li>
            <li>44 Minutos</li>
            <li>$44.000</li>
            <li>$50.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCEPERFORMED}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>9,000 km</li>
            <li>9,000 km</li>
            <li>Engrase</li>
            <li>44 Minutos</li>
            <li>44 Minutos</li>
            <li>$44.000</li>
            <li>$52.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCEPERFORMED}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>10,000 km</li>
            <li>10,000 km</li>
            <li>Engrase</li>
            <li>74 Minutos</li>
            <li>74 Minutos</li>
            <li>$70.000</li>
            <li>$72.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCEPERFORMED}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>13,000 km</li>
            <li>13,000 km</li>
            <li>Engrase</li>
            <li>44 Minutos</li>
            <li>44 Minutos</li>
            <li>$44.000</li>
            <li>$50.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCEPERFORMED}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>15,000 km</li>
            <li>15,000 km</li>
            <li>Engrase</li>
            <li>44 Minutos</li>
            <li>44 Minutos</li>
            <li>$44.000</li>
            <li>$50.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCEPERFORMED}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>20,000 km</li>
            <li>20,000 km</li>
            <li>Engrase</li>
            <li>44 Minutos</li>
            <li>44 Minutos</li>
            <li>$44.000</li>
            <li>$50.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCEPERFORMED}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>30,000 km</li>
            <li>30,000 km</li>
            <li>MCK1 + MPK1 + MPK2</li>
            <li>44 Minutos</li>
            <li>44 Minutos</li>
            <li>$44.000</li>
            <li>$50.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCEPERFORMED}`}
              >
                Ver detalles <img src={Arrow} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.table_content}>
          <ul>
            <li>3,000 km</li>
            <li>3,000 km</li>
            <li>Engrase</li>
            <li>44 Minutos</li>
            <li>44 Minutos</li>
            <li>$44.000</li>
            <li>$50.000</li>
            <li>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCEPERFORMED}`}
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
