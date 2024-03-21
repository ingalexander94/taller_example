import { NavLink } from "react-router-dom";
import { modulesClientRoutes, modulesAdminRoutes } from "src/models";
import logo from "src/assets/logo.svg";
import settingsIcon from "src/assets/icons/settings.svg";

import { getSubdomain } from "src/utilities";
import styles from "./sidebar.module.css";

const subdomain = getSubdomain();

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <img src={logo} alt="logo" />
      <nav className={styles.sidebar__modules}>
        <div>
          <span>Menú</span>
          {subdomain === "" ? (
            <ul>
              {modulesAdminRoutes.map((route) => (
                <li key={route.path}>
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <img src={route.icon} alt={`Icono de ${route.title}`} />
                    {route.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {modulesClientRoutes.map((route) => (
                <li key={route.path}>
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <img src={route.icon} alt={`Icono de ${route.title}`} />
                    {route.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
        <ul>
          <li>
            <NavLink
              to={`#`}
              // className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <img src={settingsIcon} alt="dashboard icon" />
              Ajustes
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
