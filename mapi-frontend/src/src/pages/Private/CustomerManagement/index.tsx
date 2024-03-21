import styles from "./temporary.module.css";
import ListTechnicians from "./componentes/ListTechnicians";

const CustomerManagement = () => {
  return (
    <>
      <div className={styles.classification_wrapper}>
        <ListTechnicians />
      </div>
    </>
  );
};

export default CustomerManagement;
