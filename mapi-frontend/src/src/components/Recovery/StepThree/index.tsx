import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useFetch } from "src/hooks";
import { CustomStorage } from "src/lib";
import { privateRoutes } from "src/models";
import { LoginResponse } from "src/interfaces";
import { ForgotValidatorForm } from "src/validators";
import { SettingsContext } from "src/context/settings";
import { UIContext } from "src/context/ui";
import { AuthContext } from "src/context/auth";
import TextInfo from "src/components/UI/TextInfo";
import eye from "src/assets/icons/eye.svg";
import noEye from "src/assets/icons/no-eye.svg";
import styles from "../steps.module.css";
import { AuthService } from "src/services";
import { getSubdomain } from "src/utilities";

const subdomain = getSubdomain();
const redirectUrl =
  subdomain === "" ? privateRoutes.PRIVATE : privateRoutes.CLIENT;

const StepThree = () => {
  const settingsContext = useContext(SettingsContext);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const {
    settingsState: { translated_text },
  } = settingsContext;

  const uiContext = useContext(UIContext);
  const { uiState, setEmail, setCode, setStep } = uiContext;

  const { callEndpoint } = useFetch();

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: ForgotValidatorForm.initialState,
    validationSchema: ForgotValidatorForm.validatorSchemaForgot,
    validateOnMount: false,
    onSubmit: async ({ new_password }) => {
      if (formik.isValid) {
        setLoading(true);
        const updatePassword: LoginResponse = await callEndpoint(
          AuthService.updatePassword(uiState.email, new_password, uiState.code)
        );
        const isValid = updatePassword.status;
        if (!isValid) alert(updatePassword.error);
        else {
          if (updatePassword.data) {
            CustomStorage.removeRemember();
            CustomStorage.removeData();
            CustomStorage.token = updatePassword.data.token;
            authContext.setUserAuth(updatePassword.data.user);
            setCode("");
            setEmail("");
            setStep(1);
            navigate(`/${redirectUrl}`, { replace: true });
          }
        }
        setLoading(false);
      }
    },
  });

  const handleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <form
      className={`animate__animated animate__fadeIn ${styles.step}`}
      onSubmit={formik.handleSubmit}
      autoComplete="off"
    >
      <div className={styles.authentication__input}>
        <label htmlFor="new_password">{translated_text.new_password}</label>
        <input
          className={
            formik.touched.new_password && formik.errors.new_password
              ? "invalid show"
              : ""
          }
          type={showNewPassword ? "text" : "password"}
          id="new_password"
          autoComplete="off"
          name="new_password"
          placeholder={translated_text.write_new_password}
          onBlur={formik.handleBlur}
          value={formik.values.new_password}
          onChange={formik.handleChange}
        />
        {showNewPassword ? (
          <img onClick={handleShowNewPassword} src={eye} alt="eye icon" />
        ) : (
          <img onClick={handleShowNewPassword} src={noEye} alt="eye icon" />
        )}
        {formik.touched.new_password && formik.errors.new_password ? (
          <TextInfo
            loading={false}
            success={""}
            error={formik.errors.new_password ?? ""}
          />
        ) : (
          <span></span>
        )}
      </div>
      <div className={styles.authentication__input}>
        <label htmlFor="confirm_password">
          {translated_text.confirm_password}
        </label>
        <input
          className={
            formik.touched.confirm_password && formik.errors.confirm_password
              ? "invalid show"
              : ""
          }
          type={showConfirmPassword ? "text" : "password"}
          id="confirm_password"
          name="confirm_password"
          autoComplete="off"
          placeholder={translated_text.write_confirm_password}
          onBlur={formik.handleBlur}
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
        />
        {showConfirmPassword ? (
          <img onClick={handleShowConfirmPassword} src={eye} alt="eye icon" />
        ) : (
          <img onClick={handleShowConfirmPassword} src={noEye} alt="eye icon" />
        )}
        {formik.touched.confirm_password && formik.errors.confirm_password ? (
          <TextInfo
            loading={false}
            success=""
            error={formik.errors.confirm_password ?? ""}
          />
        ) : (
          <span></span>
        )}
      </div>

      <div className={styles.list_rules}>
        <h4>Tu contraseña debería tener</h4>
        <ul>
          <li
            className={
              formik.touched.new_password
                ? formik.values.new_password.length >= 10
                  ? styles.success
                  : styles.error
                : ""
            }
          >
            10 dígitos
          </li>
          <li
            className={
              formik.touched.new_password
                ? /[A-Z]/.test(formik.values.new_password)
                  ? styles.success
                  : styles.error
                : ""
            }
          >
            Por lo menos una mayúscula
          </li>
          <li
            className={
              formik.touched.new_password
                ? /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(
                    formik.values.new_password
                  )
                  ? styles.success
                  : styles.error
                : ""
            }
          >
            Por lo menos 1 carácter especial
          </li>
          <li
            className={
              formik.touched.new_password
                ? /\d/.test(formik.values.new_password)
                  ? styles.success
                  : styles.error
                : ""
            }
          >
            Por lo menos un número
          </li>
        </ul>
      </div>

      <button
        className={loading ? "loading" : ""}
        type="submit"
        disabled={!formik.dirty || !formik.isValid}
      >
        {translated_text.login}
        {loading && <i className="fas fa-spinner fa-pulse"></i>}
      </button>
    </form>
  );
};

export default StepThree;
