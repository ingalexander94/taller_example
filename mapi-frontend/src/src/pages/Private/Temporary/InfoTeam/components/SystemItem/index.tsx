import deleteIcon from "src/assets/icons/delete.svg";
import styles from "./systemitem.module.css";
import { System } from "src/interfaces";
import { ChangeEvent, useContext } from "react";
import { Alerts } from "src/lib";
import { UIContext } from "src/context";
import { useAxios } from "src/hooks";
import { ComponentService } from "src/services";

type Props = {
  indexComponent: number;
  indexSystem: number;
  system: System;
  formik: any;
  removeSystem: (index_component: number, index_system: number) => void;
};

const SystemItem = ({
  indexComponent,
  indexSystem,
  system,
  formik,
  removeSystem,
}: Props) => {
  const { toggleCheking } = useContext(UIContext);
  const { callEndpoint } = useAxios();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formik.setFieldValue(
      `components[${indexComponent}].component_systems[${indexSystem}].${name}`,
      value
    );
  };

  const handleDeleteSystem = async () => {
    if (system.id_system) {
      const dialog = await Alerts.showConfirmDialog(
        "Esta a punto de eliminar un sistema",
        "No se podrá recuperar la información",
        "question",
        "Eliminar"
      );
      if (dialog.isConfirmed) {
        toggleCheking();
        await callEndpoint(ComponentService.removeSystem(system.id_system));
        removeSystem(indexComponent, indexSystem);
        toggleCheking();
      }
    } else {
      removeSystem(indexComponent, indexSystem);
    }
  };

  return (
    <li
      className={`animate__animated animate__fadeIn animate__faster ${styles.system_item}`}
    >
      <input
        className={
          formik &&
          formik.touched &&
          formik.errors.components &&
          formik.errors.components[indexComponent] &&
          formik.errors.components[indexComponent].component_systems &&
          formik.errors.components[indexComponent].component_systems[
            indexSystem
          ] &&
          formik.errors.components[indexComponent].component_systems[
            indexSystem
          ].system_code
            ? styles.error
            : ""
        }
        type="text"
        placeholder="Código"
        name="system_code"
        onChange={handleChange}
        onBlur={formik.handleBlur}
        value={
          formik.values.components[indexComponent].component_systems[
            indexSystem
          ].system_code
        }
      />
      <input
        className={
          formik &&
          formik.touched &&
          formik.errors.components &&
          formik.errors.components[indexComponent] &&
          formik.errors.components[indexComponent].component_systems &&
          formik.errors.components[indexComponent].component_systems[
            indexSystem
          ] &&
          formik.errors.components[indexComponent].component_systems[
            indexSystem
          ].system_name
            ? styles.error
            : ""
        }
        type="text"
        placeholder="Nombre del sistema"
        name="system_name"
        onChange={handleChange}
        onBlur={formik.handleBlur}
        value={
          formik.values.components[indexComponent].component_systems[
            indexSystem
          ].system_name
        }
      />
      <button onClick={handleDeleteSystem} type="button" className="btn_red">
        Eliminar sistema <img src={deleteIcon} alt="Delete Icon" />
      </button>
    </li>
  );
};

export default SystemItem;
