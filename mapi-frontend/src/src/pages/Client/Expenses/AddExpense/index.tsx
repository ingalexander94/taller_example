import DatesTrayectori from "./components/DatesTrayectori";
import styles from "./addregister.module.css";
import Exit from "./components/Exit";
import Arrived from "./components/Arrived";
import ExpensesOperating from "./components/ExpensesOperating";
import { useFormik } from "formik";
import { FormExpensesOperation } from "src/validators/expensesoperation.validator";
import { useAxios } from "src/hooks";
import { OperationExpensesService } from "src/services/operationexpenses.service";
import { privateRoutes } from "src/models";
import { useNavigate } from "react-router-dom";
const AddExpense = () => {
  
  const { callEndpoint } = useAxios();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: FormExpensesOperation.initialState,
    validationSchema: FormExpensesOperation.validatorSchemaExpensesOperation,
    validateOnMount: false,
    onSubmit: async (values) => {
      const res = await callEndpoint(OperationExpensesService.createOperationExpenses(values))
      if(res && res.status === 200) {
        navigate(`/${privateRoutes.CLIENT}/${privateRoutes.EXPENSES}`);
      }
    }
  })  

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.module_addRegister}>
          <div className={styles.content_right}>
            <DatesTrayectori formik={formik} />
            <Exit  formik={formik} />
            <Arrived formik={formik}  />
          </div>
          <div>
            <ExpensesOperating formik={formik} />
            <button 
              type="submit" 
              style={{marginTop: '20px'}} 
              disabled={!formik.dirty || !formik.isValid }
              >Guardar</button>
          </div>
        </div>
      </form> 
    </>
  );
};

export default AddExpense;
