import styles from "./wordorderdetail.module.css";
import downloadpdf from "src/assets/icons/download-pdf.svg";
import downloadecxel from "src/assets/icons/download-excel.svg";
import arrow from "src/assets/icons/arrow-right.svg";
import { NavLink } from "react-router-dom";
import { privateRoutes } from "src/models";

const WordOrderDetail = () => {
  return (
    <article>
      <div className={styles.breadcrumbs}>
        <NavLink
          className={styles.breadcrumbs_img}
          to={privateRoutes.WORKORDERPREVIEW}
        >
          Ordenes de trabajo
          <img src={arrow} alt="" />
        </NavLink>

        <NavLink
          className={styles.breadcrumbs_img}
          to={`/${privateRoutes.CLIENT}/${privateRoutes.WORDORDERS}/${privateRoutes.WORDORDERSDETAIL}`}
        >
          MC000001
          <img src={arrow} alt="" />
        </NavLink>

        <span>Previsualización de Operación MC000001 </span>
      </div>

      <div className={styles.container}>
        <div className={styles.content_pdf}>
          <h2>Previsualización de Orden de trabajo</h2>
          <div className={styles.content_buttons}>
            <button className={styles.download_button}>
              <img src={downloadpdf} alt="" />
              Descargar Pdf
            </button>
            <button className={styles.download_buttons}>
              <img src={downloadecxel} alt="" />
              Descargar .csv
            </button>
          </div>
        </div>
        <div>
          <iframe
            id="tyc"
            title="Términos y condiciones"
            height="1000"
            width="100%"
            src="https://mapi-public.s3.us-east-2.amazonaws.com/lorem_ipsum.pdf"
          ></iframe>
        </div>
      </div>
    </article>
  );
};

export default WordOrderDetail;
