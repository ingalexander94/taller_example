import styles from "./textinfo.module.css";

type Props = {
  loading: boolean;
  error: string;
  success: string;
};

const TextInfo = ({ loading, error, success }: Props) => {
  return (
    <span
      className={`${styles.text_info} ${
        error ? styles.text_error : styles.text_success
      }`}
    >
      {loading ? (
        <span>
          <i className="fas fa-spinner fa-pulse"></i> Cargando
        </span>
      ) : (
        <>
          {error ? <i className="fas fa-times"></i> : ""}
          {success ? <i className="fas fa-check"></i> : ""}
          {error || success}
        </>
      )}
    </span>
  );
};

export default TextInfo;
