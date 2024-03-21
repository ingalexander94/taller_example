import { NavLink, Navigate, Route } from "react-router-dom";
import RoutesWithNotFound from "src/components/RoutesWithNotFound";

import styles from "./inventory.module.css";
import { inventoryRoutes, moduleInventoryRoutes } from "src/models";
import { Lisfilters } from "./ListFilters";
import { ListParts } from "./ListParts";

const Inventory = () => {
  return (
    <>
      <article className={styles.temporary}>
        <nav className={styles.nav_temporary}>
          <ul>
            {moduleInventoryRoutes.map((route) => (
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
            element={<Navigate to={inventoryRoutes.LISTPARTS} />}
          />

          <Route path={inventoryRoutes.LISTPARTS} element={<ListParts />} />
          <Route path={inventoryRoutes.LISTFILTER} element={<Lisfilters />} />
        </RoutesWithNotFound>
      </article>
    </>
  );
};

export default Inventory;
