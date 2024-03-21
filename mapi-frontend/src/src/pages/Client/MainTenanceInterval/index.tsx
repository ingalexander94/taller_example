import { useState } from "react";
import CardEquipment from "src/components/UI/CardEquipment";
import styles from "./maintenanceinterval.module.css";
import { Equipment } from "src/interfaces";

const MainTenanceInterval = () => {
  const [equipepments, _] = useState<number[]>([]);

  return (
    <article className={styles.list_equipments}>
      {equipepments.map((i) => (
        <CardEquipment
          key={i}
          equipment={{} as Equipment}
          showEditButton={false}
        />
      ))}
    </article>
  );
};

export default MainTenanceInterval;
