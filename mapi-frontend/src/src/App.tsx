import { Suspense, lazy, useState } from "react";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./models";
import ScreenLoader from "./components/ScreenLoader";
import Loading from "./components/UI/Loading";
import RoutesWithNotFound from "./components/RoutesWithNotFound";
import AuthGuard from "./components/guards/AuthGuard";
import "./App.css";
import Responsive from "./components/UI/Responsive";
import { UIProvider, SettingsProvider, AuthProvider } from "./context";
import { getSubdomain } from "./utilities";
const Login = lazy(() => import("./pages/Auth/Login"));
const Recovery = lazy(() => import("./pages/Auth/Recovery"));
const Private = lazy(() => import("./pages/Private"));
const Client = lazy(() => import("./pages/Client"));
const NotFound = lazy(() => import("./pages/NotFound"));

const subdomain = getSubdomain();

function App() {
  const [isAdmin, _] = useState<boolean>(subdomain === "");

  return (
    <>
      <div className="app">
        <Suspense fallback={<Loading />}>
          <UIProvider>
            <SettingsProvider>
              <AuthProvider>
                <BrowserRouter>
                  <ScreenLoader>
                    <RoutesWithNotFound validateAuth={true}>
                      <Route
                        path="/"
                        element={
                          <Navigate
                            to={
                              subdomain === ""
                                ? privateRoutes.PRIVATE
                                : privateRoutes.CLIENT
                            }
                          />
                        }
                      />
                      <Route path={publicRoutes.LOGIN} element={<Login />} />
                      <Route
                        path={publicRoutes.RECOVERY}
                        element={<Recovery />}
                      />
                      <Route element={<AuthGuard privateValidation={true} />}>
                        {isAdmin ? (
                          <Route
                            path={`${privateRoutes.PRIVATE}/*`}
                            element={<Private />}
                          />
                        ) : (
                          <Route
                            path={`${privateRoutes.CLIENT}/*`}
                            element={<Client />}
                          />
                        )}
                      </Route>
                      <Route
                        path={`${privateRoutes.NOT_FOUND}/*`}
                        element={<NotFound />}
                      />
                    </RoutesWithNotFound>
                  </ScreenLoader>
                </BrowserRouter>
              </AuthProvider>
            </SettingsProvider>
          </UIProvider>
        </Suspense>
      </div>
      <Responsive />
    </>
  );
}

export default App;
