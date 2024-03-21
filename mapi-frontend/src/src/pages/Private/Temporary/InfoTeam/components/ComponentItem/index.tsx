import { ChangeEvent, useContext } from "react";
import { Component } from "src/interfaces";
import SystemItem from "../SystemItem";
import deleteIcon from "src/assets/icons/delete.svg";
import addIcon from "src/assets/icons/AddCompany.svg";
import styles from "./componentitem.module.css";
import { Alerts } from "src/lib";
import { UIContext } from "src/context";
import { useAxios } from "src/hooks";
import { ComponentService } from "src/services";

type Props = {
  index: number;
  component: Component;
  formik: any;
  addSystem: (index_component: number) => void;
  removeSystem: (index_component: number, index_system: number) => void;
  removeComponent: (index_component: number) => void;
};

const ComponentItem = ({
  index,
  component,
  formik,
  addSystem,
  removeSystem,
  removeComponent,
}: Props) => {
  const { toggleCheking } = useContext(UIContext);
  const { callEndpoint } = useAxios();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formik.setFieldValue(`components[${index}].${name}`, value);
  };

  const handleRemoveComponent = async () => {
    if (component.id_component) {
      const dialog = await Alerts.showConfirmDialog(
        "Esta a punto de eliminar un componente",
        "Recuerda que esta acción tambien eliminará todos los sistemas creados.",
        "question",
        "Eliminar"
      );
      if (dialog.isConfirmed) {
        toggleCheking();
        await callEndpoint(
          ComponentService.removeComponent(component.id_component)
        );
        removeComponent(index);
        toggleCheking();
      }
    } else {
      removeComponent(index);
    }
  };

  return (
    <li
      className={`animate__animated animate__fadeIn animate__faster ${styles.component_item}`}
    >
      <input
        className={
          formik &&
          formik.touched &&
          formik.errors.components &&
          formik.errors.components[index] &&
          formik.errors.components[index].component_code
            ? styles.error
            : ""
        }
        type="text"
        onChange={handleChange}
        onBlur={formik.handleBlur}
        placeholder="Código"
        name="component_code"
        value={formik.values.components[index].component_code}
      />
      <input
        className={
          formik &&
          formik.touched &&
          formik.errors.components &&
          formik.errors.components[index] &&
          formik.errors.components[index].component_name
            ? styles.error
            : ""
        }
        type="text"
        onChange={handleChange}
        onBlur={formik.handleBlur}
        placeholder="Nombre del componente"
        name="component_name"
        value={formik.values.components[index].component_name}
      />
      {!component.component_systems.length ? (
        <p>Aún no tiene sistemas</p>
      ) : (
        <p>{component.component_systems.length} sistemas</p>
      )}

      <div>
        <button
          onClick={handleRemoveComponent}
          type="button"
          className="btn_red"
        >
          Eliminar componente <img src={deleteIcon} alt="delete icon" />
        </button>
      </div>
      <div
        className={`${
          !component.component_systems.length ? styles.empty : ""
        } ${styles.list_systems}`}
      >
        <div>
          <ul>
            {component.component_systems.map((system, i) => (
              <SystemItem
                key={i}
                indexSystem={i}
                indexComponent={index}
                system={system}
                formik={formik}
                removeSystem={removeSystem}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.add_button}>
        <button
          type="button"
          onClick={() => addSystem(index)}
          className="btn_secondary"
        >
          <img src={addIcon} alt="Add icon" /> Agregar sistema
        </button>
      </div>
    </li>
  );
};

export default ComponentItem;
