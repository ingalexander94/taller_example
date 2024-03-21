import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useFetch } from "src/hooks";
import { CustomStorage } from "src/lib";
import { LoginResponse } from "src/interfaces";
import Loading from "../UI/Loading";
import { AuthService } from "src/services";
import { AuthContext } from "src/context";

type Props = {
  children: JSX.Element | JSX.Element[];
  validateAuth: boolean;
};

const RoutesWithNotFound = ({ children, validateAuth }: Props) => {
  const authContext = useContext(AuthContext);
  const { setUserAuth, authState } = authContext;
  const initialized = useRef<boolean>(false);
  const { callEndpoint } = useFetch();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!validateAuth && authState.user) {
      setLoading(false);
    }
    if (validateAuth && !initialized.current) {
      initialized.current = true;
      const validateAuth = async () => {
        try {
          const renewToken: LoginResponse = await callEndpoint(
            AuthService.renew()
          );
          if (!renewToken.status) {
            CustomStorage.removeToken();
            setUserAuth(null);
          } else {
            CustomStorage.token = renewToken.data!.token;
            setUserAuth(renewToken.data!.user);
          }
          setLoading(false);
        } catch (error) {
          CustomStorage.removeToken();
        }
      };
      validateAuth();
    }
    return () => {};
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Routes>
      {children}
      <Route path="*" element={<Navigate to="404" />}></Route>
    </Routes>
  );
};

export default RoutesWithNotFound;
