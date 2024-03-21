import styles from "./detailcontent.module.css";
import kilometresIcon from "src/assets/icons/kilometres.svg";
import filterBlackIcon from "src/assets/icons/filter-black.svg";

const DetailContent = () => {
  return (
    <>
      <article className={styles.content_detail}>
        <section className={styles.header}>
          <div>
            <ul>
              <li>Kilometros</li>
              <li>Tipo de mantenimiento</li>
              <li>Duración</li>
              <li>Costo de mantenimiento</li>
            </ul>
          </div>
          <div className={styles.description}>
            <ul>
              <li>3.000 KM</li>
              <li>Engrase</li>
              <li>44 Minutos</li>
              <li>$44.000</li>
            </ul>
          </div>
        </section>
        <div className={styles.table_system}>
          <div className={styles.table_header}>
            <ul>
              <li>
                <img src={filterBlackIcon} alt="filter icon" /> Componente
              </li>
              <li>Código</li>
              <li>Descripción</li>
              <li>Técnico</li>
            </ul>
          </div>
          <div className={styles.table_content}>
            <div
              className={`animate__animated animate__fadeIn animate__faster ${styles.table_item}`}
            >
              <label>
                <ul>
                  <li>
                    <img src={kilometresIcon} alt="Kilometers icon" />
                    <strong>(4-ET) Transmisión y embrague </strong>
                  </li>
                  <li>
                    <strong>3CA59</strong>
                  </li>

                  <li>
                    <p>
                      Engrasar bisagras y cerraduras de las puertas, bisagras y
                      topes del capot (cofre), pedal del freno y articulaciones
                      y pedal del embrague
                    </p>
                  </li>
                  <li>
                    <strong>TCM01</strong>
                  </li>
                </ul>
              </label>
            </div>
            <div
              className={`animate__animated animate__fadeIn animate__faster ${styles.table_item}`}
            >
              <label>
                <ul>
                  <li>
                    <img src={kilometresIcon} alt="Kilometers icon" />
                    <strong>(6-PT) Puentes traseros </strong>
                  </li>
                  <li>
                    <strong>3CA59</strong>{" "}
                  </li>

                  <li>
                    <p>
                      Engrasar bisagras y cerraduras de las puertas, bisagras y
                      topes del capot (cofre), pedal del freno y articulaciones
                      y pedal del embrague
                    </p>
                  </li>
                  <li>
                    <strong>TCM01</strong>
                  </li>
                </ul>
              </label>
            </div>
            <div
              className={`animate__animated animate__fadeIn animate__faster ${styles.table_item}`}
            >
              <label>
                <ul>
                  <li>
                    <img src={kilometresIcon} alt="Kilometers icon" />
                    <strong>(7-FR) Frenos de disco</strong>
                  </li>
                  <li>
                    <strong>3CA59</strong>{" "}
                  </li>

                  <li>
                    <p>
                      Engrasar bisagras y cerraduras de las puertas, bisagras y
                      topes del capot (cofre), pedal del freno y articulaciones
                      y pedal del embrague
                    </p>
                  </li>
                  <li>
                    <strong>TCM01</strong>
                  </li>
                </ul>
              </label>
            </div>
            <div
              className={`animate__animated animate__fadeIn animate__faster ${styles.table_item}`}
            >
              <label>
                <ul>
                  <li>
                    <img src={kilometresIcon} alt="Kilometers icon" />
                    <strong>(8-SU) Frenos de motor</strong>
                  </li>
                  <li>
                    <strong>3CA59</strong>{" "}
                  </li>

                  <li>
                    <p>
                      Engrasar a presion todos los puntos de engrase del sistema
                      de frenos (eje de levas, rachets, entre otros), de las
                      ruedas de los lados derecho e izquierdo, del puente
                      delantero (revisar graseras) Grasa EP2 NLGI2 con base de
                      Litio.
                    </p>
                  </li>
                  <li>
                    <strong>TCM01</strong>
                  </li>
                </ul>
              </label>
            </div>
            <div
              className={`animate__animated animate__fadeIn animate__faster ${styles.table_item}`}
            >
              <label>
                <ul>
                  <li>
                    <img src={kilometresIcon} alt="Kilometers icon" />
                    <strong>(4-ET) Transmisión y embrague </strong>
                  </li>
                  <li>
                    <strong>3CA59</strong>{" "}
                  </li>

                  <li>
                    <p>
                      Engrasar a presion todos los puntos de engrase del sistema
                      de frenos (eje de levas, rachets, entre otros), de las
                      ruedas de los lados derecho e izquierdo, del puente
                      delantero (revisar graseras) Grasa EP2 NLGI2 con base de
                      Litio.
                    </p>
                  </li>
                  <li>
                    <strong>TCM01</strong>
                  </li>
                </ul>
              </label>
            </div>
            <div
              className={`animate__animated animate__fadeIn animate__faster ${styles.table_item}`}
            >
              <label>
                <ul>
                  <li>
                    <img src={kilometresIcon} alt="Kilometers icon" />
                    <strong>(4-ET) Transmisión y embrague </strong>
                  </li>
                  <li>
                    <strong>3CA59</strong>{" "}
                  </li>

                  <li>
                    <p>
                      Engrasar bisagras y cerraduras de las puertas, bisagras y
                      topes del capot (cofre), pedal del freno y articulaciones
                      y pedal del embrague
                    </p>
                  </li>
                  <li>
                    <strong>TCM01</strong>
                  </li>
                </ul>
              </label>
            </div>
            <div
              className={`animate__animated animate__fadeIn animate__faster ${styles.table_item}`}
            >
              <label>
                <ul>
                  <li>
                    <img src={kilometresIcon} alt="Kilometers icon" />
                    <strong>(4-ET) Transmisión y embrague </strong>
                  </li>
                  <li>
                    <strong>3CA59</strong>{" "}
                  </li>

                  <li>
                    <p>
                      Engrasar bisagras y cerraduras de las puertas, bisagras y
                      topes del capot (cofre), pedal del freno y articulaciones
                      y pedal del embrague
                    </p>
                  </li>
                  <li>
                    <strong>TCM01</strong>
                  </li>
                </ul>
              </label>
            </div>
            <div
              className={`animate__animated animate__fadeIn animate__faster ${styles.table_item}`}
            >
              <label>
                <ul>
                  <li>
                    <img src={kilometresIcon} alt="Kilometers icon" />
                    <strong>(4-ET) Transmisión y embrague </strong>
                  </li>
                  <li>
                    <strong>3CA59</strong>
                  </li>

                  <li>
                    <p>
                      Engrasar a presion todos los puntos de engrase del sistema
                      de frenos (eje de levas, rachets, entre otros), de las
                      ruedas de los lados derecho e izquierdo, del puente
                      delantero (revisar graseras) Grasa EP2 NLGI2 con base de
                      Litio.
                    </p>
                  </li>
                  <li>
                    <strong>TCM01</strong>
                  </li>
                </ul>
              </label>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default DetailContent;
