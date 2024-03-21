import plusIcon from "src/assets/icons/plus-icon.svg";
import styles from "./teamfilter.module.css";
import arrowIcon from "src/assets/icons/arrow.svg";
import { Link, useSearchParams } from "react-router-dom";
import { privateRoutes } from "src/models";
import { useContext, useEffect, useRef } from "react";
import { OperationExpensesService } from "src/services/operationexpenses.service";
import { useAxios } from "src/hooks";
import { OperationExpensesContext } from "src/context/operationExpenses";

const TeamFilter = () => {

  const platesRef = useRef<HTMLUListElement>(null);
  const { setEquipmentPlatesId, setEquipmentPlates, operationExpensesState } = useContext(OperationExpensesContext)
  const { callEndpoint } = useAxios()
  const [ searchParams, setSearchParams] = useSearchParams();

  const getPlatesByEquipment = async (id:string) => {
    if(id === '') return
    const res = await callEndpoint(OperationExpensesService.getPlatesByEquipment(id))
    
    if(res && res.data.status){
      const { data } = res.data
      setEquipmentPlates(data.listPlate);
      setEquipmentPlatesId(data.listPlate[0].ut_car_plate);
    }
  }

  useEffect(() => {
    getPlatesByEquipment(operationExpensesState.equipment_id);
    return () => {}
  }, [operationExpensesState.equipment_id])

  const handleClick = (id:any) => {
    const page = searchParams.get('page');
    if(page) page != '1' ? setSearchParams({'page': '1'}) : ''
    setEquipmentPlatesId(id);
  }

  const handleMoveSlider = (left: number) => {
    platesRef.current?.scrollBy({
      top: 0,
      behavior: "smooth",
      left: left,
    });
  };

  return (
    <>
      <section className={styles.team_filter}>
        <p>Selecciona el equipo</p>
        <div className={operationExpensesState.list_equipment_plates.length > 8 ? styles.grid_columns_v3 : ''}>
          {
            operationExpensesState.list_equipment_plates.length > 8 &&
            <button onClick={() => handleMoveSlider(-100)}>
              <img src={arrowIcon} alt="Arrow icon" className={styles.arrow} />
            </button>

          }
          <ul ref={platesRef}>
            {
              operationExpensesState.list_equipment_plates.map((plate: any, i: any) => (
                <li className={ operationExpensesState.equipment_plate === plate.ut_car_plate ? styles.active : '' } onClick={()=>handleClick(plate.ut_car_plate)} key={i}> {plate.ut_car_plate} </li>
              ))
            }
          </ul>
          {
            operationExpensesState.list_equipment_plates.length > 8 &&
            <button onClick={() => handleMoveSlider(+100)}>
              <img src={arrowIcon} alt="Arrow icon" className={styles.arrow} />
            </button>
          }
        </div>
        <Link
          to={`/${privateRoutes.CLIENT}/${privateRoutes.EXPENSES}/${privateRoutes.ADDREGISTER}`}
        >
          <button className={styles.btn}>
            <img src={plusIcon} alt="Plus icon" />
            Agregar registro
          </button>
        </Link>
      </section>
    </>
  );
};

export default TeamFilter;