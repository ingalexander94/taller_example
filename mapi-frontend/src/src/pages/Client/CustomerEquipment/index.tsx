import { EquipmentProvider } from "src/context/equipment";
import ListEquipments from "./componentes/ListEquipments";
import styles from "./equipment.module.css";

const CustomerEquipment = () => {
  return (
    <EquipmentProvider>
      <div className={styles.classification_wrapper}>
        <ListEquipments />
      </div>
    </EquipmentProvider>
  );
};

export default CustomerEquipment;
