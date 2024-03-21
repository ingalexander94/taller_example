import SystemTablet from "./SystemTablet";
import WorkOrdersFilter from "./WordOrdersFilter";
import styles from "./wordorders.module.css";


const WorkOrders = () => {

  return (
    <>
      <article className={styles.expenses}>
        <div className={styles.content_navigate}>
          <nav>
            <ul>
              <li>
                <a className={styles.active}>Tractocamión</a>
              </li>
              <li>
                <a>Volquetas</a>
              </li>
            </ul>
          </nav>
        </div>
        <WorkOrdersFilter />
        <SystemTablet />
      </article>
    </>
  );
};

export default WorkOrders;
