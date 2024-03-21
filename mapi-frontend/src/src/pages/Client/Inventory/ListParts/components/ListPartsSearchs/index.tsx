import { useContext, useRef, useState } from "react";
import styles from "./listpartssearchs.module.css";
import plusIcon from "src/assets/icons/plus-icon.svg";
import searchIcon from "src/assets/icons/search.svg";
import ListContentTable from "../ListPartsContent";
import errorIcon from "src/assets/icons/error.svg";
import AddPart from "../AddPart";
import { useAxios } from "src/hooks";
import { InventoryService } from "src/services";
import { InventoryContext } from "src/context/inventory";
import { debounce } from "lodash";
import DownloadExcel from "src/components/DownloadToExcel";

const ListPartsSearch = () => {
  const { setInventory, setSearch, setTotalPages, inventoryState } = useContext(InventoryContext)
  const [modalVisible, setModalVisible] = useState(false);
  const { callEndpoint } = useAxios();

  const debouncedValidate = useRef(
    debounce(async (searchValue: string) => {
      const response = await callEndpoint(
        InventoryService.search({ key: searchValue, page: 1 })
      );

      if(response && response.status === 200) {
        const { data } = response.data
        setInventory(data.inventory_items)
        setTotalPages(data.last_page)
      }
    }, 1000)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchValue = e.target.value;
    setSearch(searchValue);
    if (searchValue.length > 2) debouncedValidate.current(searchValue);
  };

  const handleReset = () => {
    setSearch("")
    debouncedValidate.current("");
    if (inventoryState.search.length) setSearch("");
  };

  const showModal = () => {
    setModalVisible(true);
  };

  return (
    <section className={styles.list_system}>
      <div className={styles.system_actions}>
        <div className={styles.input_search}>
          <input
            type="text"
            autoComplete="off"
            value={inventoryState.search}
            onChange={handleChange}
            placeholder="Buscar repuesto por nombre o referencia"
          />
          <button
            onClick={handleReset}
            className={`${styles.search_icon} ${
              inventoryState.search.length ? styles.active : ""
            }`}
          >
            <img
              src={inventoryState.search.length ? errorIcon : searchIcon}
              alt="Error icon"
            />
          </button>
        </div>
        <div className={styles.list_actions}>
          <button className="btn_black" onClick={showModal}>
            <img src={plusIcon} alt="Plus icon" /> Agregar repuesto
          </button>
          <DownloadExcel 
            service={async() =>{
              try {
                const res  = await callEndpoint(InventoryService.getAll("0"))
                if(res && res.status === 200) return res.data.data.inventory
              } catch (error) {
                console.log(error);
              }
            }} 
            title_sheet={"Listado de repuestos"} 
            table_headers={[
              "ID",
              "Nombre",
              "Referencia",
              "Cantidad",
              "Valor de la unidad¿",
              "Precio sin iva",
              "Precio con iva",
              "IVA",
              "Creado",
              "Actualizado",
            ]}          
          />
        </div>
      </div>

      {modalVisible && (
        <AddPart
          title={"Agregar"}
          id_item_inventory={0}
          closeModal={() => {
            debouncedValidate.current("");
            setModalVisible(false)
          }}
        />
      )}
      <ListContentTable />
    </section>
  );
};

export default ListPartsSearch;
