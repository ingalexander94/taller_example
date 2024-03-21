import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { Brand } from "src/interfaces";
import ModelItem from "../ModelItem";
import addIcon from "src/assets/icons/AddCompany.svg";
import deleteIcon from "src/assets/icons/delete.svg";
import styles from "./brandItem.module.css";
import { debounce } from "lodash";
import { useAxios } from "src/hooks";
import { UIContext } from "src/context";
import { BrandService } from "src/services";
import { Alerts } from "src/lib";

type Props = {
  index: number;
  brand: Brand;
  formik: any;
  addModel: (index_brand: number) => void;
  removeBrand: (index_brand: number) => void;
  removeModel: (index_brand: number, index_modal: number) => void;
};

const BrandItem = ({
  index,
  brand,
  formik,
  addModel,
  removeModel,
  removeBrand,
}: Props) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(brand.id_brand === 0);
  const { toggleCheking } = useContext(UIContext);
  const { callEndpoint } = useAxios();

  const debouncedValidateEmail = useRef(
    debounce(async (brand_name: string) => {
      const res = await callEndpoint(
        BrandService.getCode(brand_name, brand.brand_code, brand.brand_team)
      );
      if (res) {
        const { data } = res.data;
        if (data.isValid) {
          brand.brand_code = data.brand_code;
          brand.brand_name = brand_name;
          formik.setFieldValue(`brands[${index}].brand_code`, data.brand_code);
        } else {
          Alerts.showToast("error", "Ya existe una marca con ese nombre");
        }
        setIsDisabled(!data.isValid);
      }
    }, 1000)
  );

  useEffect(() => {
    return () => {
      debouncedValidateEmail.current.cancel();
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formik.setFieldValue(`brands[${index}].${name}`, value);
    debouncedValidateEmail.current(value);
  };

  const handleRemoveBrand = async () => {
    if (brand.id_brand) {
      const dialog = await Alerts.showConfirmDialog(
        "Esta a punto de eliminar una marca",
        "Recuerda que esta acción tambien eliminará todos los modelos creados.",
        "question",
        "Eliminar"
      );
      if (dialog.isConfirmed) {
        toggleCheking();
        await callEndpoint(BrandService.removeBrand(brand.id_brand));
        removeBrand(index);
        toggleCheking();
      }
    } else {
      removeBrand(index);
    }
  };

  return (
    <li
      className={`animate__animated animate__fadeIn animate__faster ${styles.brand_item}`}
    >
      <div className={styles.name_model}>
        <label htmlFor={`brand${brand.brand_code}`}>
          {formik.values.brands[index].brand_code}
        </label>
        <input
          className={
            formik &&
            formik.touched &&
            formik.errors.brands &&
            formik.errors.brands[index] &&
            formik.errors.brands[index].brand_name
              ? styles.error
              : ""
          }
          id={`brand${brand.brand_code}`}
          name="brand_name"
          type="text"
          onChange={handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.brands[index].brand_name}
          placeholder="Escribir el nombre de la marca"
        />
        <button onClick={handleRemoveBrand} type="button" className="btn_red">
          Eliminar marca <img src={deleteIcon} alt="Delete icon" />
        </button>
      </div>
      <div className={styles.list_models}>
        <div className={styles.header}>
          <div>Código</div>
          <div>Modelo</div>
          <div>Periodo de fabricación</div>
          <div>Motor</div>
          <div>Transmisión</div>
          <div>Suspensión</div>
          <div>Puente trasero</div>
          <div>Aplicación</div>
        </div>
        {brand.brand_models.map((model, i) => (
          <ModelItem
            key={i}
            disabled={isDisabled}
            indexBrand={index}
            indexModel={i}
            model={model}
            formik={formik}
            removeModel={removeModel}
          />
        ))}
      </div>
      <div className={styles.add_model}>
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => addModel(index)}
          className="btn_red"
        >
          <img src={addIcon} alt="Add icon" /> Agregar modelo
        </button>
      </div>
    </li>
  );
};

export default BrandItem;
