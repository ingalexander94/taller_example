import { ChangeEvent, useState } from "react";
import styles from "./expensesoperating.module.css";
import plus from "src/assets/icons/AddCompany.svg";
import erase from "src/assets/icons/delete.svg";
import { formatCurrency } from "src/utilities";

type Props = {
  formik: any
}

const ExpensesOperating = ({formik}:Props) => {


  const [addRow, setAddRow] = useState<any>([0]);
  const [price , setPrice] = useState<any>([{ 
      value: ''
    }]
  );

  const addExpense = () => {
    setAddRow((preExpenses: any) => {
      return [...preExpenses, preExpenses.length]
    })
    setPrice((preExpenses: any) => {
      return [...preExpenses, {value: 0}]
    })
    
  }

  const deleteExpense = (index: number) => {
    let newAddRow = [...addRow];
    const newExpenses = formik.values;
    let realIndex = newAddRow.findIndex((i: number) => i === index)
    
    newExpenses.expenses.splice(index, 1);
    newAddRow.splice(realIndex, 1);
    setAddRow(newAddRow);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target;

    if(name.includes('ed_price') ){
        let cleanValue = value.replace(/[^0-9]/g, "");
    
        if (cleanValue.length > 16) {
          return;
        }
    
        if (cleanValue === "") {
          price[index].value = '';
          formik.setFieldValue(`expenses[${index}].ed_price`, null);
          return;
        }
    
        price[index].value = formatCurrency(parseInt(cleanValue));
        
        formik.setFieldValue(`expenses[${index}].ed_price`, parseInt(cleanValue));
    }else{
      formik.setFieldValue(`expenses[${index}].ed_concept`, value);
    }
  }

  return (
    <>
      <section className={styles.content}>
        <div className={styles.header}>
          <h4>Gastos de operación</h4>
          <button type="button" onClick={addExpense}>
            <img src={plus} alt="icon" /> Agregar gasto
          </button>
        </div>
        <hr />
        <div className={styles.expenses_header}>
          <div>Concepto</div>
          <div>Valor</div>
        </div>
        <div className={styles.form}>
          {
            addRow && addRow.map(( i: number) => {
              return <div key={i} className={styles.form_content}>
                <div className={styles.form_list}>
                  <input 
                     type="text" 
                     placeholder="Escribe un concepto" 
                     name={`ed_concept-${i}`}
                     value={formik.values.expenses[i]?.ed_concept || ''}
                     onChange={(event)=>handleChange(event, i)}
                     />
                </div>
                <div className={styles.form_list}>
                  <input 
                     placeholder="$0"  
                     type="text" 
                     name={`ed_price-${i}`}
                     onChange={(event)=>handleChange(event, i)}
                     value={price[i].value || ''}
                     />
                </div>
                <button 
                  type="button"
                  className={styles.btn_delete}
                  onClick={()=>deleteExpense(i)}
                  >
                  <img src={erase} alt="" />
                </button>
              </div>
            })
          }
        </div>
      </section>
    
    </>
  );
};

export default ExpensesOperating;
