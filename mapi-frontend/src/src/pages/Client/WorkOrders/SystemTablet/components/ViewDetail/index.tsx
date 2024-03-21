import styles from "./viewDetail.module.css";
import Close from "src/assets/icons/Close.svg";
import Circle from "src/assets/icons/circle-red.svg";
type Props = {
  closeModal: () => void;
};

const ViewDetail = ({ closeModal }: Props) => {
  return (
    <>
      <article className={styles.container_modal}>
        <div className={styles.overlay}></div>
        <div className={styles.content_modal}>
          <div className={styles.header}>
            <button className={styles.close_button} onClick={closeModal}>
              <img src={Close} alt="closeButton" />
            </button>
            <h3>Detalle de la operación</h3>
          </div>
          <p>
            Tractocamión - <strong>WOM-371</strong>
          </p>
          <p>
            Conductor - <strong>Nombre del conductor</strong>
          </p>
          <section className={styles.section_info}>
            <div className={styles.content_info}>
              <div className={styles.info_left}>
                <img src={Circle} />
                <div className={styles.bar}></div>
                <img src={Circle} />
              </div>
              <div className={styles.info}>
                <div>
                  <h4>Salida</h4>
                  <p>Cúcuta, Norte de santander</p>
                  <p>DD/MM/AAAA</p>
                  <p>00000 Km</p>
                </div>
                <div>
                  <h4>Llegada</h4>
                  <p>Bucaramanga, Santander</p>
                  <p>DD/MM/AAAA</p>
                  <p>00000 Km</p>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.section_general}>
            <input type="checkbox" id={styles.general} />
            <label htmlFor={styles.general}>Datos generales</label>
            <div className={styles.content_general}>
              <ul className={styles.left}>
                <li>Conductor</li>
                <li>Empresa</li>
                <li>Nombre del encargado</li>
                <li>Número de contacto</li>
                <li>Producto o proceso</li>
              </ul>
              <ul className={styles.right}>
                <li>Nombre del conductor</li>
                <li>Nombre del la empresa</li>
                <li>Nombre del encargado</li>
                <li>300 000 0000</li>
                <li>Nombre del producto o proceso</li>
              </ul>
            </div>
          </section>
          <section className={styles.section_operating}>
            <input type="checkbox" id={styles.operating} />
            <label htmlFor={styles.operating}>Gastos de operación</label>
            <div className={styles.content_operating}>
              <ul className={styles.operating_left}>
                <li>Concepto</li>
                <li>Concepto</li>
                <li>Concepto</li>
                <li>Concepto</li>
              </ul>
              <ul className={styles.operating_right}>
                <li>Valor</li>
                <li>00</li>
                <li>00</li>
                <li>00</li>
              </ul>
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default ViewDetail;
