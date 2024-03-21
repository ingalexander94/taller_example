import { lazy } from "react";
import { NavLink, Navigate, Route } from "react-router-dom";
import styles from "./MaintenanceIntervals.module.css";
import RoutesWithNotFound from "src/components/RoutesWithNotFound";
const Performed = lazy(
  () => import("src/pages/Client/MainTenanceInterval/Detail/Performed")
);
const Programmed = lazy(
  () => import("src/pages/Client/MainTenanceInterval/Detail/Programmed")
);
import {
  maintenanceIntervalsRoutes,
  moduleMaintenanceIntervalsRoutes,
} from "src/models";

const DetailMaintenanceIntervals = () => {
  return (
    <>
      <article className={styles.detail}>
        <nav className={styles.nav_detail}>
          <ul>
            {moduleMaintenanceIntervalsRoutes.map((route) => (
              <li key={route.path}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  {route.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <RoutesWithNotFound validateAuth={false}>
          <Route
            path="/"
            element={<Navigate to={maintenanceIntervalsRoutes.PROGRAMMED} />}
          />

          <Route
            path={maintenanceIntervalsRoutes.PERFORMED}
            element={<Performed />}
          />
          <Route
            path={maintenanceIntervalsRoutes.PROGRAMMED}
            element={<Programmed />}
          />
        </RoutesWithNotFound>
      </article>
    </>
  );
};

export default DetailMaintenanceIntervals;
