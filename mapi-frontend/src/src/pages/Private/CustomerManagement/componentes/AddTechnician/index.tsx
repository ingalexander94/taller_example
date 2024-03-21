import { useEffect, useState, ChangeEvent } from "react";
import styles from "./addtechnician.module.css";

type Props = {
  closeModal: () => void;
  title: string;
};

const AddTechnician = ({ closeModal }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  const [description, setDescription] = useState<string>("");
  const [charCount, setCharCount] = useState<number>(0);
  const [salary, setSalary] = useState<string>("");
  const maxChars = 200;
  const isDescriptionExceeded = charCount > maxChars;

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);
    setCharCount(value.length);
  };

  const handleSalaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setSalary(value);
  };

  return (
    <article className={styles.container_modal}>
      <div onClick={closeModal} className={styles.overlay}></div>
      <div className={styles.modal}>
        <h2>Crear nuevo cliente</h2>
        <hr className={styles.line_body} />
        <form className={styles.form}>
          <div className={styles.formColumn}>
            <label htmlFor="tipoTecnico">Tipo de Técnico</label>
            <select
              id="tipoTecnico"
              name="tipoTecnico"
              className={styles.select}
            >
              <option value="tipo1">Selecciona un tipo</option>
              <option value="tipo2">Selecciona un tipo 2</option>
            </select>
          </div>

          <div className={styles.formColumn}>
            <label htmlFor="codigo">Asignar código del técnico</label>
            <input
              placeholder="Asigna un código, ejemplo 1MA1"
              type="text"
              id="codigo"
              name="codigo"
              className={styles.intput}
            />
          </div>

          <div className={styles.formColumn}>
            <label htmlFor="nivelEducativo">Nivel de educación</label>
            <input
              placeholder="Definir el nivel educativo"
              type="text"
              id="nivelEducativo"
              name="nivelEducativo"
              className={styles.intput}
            />
          </div>

          <div
            className={`${styles.formGroup} ${
              isDescriptionExceeded ? styles.exceeded : ""
            }`}
          >
            <label htmlFor="descripcionOperacion">Título del campo</label>
            <textarea
              className={styles.textarea}
              id="descripcionOperacion"
              name="descripcionOperacion"
              placeholder="Escribe aquí la descripción de la operación"
              value={description}
              onChange={handleDescriptionChange}
              maxLength={maxChars}
            />

            <h3
              className={`${charCount === 200 ? styles.exceeded : ""} ${
                styles.number_total
              }`}
            >
              {charCount === 200 && (
                <p className={styles.warning_message}>
                  Se ha excedido el límite de caracteres.
                </p>
              )}
              {charCount}/{maxChars}
            </h3>
          </div>

          <div className={styles.formColumn}>
            <label htmlFor="nivelEducativo">Salario básico</label>
            <input
              placeholder="$0"
              type="text"
              id="nivelEducativo"
              name="nivelEducativo"
              value={salary}
              onChange={handleSalaryChange}
              className={styles.intputs}
            />
          </div>
        </form>
        <div className={styles.formButtons}>
          <button
            type="button"
            className={styles.btn_cancel}
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.btn_keep}>
            Crear nuevo cliente
          </button>
        </div>
      </div>
    </article>
  );
};

export default AddTechnician;
