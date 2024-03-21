import React, { useState } from "react";
import Copy from "src/assets/icons/copyButton.svg";
import styles from "./copybutton.module.css";

const CopyInput: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(inputValue);
  };

  return (
    <div className={styles.content_button}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Escribe algo aquí"
      />
      <button type="button" onClick={handleCopyClick}>
        <img src={Copy} alt="icon" />
      </button>
    </div>
  );
};

export default CopyInput;
