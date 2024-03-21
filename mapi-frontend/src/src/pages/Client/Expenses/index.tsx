import { OperationExpensesProvider } from "src/context/operationExpenses";
import styles from "./expenses.module.css";
import EquipmentList from "./components/EquipmentList";

const Expenses = () => {
  return (
    <>
      <OperationExpensesProvider>
        <article className={styles.expenses}>
          <EquipmentList />
        </article>
      </OperationExpensesProvider>
    </>
  );
};

export default Expenses;
