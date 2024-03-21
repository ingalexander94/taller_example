import React, { useRef } from "react";
import copy from "src/assets/icons/copy.svg";
import styles from "./copy.module.css";

interface CopyToClipboardButtonProps {
  text: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  text,
}) => {
  const badgeRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    if (badgeRef.current) {
      badgeRef.current.style.visibility = "visible";
      badgeRef.current.classList.add("animate__fadeIn");
      badgeRef.current.classList.remove("animate__fadeOut");
      if (text) {
        navigator.clipboard?.writeText(text);
      }
      setTimeout(() => {
        if (badgeRef.current) {
          badgeRef.current.classList.remove("animate__fadeIn");
          badgeRef.current.classList.add("animate__fadeOut");
        }
      }, 1500);
    }
  };

  return (
    <>
      <span
        className={styles.copy}
        title="Copiar texto"
        onClick={copyToClipboard}
      >
        <span className={styles.copy_btn}>
          <span ref={badgeRef} className={`animate__animated ${styles.badge}`}>
            Copiado
          </span>
          <img src={copy} alt="copy" style={{ cursor: "pointer" }} />
        </span>
        {text}
      </span>
    </>
  );
};

export default CopyToClipboardButton;
