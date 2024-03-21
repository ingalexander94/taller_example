import { useContext } from "react";
import { UIContext } from "src/context/ui";
import Slider from "src/components/UI/Slider";
import StepOne from "src/components/Recovery/StepOne";
import StepTwo from "src/components/Recovery/StepTwo";
import StepThree from "src/components/Recovery/StepThree";
import logo from "src/assets/logo.svg";
import styles from "../auth.module.css";

const currentYear = new Date().getFullYear();

const Recovery = () => {
  const uiContext = useContext(UIContext);
  const { uiState } = uiContext;

  return (
    <article
      className={`animate__animated animate__fadeIn ${styles.authentication}`}
    >
      <section className={styles.authentication__wrapper}>
        <img src={logo} alt="Logo" />
        {uiState.step == 1 && <StepOne />}
        {uiState.step == 2 && <StepTwo />}
        {uiState.step == 3 && <StepThree />}
        <p>© {currentYear} Todos los derechos reservados.</p>
      </section>
      <Slider />
    </article>
  );
};

export default Recovery;
