import styles from "./temporary.module.css";
import ListTechnicians from "./components/ListTechnicians";
import TechnicianProvider from "src/context/technician/technician.provider";

const TechnicianClassification = () => {
  return (
    <>
    <TechnicianProvider>
        <div className={styles.classification_wrapper}>
          <ListTechnicians />
        </div>
      </TechnicianProvider>
    </>
  );
};

export default TechnicianClassification;
