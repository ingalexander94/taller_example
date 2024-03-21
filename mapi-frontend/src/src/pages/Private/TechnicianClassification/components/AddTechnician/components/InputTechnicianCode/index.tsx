import { useState, FocusEvent, ChangeEvent } from "react";
import { useAxios } from "src/hooks";
import { TechnicianService } from "src/services/technician.service";
import styles from "../InputTechnicianName/inputname.module.css";

import Error from "../../../../../../../assets/icons/error.svg";
import ErrorX from "../../../../../../../assets/icons/x.svg";

type Props = {
  initialValue: string | null;
  formik: any;
}

const InputTechnicianCode = ({formik,initialValue}: Props) => {
  const { callEndpoint } = useAxios();
  const [inputState, setInputsState] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const ValidateTechnicianCode = async (code: string) => {
    const response = await callEndpoint(TechnicianService.verifyCode(code));
    if(!response!.data.status) setErrorMessage(response!.data.data.message)
    setInputsState(response!.data.status);
  };

  const handleFocusEvent = (e: FocusEvent<HTMLInputElement>) => {
    if (initialValue != e.target.value && e.target.value) ValidateTechnicianCode(e.target.value);
  };

  const handleCustomChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e)
    setInputsState(true);
  }

  const handleClick = () => {
    formik.values.technician_code = ""
    setInputsState(true);
  };

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor="tipoTecnico">Asignar código del técnico</label>
      <input
        type="text"
        name="technician_code"
        id="technician_code"
        placeholder="Asigna un código, ejemplo 1MA1"
        value={formik.values.technician_code}
        onBlur={(e)=>{
          formik.handleBlur
          handleFocusEvent(e)
        }}
        onChange={handleCustomChange}
        className={`${!inputState ? styles.inputError : ""} ${styles.intput}`}
      />
      <img className={`${inputState ? styles.hidden : ""}`} src={Error} onClick={handleClick} alt="" />
      <span className={`${inputState ? styles.hidden : ""} ${styles.errorMessage}`}>
        <img src={ErrorX} alt="" /> {errorMessage}
      </span>
    </div>
  );
};

export default InputTechnicianCode;
