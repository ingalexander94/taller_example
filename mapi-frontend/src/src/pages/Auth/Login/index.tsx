import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { debounce } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "src/models";
import { useFetch } from "src/hooks";
import { CustomStorage } from "src/lib";
import { LoginValidator } from "src/validators";
import {
  LoginResponse,
  LoginUser,
  MapiResponse,
  ValidateInput,
} from "src/interfaces";
import { AuthContext } from "src/context/auth";
import Slider from "src/components/UI/Slider";
import TextInfo from "src/components/UI/TextInfo";
import logo from "src/assets/logo.svg";
import eye from "src/assets/icons/eye.svg";
import noEye from "src/assets/icons/no-eye.svg";
import errorIcon from "src/assets/icons/error.svg";
import styles from "../auth.module.css";
import { AuthService } from "src/services";
import { getSubdomain } from "src/utilities";

const currentYear = new Date().getFullYear();

const INITIAL_VALIDATION_STATE: ValidateInput = {
  value: "",
  error: "",
  success: "",
  loading: false,
};

const subdomain = getSubdomain();
const redirectUrl =
  subdomain === "" ? privateRoutes.PRIVATE : privateRoutes.CLIENT;

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const initialized = useRef<boolean>(false);

  const [email, setEmail] = useState<ValidateInput>(INITIAL_VALIDATION_STATE);
  const [password, setPassword] = useState<ValidateInput>(
    INITIAL_VALIDATION_STATE
  );
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const [remember, setRemember] = useState<boolean>(
    CustomStorage.remember === "1"
  );

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const [emailLocal, passwordLocal] = CustomStorage.getData();
      if (CustomStorage.remember === "1") {
        setIsEmailValid(true);
        setIsPasswordValid(true);
      }
      setEmail((current) => ({ ...current, value: emailLocal }));
      setPassword((current) => ({ ...current, value: passwordLocal }));
    }
    return () => {};
  }, []);

  const [show, setShow] = useState<boolean>(false);
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);
  const { callEndpoint } = useFetch();

  const passwordRef = useRef<HTMLInputElement | null>(null);

  const debouncedValidateEmail = useRef(
    debounce(async (emailValue: string) => {
      setEmail((current) => ({ ...current, value: emailValue, loading: true }));
      const validateEmail: MapiResponse = await callEndpoint(
        AuthService.validateEmail(emailValue)
      );
      const isValid = validateEmail.status;
      setIsEmailValid(isValid);
      setTimeout(() => {
        if (isValid) passwordRef.current?.focus();
      }, 0);
      setEmail((current) => ({
        ...current,
        loading: false,
        error: !isValid ? "Este usuario no ha sido creado" : "",
        success: isValid ? "Correo confirmado" : "",
      }));
    }, 1000)
  );

  const debouncedValidatePassword = useRef(
    debounce(async (emailValue: string, passwordValue: string) => {
      setPassword((current) => ({
        ...current,
        value: passwordValue,
        loading: true,
      }));
      const validateEmail: LoginResponse = await callEndpoint(
        AuthService.login(emailValue, passwordValue)
      );
      const isValid = validateEmail.status;
      setIsPasswordValid(isValid);
      if (isValid) setLoginUser(validateEmail.data);
      setPassword((current) => ({
        ...current,
        loading: false,
        error: !isValid ? "La contraseña es incorrecta" : "",
        success: isValid ? "Contraseña correcta" : "",
      }));
    }, 1000)
  );

  useEffect(() => {
    return () => {
      debouncedValidateEmail.current.cancel();
      debouncedValidatePassword.current.cancel();
    };
  }, []);

  const handleShow = () => setShow(!show);

  const handleResetEmail = () => {
    setEmail((current) => ({ ...current, value: "", error: "" }));
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setRemember(checked);
    if (checked) {
      const data = [email.value, password.value];
      CustomStorage.data = JSON.stringify(data);
      CustomStorage.remember = "1";
    } else {
      CustomStorage.removeData();
      CustomStorage.removeRemember();
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    const isValidFormat = LoginValidator.validateEmail(newEmail);
    let error = !newEmail
      ? "El correo es necesario"
      : !isValidFormat
      ? "No es un correo válido"
      : "";
    setLoginUser(null);
    setEmail((current) => ({
      ...current,
      value: newEmail,
      error,
      success: "",
    }));
    setPassword((current) => ({
      ...current,
      value: "",
      error: "",
      success: "",
    }));
    setIsEmailValid(false);
    setIsPasswordValid(false);
    setRemember(false);
    CustomStorage.removeRemember();
    CustomStorage.removeData();
    if (isValidFormat) debouncedValidateEmail.current(newEmail);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    const isValidFormat = LoginValidator.validatePassword(newPassword);
    let error = !newPassword
      ? "La contraseña es necesaria"
      : !isValidFormat
      ? "No es una contraseña válida"
      : "";
    setLoginUser(null);
    setIsPasswordValid(false);
    setPassword((current) => ({
      ...current,
      value: newPassword,
      error,
      success: "",
    }));
    setRemember(false);
    CustomStorage.removeRemember();
    CustomStorage.removeData();
    if (isValidFormat)
      debouncedValidatePassword.current(email.value, newPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginUser) {
      CustomStorage.token = loginUser.token;
      authContext.setUserAuth(loginUser.user);
      navigate(`/${redirectUrl}`, { replace: true });
    } else {
      setPassword((current) => ({
        ...current,
        loading: true,
      }));
      const validateEmail: LoginResponse = await callEndpoint(
        AuthService.login(email.value, password.value)
      );
      const isValid = validateEmail.status;
      setPassword((current) => ({
        ...current,
        loading: false,
        error: !isValid ? "La contraseña es incorrecta" : "",
      }));
      if (isValid && validateEmail.data) {
        CustomStorage.token = validateEmail.data.token;
        authContext.setUserAuth(validateEmail.data.user);
        navigate(`/${redirectUrl}`, { replace: true });
      }
    }
  };

  return (
    <article
      className={`animate__animated animate__fadeIn ${styles.authentication}`}
    >
      <section className={styles.authentication__wrapper}>
        <img src={logo} alt="Logo" />
        <form onSubmit={handleSubmit} autoComplete="off">
          <h3 className={styles.auth_login}>
            <span>Bienvenidos</span>
            Accede a tu cuenta
          </h3>
          <div className={styles.authentication__input}>
            <label htmlFor="user_email">Correo electrónico</label>
            <input
              className={email.error ? "invalid" : ""}
              type="email"
              id="user_email"
              name="user_email"
              autoComplete="off"
              placeholder="Escribe aquí tu correo electrónico"
              value={email.value}
              onChange={handleEmailChange}
              disabled={email.loading || password.loading}
            />
            {email.error && (
              <img
                onClick={handleResetEmail}
                src={errorIcon}
                alt="error icon"
              />
            )}
            <TextInfo
              loading={email.loading}
              error={email.error}
              success={email.success}
            />
          </div>
          <div className={styles.authentication__input}>
            <label htmlFor="user_password">Contraseña</label>
            <input
              className={password.error ? "invalid show" : ""}
              type={show ? "text" : "password"}
              id="user_password"
              name="user_password"
              autoComplete="off"
              placeholder="Escribe aquí tu contraseña"
              ref={passwordRef}
              value={password.value}
              onChange={handlePasswordChange}
              disabled={!isEmailValid || password.loading}
            />
            {show ? (
              <img onClick={handleShow} src={eye} alt="eye icon" />
            ) : (
              <img onClick={handleShow} src={noEye} alt="eye icon" />
            )}
            <TextInfo
              loading={password.loading}
              error={password.error}
              success={password.success}
            />
          </div>
          <label htmlFor={styles.remember}>
            <input
              disabled={
                password.loading ||
                (!remember && (!isEmailValid || !isPasswordValid))
              }
              className={password.loading ? "loading" : ""}
              type="checkbox"
              name="remember"
              checked={remember}
              onChange={handleOnChange}
              id={styles.remember}
            />
            <div>
              <div></div>
            </div>
            Recordar contraseña
          </label>
          <button
            type="submit"
            disabled={
              password.loading ||
              (!remember && (!isEmailValid || !isPasswordValid))
            }
          >
            Iniciar Sesión
          </button>
          <p className={styles.go_recovery}>
            ¿Has olvidado tu usuario y contraseña?
            <Link to={`/${publicRoutes.RECOVERY}`}>Recuperar acceso</Link>
          </p>
        </form>
        <p>© {currentYear} Todos los derechos reservados.</p>
      </section>
      <Slider />
    </article>
  );
};

export default Login;
