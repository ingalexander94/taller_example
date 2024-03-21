import { RouteUI } from "src/interfaces";
import dashboardIcon from "src/assets/icons/dashboard.svg";
import temparioIcon from "src/assets/icons/tempario.svg";
import technician from "src/assets/icons/Technician.svg";
import indicatorIcon from "src/assets/icons/Indicator.svg";
import teamIcon from "src/assets/icons/Team.svg";
import personIcon from "src/assets/icons/Person.svg";
import moneyIcon from "src/assets/icons/Money.svg";
import customermanagenetIcon from "src/assets/icons/customermanagemet.svg";
import inventary from "src/assets/icons/inventary.svg";
import order from "src/assets/icons/order.svg";

export const publicRoutes = {
  LOGIN: "iniciar-sesion",
  RECOVERY: "recuperar-clave",
  FORGOT: "cambiar-clave",
};

export const privateRoutes = {
  PRIVATE: "administrador",
  CLIENT: "cliente",
  DASHBOARD: "dashboard",
  TEMPORAL: "tempario-general-v2",
  TEMPORARY: "tempario-general",
  TECHNICIANCLASSIFICATION: "clasificacion-de-tecnicos",
  EXPENSES: "gastos-operativos",
  INDICATORS: "indicadores-de-mtto",
  SETTINGS: "ajustes",
  NOT_FOUND: "404",
  CUSTOMERMNAGEMENT: "gestion-de-clientes",
  EQUIPMENT: "equipos",
  DETAILEQUIPMENT: "detalle-equipo",
  PERSONAL: "personal",
  SAVEPERSONAL: "guardar",
  MAINTENANCEINTERVALS: "intervalos-de-mantenimiento",
  PRINCIPALMAINTENANCEINTERVALS: "intervalos-de-mantenimiento-principal",
  ADDREGISTER: "agregar-gasto",
  INVENTORY: "inventario",
  WORDORDERS: "ordenes-de-trabajo",
  WORDORDERSDETAIL: "orden-de-trabajo",
  WORKORDERPREVIEW: "orden-de-trabajo-vista-previa",
  DETAILMAINTENANCE: "detalles-de-mantenimiento",
  DETAILMAINTENANCEPERFORMED: "detalles-de-mantenimiento-realizados",
  SAVEEQUIPMENT: "guardar",
};

export const temporaryRoutes = {
  TEAMS: "equipos",
  OPERATIONS: "operaciones",
  INFOTEAM: "editar/:id",
};

export const maintenanceIntervalsRoutes = {
  PERFORMED: "realizados",
  PROGRAMMED: "programados",
};

export const expensesRoutes = {
  ADDREGISTER: "agregar-gasto",
};

export const inventoryRoutes = {
  LISTPARTS: "Listado-de-repuestos",
  LISTFILTER: "Listado-de-filtros",
};

export const moduleTemporaryRoutes: RouteUI[] = [
  {
    path: `/${privateRoutes.PRIVATE}/${privateRoutes.TEMPORARY}/${temporaryRoutes.TEAMS}`,
    icon: "",
    title: "Clasificación de equipos",
  },
  {
    path: `/${privateRoutes.PRIVATE}/${privateRoutes.TEMPORARY}/${temporaryRoutes.OPERATIONS}`,
    icon: "",
    title: "Matriz de operaciones",
  },
];

export const modulesAdminRoutes: RouteUI[] = [
  {
    path: `/${privateRoutes.PRIVATE}/${privateRoutes.DASHBOARD}`,
    icon: dashboardIcon,
    title: "Dashboard",
  },
  {
    path: `/${privateRoutes.PRIVATE}/${privateRoutes.TEMPORARY}`,
    icon: temparioIcon,
    title: "Tempario general",
  },
  {
    path: `/${privateRoutes.PRIVATE}/${privateRoutes.TECHNICIANCLASSIFICATION}`,
    icon: technician,
    title: "Clasificación de técnicos",
  },
  {
    path: `/${privateRoutes.PRIVATE}/${privateRoutes.CUSTOMERMNAGEMENT}`,
    icon: customermanagenetIcon,
    title: "Gestión de clientes",
  },
];

export const modulesClientRoutes: RouteUI[] = [
  {
    path: `/${privateRoutes.CLIENT}/${privateRoutes.DASHBOARD}`,
    icon: dashboardIcon,
    title: "Dashboard",
  },
  {
    path: `/${privateRoutes.CLIENT}/${privateRoutes.EXPENSES}`,
    icon: moneyIcon,
    title: "Gastos de operación",
  },
  {
    path: `/${privateRoutes.CLIENT}/${privateRoutes.EQUIPMENT}`,
    icon: teamIcon,
    title: "Equipos",
  },
  {
    path: `/${privateRoutes.CLIENT}/${privateRoutes.PERSONAL}`,
    icon: personIcon,
    title: "Personal",
  },
  {
    path: `/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}`,
    icon: indicatorIcon,
    title: "Intervalos de mantenimiento",
  },

  {
    path: `/${privateRoutes.CLIENT}/${privateRoutes.INVENTORY}`,
    icon: inventary,
    title: "Inventario",
  },
  {
    path: `/${privateRoutes.CLIENT}/${privateRoutes.WORDORDERS}`,
    icon: order,
    title: "Ordenes de trabajo",
  },
];

export const moduleMaintenanceIntervalsRoutes: RouteUI[] = [
  {
    path: `/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${maintenanceIntervalsRoutes.PROGRAMMED}`,
    icon: "",
    title: "Programado",
  },
  {
    path: `/${privateRoutes.CLIENT}/${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${maintenanceIntervalsRoutes.PERFORMED}`,
    icon: "",
    title: "Realizado",
  },
];

export const moduleInventoryRoutes: RouteUI[] = [
  {
    path: `/${privateRoutes.CLIENT}/${privateRoutes.INVENTORY}/${inventoryRoutes.LISTPARTS}`,
    icon: "",
    title: "Listado de repuestos",
  },
  {
    path: `/${privateRoutes.CLIENT}/${privateRoutes.INVENTORY}/${inventoryRoutes.LISTFILTER}`,
    icon: "",
    title: "Listado de filtros",
  },
];

export const getRouteTitle = (search: string): string => {
  if (search === "/administrador/ajustes") return "Ajustes";
  const route =
    modulesAdminRoutes.find(({ path }) => search.includes(path))?.title ??
    "Mapi";
  return route;
};
