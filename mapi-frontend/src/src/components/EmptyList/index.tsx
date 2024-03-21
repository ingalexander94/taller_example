import { MouseEvent } from "react";
import styles from "./emptylist.module.css";

type Props = {
  handleReset: (e: MouseEvent<HTMLButtonElement>) => void;
};

const EmptyList = ({ handleReset }: Props) => {
  return (
    <aside className={styles.empty}>
      <p>¡Ups! No encontramos resultados para tu búsqueda</p>
      <button onClick={handleReset}>Limpiar búsqueda</button>
    </aside>
  );
};

export default EmptyList;
