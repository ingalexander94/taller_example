import { useContext, useEffect, useState } from "react";
import { useFetch } from "src/hooks";
import { MapiResponse } from "src/interfaces";
import { UIContext } from "src/context/ui";
import circleError from "src/assets/icons/circle-error.svg";
import circleSuccess from "src/assets/icons/circle-success.svg";
import styles from "../steps.module.css";
import { AuthService } from "src/services";

type Props = {
  isValidCode: boolean | undefined;
  handleReset: () => void;
};

const Timer = ({ isValidCode, handleReset }: Props) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);
  const uiContext = useContext(UIContext);
  const { uiState } = uiContext;
  const { callEndpoint } = useFetch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = ((60 - timeRemaining) / 60) * 100;
  const strokeDashoffset = circumference * (1 - progress / 100);

  const resendCode = async () => {
    setLoading(true);
    const sendEmailRecovery: MapiResponse = await callEndpoint(
      AuthService.recoveryPassword(uiState.email)
    );
    if (!sendEmailRecovery.status) alert(sendEmailRecovery.error);
    else {
      setTimeRemaining(60);
    }
    setLoading(false);
  };

  return (
    <>
      <div className={styles.info_code}>
        {isValidCode === undefined && (
          <div className={styles.timer}>
            <svg width="70" height="70">
              <circle
                cx="35"
                cy="35"
                r={radius}
                stroke="#e50000"
                strokeWidth="5"
                fill="transparent"
              />
              <circle
                cx="35"
                cy="35"
                r={radius}
                stroke="#fce6e6"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <p>
              {timeRemaining} <span>seg</span>
            </p>
          </div>
        )}

        {isValidCode !== undefined && (
          <>
            <img
              onClick={handleReset}
              className={!isValidCode ? "cursor_pointer" : ""}
              src={isValidCode ? circleSuccess : circleError}
              alt="info icon"
              title={!isValidCode ? "Limpiar código" : ""}
            />
          </>
        )}
        {!isValidCode && <p>¿No recibiste el código?</p>}
      </div>
      {!isValidCode && (
        <button
          type="button"
          className={`btn_secondary ${loading ? "loading" : ""}`}
          onClick={resendCode}
          disabled={timeRemaining !== 0}
        >
          Reenviar código
          {loading && <i className="fas fa-spinner fa-pulse"></i>}
        </button>
      )}
    </>
  );
};

export default Timer;
