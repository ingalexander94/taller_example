import styles from "./temporary.module.css";
import ListSearchPerson from "./components/ListSearchPerson";
import { PersonalProvider } from "src/context";

const Personal = () => {
  return (
    <>
      <PersonalProvider>
        <div className={styles.classification_wrapper}>
          <ListSearchPerson />
        </div>
      </PersonalProvider>
    </>
  );
};

export default Personal;
