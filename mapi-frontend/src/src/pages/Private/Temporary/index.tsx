import { lazy } from "react";
import { NavLink, Navigate, Route, useLocation } from "react-router-dom";
import { moduleTemporaryRoutes, temporaryRoutes } from "src/models";
import RoutesWithNotFound from "src/components/RoutesWithNotFound";
const Teams = lazy(() => import("src/pages/Private/Temporary/Teams"));
const Operations = lazy(() => import("src/pages/Private/Temporary/Operations"));
const InfoTeam = lazy(() => import("src/pages/Private/Temporary/InfoTeam"));
import styles from "./temporary.module.css";
import { TemporaryProvider } from "src/context";

const Temporary = () => {
  const { pathname } = useLocation();

  return (
    <TemporaryProvider>
      {pathname.includes("editar") ? (
        <RoutesWithNotFound validateAuth={false}>
          <Route
            path={`${temporaryRoutes.TEAMS}/${temporaryRoutes.INFOTEAM}`}
            element={<InfoTeam />}
          />
        </RoutesWithNotFound>
      ) : (
        <article className={styles.temporary}>
          <nav className={styles.nav_temporary}>
            <ul>
              {moduleTemporaryRoutes.map((route) => (
                <li key={route.path}>
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    {route.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <RoutesWithNotFound validateAuth={false}>
            <Route path="/" element={<Navigate to={temporaryRoutes.TEAMS} />} />
            <Route path={temporaryRoutes.TEAMS} element={<Teams />} />
            <Route path={temporaryRoutes.OPERATIONS} element={<Operations />} />
          </RoutesWithNotFound>
        </article>
      )}
    </TemporaryProvider>
  );
};

export default Temporary;
