import { useState, useEffect, ChangeEvent } from "react";

import Loading from "src/assets/icons/loading.svg";
import styles from "./addtechnician.module.css";
import { useFormik } from "formik";

import { useAxios } from "src/hooks";
import { InventoryService } from "src/services";
import { AddItemInventoryValidatorForm } from "src/validators/additeminventory.validator";
import { Inventory } from "src/interfaces/inventory.interface";

type Props = {
  closeModal: () => void;
  title: string;
  id_item_inventory: number;
};

const AddPart = ({ closeModal, title, id_item_inventory }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>("");
  const [unitValue, setUnitValue] = useState<string>("");
  const [valueWithOutTax, setValueWithOutTax] = useState<string>("");
  const [valueWithTax, setValueWithTax] = useState<string>("");
  const { callEndpoint } = useAxios();

  const getItemInventory = async () => {
    const res = await callEndpoint(InventoryService.getDetail(id_item_inventory))
    if(res && res.status){
      const { data } = res.data;
      
      const dataWithNullsReplaced = Object.entries(data).reduce((newData:any, [key, value]) => {
        newData[key] = value === null ? 0 : value;
        return newData;
      }, {});
      
      formik.setValues(dataWithNullsReplaced)
      setValueWithOutTax(formatNumber(dataWithNullsReplaced.inventory_price_without_tax));
      setValueWithTax(formatNumber(dataWithNullsReplaced.inventory_price_with_tax));
      setUnitValue(formatNumber(dataWithNullsReplaced.inventory_units));
    };
  }

  useEffect(() => {
    if(id_item_inventory && id_item_inventory != undefined) getItemInventory();
  }, [id_item_inventory]);

  const formik = useFormik({
    initialValues: AddItemInventoryValidatorForm.initialState,
    validationSchema: AddItemInventoryValidatorForm.validatorSchemaAddItemInventory,
    validateOnMount: false,
    onSubmit: async (data: Inventory) => {
      if (currentId) data.id_inventory = currentId;

      setIsLoading(true);
      if (formik.isValid) {
        const response = await callEndpoint(InventoryService.save(data));
        if (response!.status) {
          closeModal();
          setCurrentId("");
          setIsLoading(false);
        }
      }
    },
  });

  const formatNumber = (value:any) => {
    const currency = Intl.NumberFormat("es-CO", { currency: 'COP'})
    return currency.format(value);
  }
  
  const calculateValueWithoutIva = (quantity_value:string, unit_value:string) => {
    if(unit_value === '' || quantity_value === '') return
    

    const result =  parseInt(unit_value) * parseInt(quantity_value);
    formik.setFieldValue('inventory_price_without_tax', result);
    setValueWithOutTax(formatNumber(result));
  }


  const handleQuantityOnChange = (e:any) => {
    formik.handleChange(e);
    calculateValueWithoutIva(formik.values.inventory_units, e.target.value)
  }

  const calculateIva = (e:any) => {
    const base_price = formik.values.inventory_price_without_tax;
    if (base_price != '') {
      const result = base_price + (parseInt(base_price) * (Number(e.target.value) ?? 0) / 100);
      setValueWithTax(formatNumber(result))
      formik.setFieldValue(
        "inventory_price_with_tax",
        result
      );
    }

    formik.handleChange(e);
  }

  const handleUnitValueOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");

    if (value.length > 16) {
      return;
    }

    if (value === "") {
      setUnitValue("")
      formik.setFieldValue("inventory_units", null);
      return;
    }

    const numericValue = parseInt(value);
    if (isNaN(numericValue)) {
      formik.setFieldValue(
        "inventory_units",
        e.target.value.replace(/[^0-9]/g, "")
      );
    }

    setUnitValue(formatNumber(value))
    formik.setFieldValue(
      "inventory_units",
      e.target.value.replace(/[^0-9]/g, "")
    );
    
    calculateValueWithoutIva(value, formik.values.inventory_quantity)
  };

  return (
    <article className={styles.container_modal}>
      <div onClick={closeModal} className={styles.overlay}></div>
      <div className={styles.modal}>
        <h2>{title} compra de repuesto</h2>
        <hr className={styles.line_body} />
        
        
        <form className={styles.form} onSubmit={formik.handleSubmit}autoComplete="off">
          <div style={{display: "none", position: "absolute"}} >
            <label form="id_inventory">Id del inventario</label>
            <input
              placeholder="Escribe el número del referente"
              onChange={formik.handleChange}
              value={formik.values.id_inventory}
              name="id_inventory"
              id="id_inventory"
              type="number"
            />
          </div>

          <div className={styles.content_form}>

            <div className={styles.formColumn}>
              <label form="inventory_reference">Número de referencia</label>
              <input
                placeholder="Escribe el número del referente"
                onChange={formik.handleChange}
                value={formik.values.inventory_reference}
                name="inventory_reference"
                id="inventory_reference"
                type="text"
              />
            </div>

            <div className={styles.formColumn}>
              <label htmlFor="inventory_quantity">Cantidad</label>
              <input 
                onChange={handleQuantityOnChange}
                value={formik.values.inventory_quantity}
                placeholder="Escribe la cantidad comprada" 
                name="inventory_quantity"
                id="inventory_quantity"
                type="number" />
            </div>
            <div className={styles.formColumn}>
              <label htmlFor="inventory_item_name">Nombre del repuesto</label>
              <input
                onChange={formik.handleChange}
                value={formik.values.inventory_item_name}
                name="inventory_item_name"
                id="inventory_item_name"
                placeholder="Escribe la descripción o el nombre del repuesto"
                type="text"
              />
            </div>
            <div className={styles.formColumn}>
              <label htmlFor="inventory_units">Valor de la unidad</label>
              <input 
                onChange={handleUnitValueOnChange}
                value={unitValue}
                placeholder="Escribe el número de la unidad" 
                name="inventory_units"
                id="inventory_units"
                type="text" />
            </div>
            <div className={styles.formColumn}>
              <label htmlFor="inventory_price_without_tax">Valor sin IVA</label>
              <input
                onChange={formik.handleChange}
                value={valueWithOutTax}
                placeholder="Escribe el valor del repuesto sin IVA"
                name="inventory_price_without_tax"
                id="inventory_price_without_tax"
                type="string"
                disabled
              />
            </div>
            <div className={styles.formColumn}>
              <label htmlFor="inventory_tax">IVA</label>
              <input 
                onChange={calculateIva}
                value={formik.values.inventory_tax}
                placeholder="Escribe el valor del IVA" 
                name="inventory_tax"
                id="inventory_tax"
                type="number" />
            </div>
            <div className={styles.formColumn}>
              <label htmlFor="inventory_price_with_tax">Valor con IVA</label>
              <input
                onChange={formik.handleChange}
                value={valueWithTax}
                name="inventory_price_with_tax"
                id="inventory_price_with_tax"
                placeholder="$0"
                className={styles.input_dark}
                type="number"
                disabled
              />
            </div>
          </div>
          <div className={styles.formButtons}>
            <button
              type="button"
              className={styles.btn_cancel}
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.btn_keep}
              disabled={!formik.isValid || !formik.dirty}
            >
              Guardar repuesto
              <img
                className={`${!isLoading ? styles.hidden : ""}`}
                src={Loading}
                alt=""
              />
            </button>
          </div>
        </form>


      </div>
    </article>
  );
};

export default AddPart;
