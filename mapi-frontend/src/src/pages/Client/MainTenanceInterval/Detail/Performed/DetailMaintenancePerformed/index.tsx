import DetailSearch from "./DetailSearch";
import styles from "./deatilmaintenance.module.css";

const DetailMaintenancePerformed = () => {
  return (
    <>
      <article className={styles.detail_maintenance}>
        <DetailSearch />
      </article>
    </>
  );
};

export default DetailMaintenancePerformed;
