import { Model } from "src/interfaces";
import deleteIcon from "src/assets/icons/delete.svg";
import styles from "./modelitem.module.css";
import { ChangeEvent, useContext } from "react";
import { useAxios } from "src/hooks";
import { BrandService } from "src/services";
import { UIContext } from "src/context";
import { Alerts } from "src/lib";

type Props = {
  indexBrand: number;
  indexModel: number;
  model: Model;
  formik: any;
  disabled: boolean;
  removeModel: (index_brand: number, index_modal: number) => void;
};

const currentYear = new Date().getFullYear() + 1;

const ModelItem = ({
  indexBrand,
  indexModel,
  model,
  formik,
  disabled,
  removeModel,
}: Props) => {
  const { callEndpoint } = useAxios();

  const { toggleCheking } = useContext(UIContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formik.setFieldValue(
      `brands[${indexBrand}].brand_models[${indexModel}].${name}`,
      value
    );
  };

  const handleDeleteModel = async () => {
    if (model.id_model) {
      const dialog = await Alerts.showConfirmDialog(
        "Está a punto de eliminar un modelo",
        "No se podrá recuperar la información",
        "question",
        "Eliminar"
      );
      if (dialog.isConfirmed) {
        toggleCheking();
        await callEndpoint(BrandService.removeModel(model.id_model));
        removeModel(indexBrand, indexModel);
        toggleCheking();
      }
    } else {
      removeModel(indexBrand, indexModel);
    }
  };

  return (
    <div
      className={`animate__animated animate__fadeIn animate__faster ${styles.inputs}`}
    >
      <label htmlFor={`model${model.model_code}`}>{model.model_code}</label>
      <input
        className={
          formik &&
          formik.touched &&
          formik.errors.brands &&
          formik.errors.brands[indexBrand] &&
          formik.errors.brands[indexBrand].brand_models &&
          formik.errors.brands[indexBrand].brand_models[indexModel] &&
          formik.errors.brands[indexBrand].brand_models[indexModel].model_name
            ? styles.error
            : ""
        }
        disabled={disabled}
        placeholder="Asignar código"
        id={`model${model.model_code}`}
        name="model_name"
        type="text"
        onChange={handleChange}
        onBlur={formik.handleBlur}
        value={
          formik.values.brands[indexBrand].brand_models[indexModel].model_name
        }
      />
      <fieldset>
        <input
          className={
            formik &&
            formik.touched &&
            formik.errors.brands &&
            formik.errors.brands[indexBrand] &&
            formik.errors.brands[indexBrand].brand_models &&
            formik.errors.brands[indexBrand].brand_models[indexModel] &&
            formik.errors.brands[indexBrand].brand_models[indexModel]
              .model_init_year
              ? styles.error
              : ""
          }
          disabled={disabled}
          type="number"
          min={1900}
          max={currentYear}
          placeholder="Año inicial"
          name="model_init_year"
          onChange={handleChange}
          onBlur={formik.handleBlur}
          value={
            formik.values.brands[indexBrand].brand_models[indexModel]
              .model_init_year ?? ""
          }
        />
        <input
          className={
            formik &&
            formik.touched &&
            formik.errors.brands &&
            formik.errors.brands[indexBrand] &&
            formik.errors.brands[indexBrand].brand_models &&
            formik.errors.brands[indexBrand].brand_models[indexModel] &&
            formik.errors.brands[indexBrand].brand_models[indexModel]
              .model_final_year
              ? styles.error
              : ""
          }
          disabled={disabled}
          type="number"
          min={1900}
          max={currentYear}
          placeholder="Año final"
          name="model_final_year"
          onChange={handleChange}
          onBlur={formik.handleBlur}
          value={
            formik.values.brands[indexBrand].brand_models[indexModel]
              .model_final_year ?? ""
          }
        />
      </fieldset>
      <input
        className={
          formik &&
          formik.touched &&
          formik.errors.brands &&
          formik.errors.brands[indexBrand] &&
          formik.errors.brands[indexBrand].brand_models &&
          formik.errors.brands[indexBrand].brand_models[indexModel] &&
          formik.errors.brands[indexBrand].brand_models[indexModel].model_engine
            ? styles.error
            : ""
        }
        disabled={disabled}
        type="text"
        placeholder="Nombre del motor"
        name="model_engine"
        onChange={handleChange}
        onBlur={formik.handleBlur}
        value={
          formik.values.brands[indexBrand].brand_models[indexModel].model_engine
        }
      />
      <input
        className={
          formik &&
          formik.touched &&
          formik.errors.brands &&
          formik.errors.brands[indexBrand] &&
          formik.errors.brands[indexBrand].brand_models &&
          formik.errors.brands[indexBrand].brand_models[indexModel] &&
          formik.errors.brands[indexBrand].brand_models[indexModel]
            .model_transmission
            ? styles.error
            : ""
        }
        disabled={disabled}
        type="text"
        placeholder="Asigna un nombre al equipo"
        name="model_transmission"
        onChange={handleChange}
        onBlur={formik.handleBlur}
        value={
          formik.values.brands[indexBrand].brand_models[indexModel]
            .model_transmission
        }
      />
      <input
        className={
          formik &&
          formik.touched &&
          formik.errors.brands &&
          formik.errors.brands[indexBrand] &&
          formik.errors.brands[indexBrand].brand_models &&
          formik.errors.brands[indexBrand].brand_models[indexModel] &&
          formik.errors.brands[indexBrand].brand_models[indexModel]
            .model_suspension
            ? styles.error
            : ""
        }
        disabled={disabled}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        value={
          formik.values.brands[indexBrand].brand_models[indexModel]
            .model_suspension
        }
        name="model_suspension"
        type="text"
        placeholder="Suspensión"
      />
      <input
        className={
          formik &&
          formik.touched &&
          formik.errors.brands &&
          formik.errors.brands[indexBrand] &&
          formik.errors.brands[indexBrand].brand_models &&
          formik.errors.brands[indexBrand].brand_models[indexModel] &&
          formik.errors.brands[indexBrand].brand_models[indexModel]
            .model_rear_bridge
            ? styles.error
            : ""
        }
        disabled={disabled}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        value={
          formik.values.brands[indexBrand].brand_models[indexModel]
            .model_rear_bridge
        }
        name="model_rear_bridge"
        type="text"
        placeholder="Escribe un nombre"
      />
      <input
        className={
          formik &&
          formik.touched &&
          formik.errors.brands &&
          formik.errors.brands[indexBrand] &&
          formik.errors.brands[indexBrand].brand_models &&
          formik.errors.brands[indexBrand].brand_models[indexModel] &&
          formik.errors.brands[indexBrand].brand_models[indexModel]
            .model_application
            ? styles.error
            : ""
        }
        disabled={disabled}
        type="text"
        placeholder="Ingresar una aplicación"
        name="model_application"
        onChange={handleChange}
        onBlur={formik.handleBlur}
        value={
          formik.values.brands[indexBrand].brand_models[indexModel]
            .model_application
        }
      />
      <button
        onClick={handleDeleteModel}
        type="button"
        disabled={disabled}
        className="btn_red"
      >
        <img src={deleteIcon} alt="Delete icon" />
      </button>
    </div>
  );
};

export default ModelItem;
