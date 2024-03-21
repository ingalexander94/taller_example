import { Link } from "react-router-dom";
import { privateRoutes } from "src/models";
import logoIcon from "src/assets/logo.svg";
import imgnotfound from "src/assets/Background_mechanic 2.svg";
import styles from "./notfound.module.css";
import { getSubdomain } from "src/utilities";

const subdomain = getSubdomain();

const NotFound = () => {
  return (
    <>
      <article className={styles.not_found}>
        <div className={styles.container}>
          <div className={styles.content}>
            <img className={styles.img_logo} src={logoIcon} alt=""></img>
            <h2>¡Ups! Te has desviado del camino.</h2>
            <p>
              Parece que has llegado a un lugar inexplorado. No te preocupes,
              hasta los caminos más sólidos tienen algún desvío. Regresemos
              juntos al camino principal para mantener tus equipos en óptimas
              condiciones.
            </p>
            <Link
              className={styles.button_login}
              to={`/${
                subdomain === "" ? privateRoutes.PRIVATE : privateRoutes.CLIENT
              }`}
              replace={true}
            >
              Volver a la pantalla principal
            </Link>
          </div>

          <div className={styles.img_content}>
            <img className={styles.img_notfound} src={imgnotfound} alt=""></img>
          </div>
        </div>
      </article>
    </>
  );
};

export default NotFound;
