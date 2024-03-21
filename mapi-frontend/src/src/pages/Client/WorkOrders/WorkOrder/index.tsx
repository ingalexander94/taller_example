import styles from "./workorder.module.css";
import filterIcon from "src/assets/icons/filter-black.svg";
import downloadpdf from "src/assets/icons/download-pdf.svg";
import downloadecxel from "src/assets/icons/download-excel.svg";
import view from "src/assets/icons/view.svg";
import arrow from "src/assets/icons/arrow-right.svg";
import { Link } from "react-router-dom";
import { privateRoutes } from "src/models";
import { NavLink } from "react-router-dom";
import CopyToClipboardButtons from "./CopyButton";

const WorkOrder = () => {
  return (
    <article>
      <div className={styles.breadcrumbs}>
        <NavLink className={styles.breadcrumbs_img} to={privateRoutes.CLIENT}>
          Ordenes de trabajo
          <img src={arrow} alt="" />
        </NavLink>
        <span>MC000001</span>
      </div>
      <section className={styles.container_section_initial}>
        <div>
          <div className={styles.container_initial}>
            <div>
              <h2>Detalle de la orden de trabajo</h2>
            </div>
            <div className={styles.code}>
              <div className={styles.code_span}>
                <span>Código de entrada</span>
              </div>
              <div className={styles.code_strong}>
                <strong>MC000001</strong>
              </div>
            </div>
          </div>
          <div className={styles.container_properties}>
            <div className={styles.container_properties_driver}>
              <h5>Conductor</h5>
              <div className={styles.driver}>
                <CopyToClipboardButtons text="Francisco Rolón" />
              </div>
            </div>

            <div className={styles.container_properties_driver}>
              <h5>Placa del equipo</h5>
              <div className={styles.driver}>
                <CopyToClipboardButtons text="WOM-371" />
              </div>
            </div>
            <div className={styles.container_properties_driver}>
              <h5>Modelo</h5>
              <div className={styles.driver}>
                <CopyToClipboardButtons text="Kenworth T800" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.container_section}>
        <div className={styles.content_list}>
          <h2>Listado de operación</h2>
          <div className={styles.content_buttons}>
            <button className={styles.download_button}>
              <img src={downloadpdf} alt="" />
              Descargar Pdf
            </button>
            <button className={styles.download_buttons}>
              <img src={downloadecxel} alt="" />
              Descargar .csv
            </button>

            <Link
              className={styles.download_buttons_view}
              to={`/${privateRoutes.CLIENT}/${privateRoutes.WORDORDERS}/${privateRoutes.WORDORDERSDETAIL}/${privateRoutes.WORKORDERPREVIEW}`}
            >
              <img src={view} alt="" />
              Ver Check List
            </Link>
          </div>
        </div>
        <div>
          <div className={styles.table_system}>
            <div className={styles.table_header}>
              <ul>
                <li>
                  <img src={filterIcon} alt="icon" />
                  Componente
                </li>
                <li>Código</li>
                <li>Descripción de operación</li>

                <li>Técnico</li>
                <li>Duración</li>
                <li>
                  <img src={filterIcon} alt="icon" />
                  Tipo de mantenimiento
                </li>
                <li>Valor M.O.</li>
              </ul>
            </div>
            <div className={styles.table_content}>
              <div className={styles.table_item}>
                <ul>
                  <li>
                    <strong>
                      (1-MA) Sistema de Sobrealimentación y escape
                    </strong>
                  </li>

                  <li>
                    <strong>1MA1</strong>
                  </li>
                  <li>
                    <span>
                      Desmontar y montar el indicador de restricción de aire del
                      filtro.
                    </span>
                  </li>
                  <li>
                    <strong>TMC-01</strong>
                  </li>
                  <li>
                    <strong>10 (Min.) 0,17 (Hr.)</strong>
                  </li>
                  <li>
                    <strong>Mantenimiento Preventivo</strong>
                  </li>
                  <li>
                    <strong>$10.000</strong>
                  </li>
                </ul>
              </div>
              <div className={styles.table_item}>
                <ul>
                  <li>
                    <strong>
                      (1-MA) Sistema de Sobrealimentación y escape
                    </strong>
                  </li>

                  <li>
                    <strong>1MA1</strong>
                  </li>
                  <li>
                    <span>
                      Desmontar y montar el indicador de restricción de aire del
                      filtro.
                    </span>
                  </li>
                  <li>
                    <strong>TMC-01</strong>
                  </li>
                  <li>
                    <strong>10 (Min.) 0,17 (Hr.)</strong>
                  </li>
                  <li>
                    <strong>Mantenimiento Preventivo</strong>
                  </li>
                  <li>
                    <strong>$10.000</strong>
                  </li>
                </ul>
              </div>
              <div className={styles.table_item}>
                <ul>
                  <li>
                    <strong>
                      (1-MA) Sistema de Sobrealimentación y escape
                    </strong>
                  </li>

                  <li>
                    <strong>1MA1</strong>
                  </li>
                  <li>
                    <span>
                      Desmontar y montar el indicador de restricción de aire del
                      filtro.
                    </span>
                  </li>
                  <li>
                    <strong>TMC-01</strong>
                  </li>
                  <li>
                    <strong>10 (Min.) 0,17 (Hr.)</strong>
                  </li>
                  <li>
                    <strong>Mantenimiento Preventivo</strong>
                  </li>
                  <li>
                    <strong>$10.000</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default WorkOrder;
