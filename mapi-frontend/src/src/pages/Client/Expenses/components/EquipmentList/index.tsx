import styles from "./equipmentlist.module.css";
import { OperationExpensesContext } from "src/context/operationExpenses";
import { OperationExpensesService } from "src/services/operationexpenses.service";
import { useContext, useEffect } from "react";
import { useAxios } from "src/hooks";
import TeamFilter from "../TeamFilter";
import SystemTablet from "../SystemTablet";
import { useSearchParams } from "react-router-dom";

const EquipmentList = () => {

  const { setEquipment , setEquipmentId, operationExpensesState } = useContext(OperationExpensesContext)
  const [ searchParams, setSearchParams] = useSearchParams();
  const { callEndpoint } = useAxios();

  const getEquipment = async() => {
    const res = await callEndpoint(OperationExpensesService.getEquipment())
    if(res && res.data.status){
      const { data } = res.data
      
      if(data.listOperation.length === 0) {
        setEquipment(data.listOperation);
        return
      }
      
      setEquipmentId(data.listOperation[0].ut_team);
      setEquipment(data.listOperation);
    }
  }

  useEffect(() => {
    getEquipment();
    return () => {}
  }, [])

  const handleClick = (id: any) => {
    const page = searchParams.get('page');
    if(page && page != '1') page != '1' ? setSearchParams({'page': '1'}) : ''
    setEquipmentId(id);
  }

  return (
    <>
      <div className={styles.content_navigate}>
      <nav>
      
        <ul>
          {
            operationExpensesState.list_equipment.length > 0 
            ? operationExpensesState.list_equipment.map((equipment: any, i: any) => (
              <li key={i}>
                <a 
                  onClick={()=>handleClick(equipment.ut_team)} 
                  className={operationExpensesState.equipment_id === equipment.ut_team ? styles.active : ''}> {equipment.team_name} </a>
              </li>
            ))
            : <li> Sin datos </li>
          }
        </ul>
     
      </nav>

    </div>
    <TeamFilter />
    <SystemTablet />
  </>
  )
}

export default EquipmentList