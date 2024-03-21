import Pagination from "src/components/UI/Pagination";
import styles from "./systemtablet.module.css";
import { useContext, useEffect, useState } from "react";
import ViewDetail from "./components/ViewDetail";
import { useAxios } from "src/hooks";
import { OperationExpensesService } from "src/services/operationexpenses.service";
import { OperationExpensesContext } from "src/context/operationExpenses";
import { useSearchParams } from "react-router-dom";

const SystemTablet = () => {


  const { setLastPage , operationExpensesState } = useContext(OperationExpensesContext)
  const [modalVisible, setModalVisible] = useState(false);
  const [listOperationExpenses, setListOperationExpenses] = useState([]) as any;
  const [idOperation, setIdOperation] = useState([]) as any;
  
  const { callEndpoint } = useAxios();

  const [ searchParams ] = useSearchParams();

  
  
  const getOperationExpenses = async(plates:string) => {
    if(plates === '') return
    const page = searchParams.get('page');
    const res = await callEndpoint(OperationExpensesService.getOperationExpensesList(plates, page ?? '1' ))
    if(res && res.data.status){
        const { data } = res.data
        
        setLastPage(data.totalPages)
        setListOperationExpenses(data.listOperation);
    }
  }

  useEffect(() => {
      getOperationExpenses(operationExpensesState.equipment_plate)
    return () => {}
  }, [operationExpensesState.equipment_plate, searchParams])
  
  
  const showModal = () => {
    setModalVisible(true);
  };

  return (
    <div className={styles.table_system}>
      <div className={styles.table_header}>
        <ul>
          <li>Lugar de salida</li>
          <li>Lugar de Llegada</li>
          <li>Km recorrido</li>
          <li>Conductor</li>
          <li>Empresa</li>
          <li>Producto</li>
          <li>Total de Gastos</li>
          <li>Utilidad del viaje</li>
          <li>Acciones</li>
        </ul>
      </div>
      <div className={styles.table_content}>
        <div className={styles.table_item}>
            {
              listOperationExpenses.length > 0
              ? listOperationExpenses.map((operation: any, i: any) => (
                <ul key={i}>
                  <li>
                    <strong>{operation.ope_departure_location ?? 'Sin especificar'}</strong>
                  </li>

                  <li>
                    <strong>{operation.ope_arriaval_place ?? 'Sin especificar' }</strong>
                  </li>
                  <li>
                    <strong>{operation.ope_km_driven ?? 'Sin especificar'}</strong>
                  </li>
                  <li>
                    <strong>{operation.personal_names} {operation.personal_surnames} </strong>
                  </li>
                  <li>
                    <strong>{operation.ope_company ?? 'Sin especificar'} </strong>
                  </li>
                  <li>
                    <strong>{operation.ope_product ?? 'Sin producto'}</strong>
                  </li>
                  <li>
                    <strong>{operation.ope_total_expenses ?? '$0'}</strong>
                  </li>
                  <li>
                    <strong>{operation.ope_travel_utility ?? '$0'}</strong>
                  </li>
                  <li>
                    <button className={styles.btn_detail} onClick={()=>{
                      showModal()
                      setIdOperation(operation.id_operating_expenses)
                      }}>
                      ver detalles
                    </button>
                  </li>
                </ul>

              ))
              : <p style={{padding: '20px'}}>No hay datos para mostrar</p>
            }
            
        </div>
        {modalVisible && (
          <ViewDetail id_operation={idOperation} closeModal={() => setModalVisible(false)} />
        )}
      </div>
        { operationExpensesState.last_page > 1 && 
          <Pagination last_page={operationExpensesState.last_page} 
        />}
    </div>
  );
};

export default SystemTablet;
