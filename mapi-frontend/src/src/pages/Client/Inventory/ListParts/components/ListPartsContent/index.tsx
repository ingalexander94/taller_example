import editIcon from "src/assets/icons/edit.svg";
import deleteIcon from "src/assets/icons/delete.svg";
import styles from "./listpartscontent.module.css";
import { useContext, useEffect, useState } from "react";
import Pagination from "src/components/UI/Pagination";
import AddPart from "../AddPart";
import { InventoryService } from "src/services";
import { useSearchParams } from "react-router-dom";
import { InventoryContext } from "src/context/inventory";
import { useAxios } from "src/hooks";
import AlertDelete from "src/components/AlertDelete";

const ListPartsContent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [idItemInventory, setIdItemInvetory] = useState<String>("");

  const [searchParams, setSearchParams ] = useSearchParams();
  const { setInventory, setTotalPages ,inventoryState} = useContext(InventoryContext);
  const current_page  = searchParams.get('page') || "1";
  const { callEndpoint } = useAxios()

  const formatPrice = (price: string | null) => {
    if (price === 'null') return '$0';
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(parseInt(price!));
  };

  const getInventory = async () => {
    try {
      const response = await callEndpoint(InventoryService.getAll(current_page));
      
      if(response && response.status == 200){
        const { data } = response.data;
        if(current_page > data.last_page) setSearchParams({'page': data.last_page.toString()})
        setTotalPages(data.last_page)
        setInventory(data.inventory)
      };
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getInventory();
  }, [current_page]);

  const showModal = () => {
    setModalVisible(true);
  };

  const showDelete = () => {
    setModalDelete(true);
  };

  return (
    <div className={styles.table_system}>
      <div className={styles.table_header}>
        <ul>
          <li>Nro.</li>
          <li>Nombre del repuesto</li>
          <li>Referencia</li>
          <li>Cantidad</li>
          <li>Valor de la unidad</li>
          <li>Valor sin IVA</li>
          <li>IVA</li>
          <li>Valor con IVA</li>
          <li>Acciones</li>
        </ul>
      </div>
      <div className={styles.table_content}>

        {
          inventoryState.list_inventory.length > 0 
          ? (inventoryState.list_inventory.map((item, i) => (
            <div key={i} className={styles.table_item}>
              <ul>
                <li>
                  <strong>{item.id_inventory}</strong>
                </li>
                <li>
                  <strong>
                  {item.inventory_item_name}
                  </strong>
                </li>
                <li>{item.inventory_reference}</li>
                <li>
                  <strong>{item.inventory_quantity ?? 'Sin especificar'}</strong>
                </li>
                <li>
                  <strong>{formatPrice(String(item.inventory_units))}</strong>
                </li>
                <li>
                  <strong>{formatPrice(String(item.inventory_price_without_tax))}</strong>
                </li>
                <li>
                  <strong>{item.inventory_tax ?? '0'}%</strong>
                </li>
                <li>
                  <strong>{formatPrice(String(item.inventory_price_with_tax))}</strong>
                </li>
                <div className={styles.buttons}>
                  <button onClick={()=>{
                    showModal();
                    setIdItemInvetory(item.id_inventory!);
                  }} className={styles.btn_edit}>
                    <img src={editIcon} alt="edit icon" />
                  </button>
                  <button onClick={()=>{
                    showDelete();
                    setIdItemInvetory(item.id_inventory!);
                  }} className={styles.btn_delete}>
                    <img src={deleteIcon} alt="delete icon" />
                  </button>
                </div>
              </ul>
            </div>
          )))
          : <div >No hay datos {inventoryState.list_inventory.length}</div>
        }
   
      </div>

      {inventoryState.totalPages > 1 && <Pagination last_page={inventoryState.totalPages} />}

      {
        modalDelete &&
        (<AlertDelete 
          closeModal={() => {
            setModalDelete(false);
          } }
          to_delete={async () => {
            try {
              const res = await callEndpoint(InventoryService.delete(Number(idItemInventory)));
              if (res && res.status === 200) {
                getInventory();
                setModalDelete(false);
                return res;
              }
            } catch (error) {
              console.error(error);
            }
          } }
          title={"un repuesto"} 
          subtitle={"este repuesto"}
          />)    
      }

      {modalVisible && (
        <AddPart
          title={"Editar"}
          id_item_inventory={Number(idItemInventory)}
          closeModal={() => {
            getInventory();
            setIdItemInvetory("");
            setModalVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default ListPartsContent;
