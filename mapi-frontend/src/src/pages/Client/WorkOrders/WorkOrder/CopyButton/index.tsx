import styles from "./copybutton.module.css";

import React from "react";
import copy from "src/assets/icons/copy.svg";

interface CopyToClipboardButtonProps {
  text: string;
}

const CopyToClipboardButtons: React.FC<CopyToClipboardButtonProps> = ({
  text,
}) => {
  const copyToClipboards = () => {
    if (text) {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <>
      <span className={styles.copy_button}>
        {text}
        <img
          src={copy}
          alt="copy"
          onClick={copyToClipboards}
          style={{ cursor: "pointer" }}
        />
      </span>
    </>
  );
};

export default CopyToClipboardButtons;
