import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import DashboardPage from "../pages/admin/DashboardPage";
import ReservationsPage from "../pages/admin/ReservationsPage";
import PaymentsPage from "../pages/admin/PaymentsPage";
import RoomsPage from "../pages/admin/RoomsPage";
import UsersPage from "../pages/admin/UsersPage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route
          path="dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="reservations"
          element={<ReservationsPage />}
        />

        <Route
          path="payments"
          element={<PaymentsPage />}
        />

        <Route
          path="rooms"
          element={<RoomsPage />}
        />

        <Route
          path="users"
          element={<UsersPage />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="dashboard"
              replace
            />
          }
        />
      </Route>
    </Routes>
  );
}