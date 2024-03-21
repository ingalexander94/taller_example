import { Suspense, lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import Sidebar from "src/components/UI/Sidebar";
import Header from "src/components/UI/Header";
import Loading from "src/components/UI/Loading";
import { privateRoutes } from "src/models";

const CustomerEquipment = lazy(
  () => import("src/pages/Client/CustomerEquipment")
);
const Detail = lazy(() => import("src/pages/Client/CustomerEquipment/Detail"));

const Personal = lazy(() => import("src/pages/Client/Personal"));
const Expenses = lazy(() => import("src/pages/Client/Expenses"));
const AddExpense = lazy(() => import("src/pages/Client/Expenses/AddExpense"));
const Save = lazy(() => import("src/pages/Client/Personal/Save"));
const Dashboard = lazy(() => import("src/pages/Client/Dashboard"));
const DetailEquipments = lazy(
  () => import("src/pages/Client/CustomerEquipment/Detail")
);
const DetailMaintenanceIntervals = lazy(
  () => import("src/pages/Client/MainTenanceInterval/Detail")
);
import RoutesWithNotFound from "src/components/RoutesWithNotFound";
import Inventory from "./Inventory";
import WorkOrders from "./WorkOrders";
const DetailMaintenanceProgramed = lazy(
  () =>
    import(
      "src/pages/Client/MainTenanceInterval/Detail/Programmed/DetailMaintenance"
    )
);
const DetailMaintenancePerformed = lazy(
  () =>
    import(
      "src/pages/Client/MainTenanceInterval/Detail/Performed/DetailMaintenancePerformed"
    )
);
const SaveEquipment = lazy(() => import("./CustomerEquipment/Save"));
import MainTenanceInterval from "./MainTenanceInterval";
import WorkOrder from "./WorkOrders/WorkOrder";
import WordOrderDetail from "./WorkOrders/WordOrderDetail";
import styles from "./client.module.css";

const Client = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Sidebar />
        <Header />
        <div className={styles.wrapper__private}>
          <RoutesWithNotFound validateAuth={false}>
            <Route
              path="/"
              element={<Navigate to={privateRoutes.EXPENSES} />}
            />
            <Route path={privateRoutes.DASHBOARD} element={<Dashboard />} />
            <Route path={`${privateRoutes.EXPENSES}`} element={<Expenses />} />
            <Route
              path={`${privateRoutes.EXPENSES}/${privateRoutes.ADDREGISTER}`}
              element={<AddExpense />}
            />
            <Route
              path={privateRoutes.EQUIPMENT}
              element={<CustomerEquipment />}
            />
            <Route
              path={`${privateRoutes.EQUIPMENT}/${privateRoutes.SAVEEQUIPMENT}`}
              element={<SaveEquipment />}
            />
            <Route
              path={`${privateRoutes.EQUIPMENT}/${privateRoutes.DETAILEQUIPMENT}/:id`}
              element={<Detail />}
            />
            <Route path={privateRoutes.PERSONAL} element={<Personal />} />
            <Route
              path={`${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}`}
              element={<MainTenanceInterval />}
            />
            <Route
              path={`${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/*`}
              element={<DetailMaintenanceIntervals />}
            />
            <Route
              path={`${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCE}`}
              element={<DetailMaintenanceProgramed />}
            />
            <Route
              path={`${privateRoutes.PRINCIPALMAINTENANCEINTERVALS}/${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCEPERFORMED}`}
              element={<DetailMaintenancePerformed />}
            />
            <Route
              path={privateRoutes.DETAILEQUIPMENT}
              element={<DetailEquipments />}
            />
            <Route
              path={`${privateRoutes.PERSONAL}/${privateRoutes.SAVEPERSONAL}`}
              element={<Save />}
            />
            <Route
              path={`${privateRoutes.MAINTENANCEINTERVALS}/${privateRoutes.DETAILMAINTENANCEPERFORMED}`}
              element={<DetailMaintenancePerformed />}
            />
            <Route
              path={privateRoutes.PRINCIPALMAINTENANCEINTERVALS}
              element={<MainTenanceInterval />}
            />
            <Route
              path={`${privateRoutes.ADDREGISTER}/*`}
              element={<AddExpense />}
            />
            <Route
              path={`${privateRoutes.INVENTORY}/*`}
              element={<Inventory />}
            />
            <Route
              path={`${privateRoutes.WORDORDERS}/*`}
              element={<WorkOrders />}
            />
            <Route
              path={`${privateRoutes.WORDORDERS}/${privateRoutes.WORDORDERSDETAIL}`}
              element={<WorkOrder />}
            />
            <Route
              path={`${privateRoutes.WORDORDERS}/${privateRoutes.WORDORDERSDETAIL}/${privateRoutes.WORKORDERPREVIEW}`}
              element={<WordOrderDetail />}
            />
          </RoutesWithNotFound>
        </div>
      </Suspense>
    </>
  );
};

export default Client;
