import { useState, FocusEvent, ChangeEvent } from "react";
import { useAxios } from "src/hooks";
import styles from "./inputname.module.css";

import Error from "src/assets/icons/error.svg";
import { InventoryService } from "src/services";
import TextInfo from "src/components/UI/TextInfo";

type Props = {
  initialValue: string | null;
  formik: any;
};

const InputValidateReference = ({ formik, initialValue }: Props) => {
  const { callEndpoint } = useAxios();
  const [inputState, setInputsState] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const ValidateReference = async (ref: string) => {
    if(initialValue == formik.values.inventory_reference ) return
    const response = await callEndpoint(InventoryService.verifyRef(ref));
    if (!response!.data.status) {
      setErrorMessage(response!.data.data.message);
    }

    setInputsState(response!.data.status);
  };

  const handleFocusEvent = (e: FocusEvent<HTMLInputElement>) => {
    if(e.target.value.trim() === ""){
      setInputsState(false);
      setErrorMessage("El campo no puede estar vacío");
    };
    if (initialValue != e.target.value && e.target.value)
    ValidateReference(e.target.value);
  };

  const handleCustomChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    setInputsState(true);
  };

  const handleClick = () => {
    formik.values.inventory_reference = "";
    setInputsState(true);
  };

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor="inventory_reference">Número de referencia</label>
      <input
        type="text"
        name="inventory_reference"
        id="inventory_reference"
        placeholder="Escribe el tipo de técnico"
        autoComplete="off"
        value={formik.values.inventory_reference}
        onBlur={(e) => {
          formik.handleBlur;
          handleFocusEvent(e);
        }}
        onChange={handleCustomChange}
        className={`${!inputState ? styles.inputError : ""} ${styles.intput}`}
      />
      <img
        className={`${inputState ? styles.hidden : ""}`}
        src={Error}
        onClick={handleClick}
        alt=""
      />
      <span
      style={{marginTop: "5px"}}
        className={`${inputState ? styles.hidden : ""} ${styles.errorMessage}`}
      >
         <TextInfo
            loading={false}
            success={""}
            error={errorMessage ?? ""}
          />
      </span>
    </div>
  );
};

export default InputValidateReference;
