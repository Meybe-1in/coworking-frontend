import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import DashboardPage from "../pages/admin/DashboardPage";
import ReservationsPage from "../pages/admin/ReservationsPage";
import PaymentsPage from "../pages/admin/PaymentsPage";
import RoomsPage from "../pages/admin/RoomsPage";
import UsersPage from "../pages/admin/UsersPage";
import ProfilePage from "../pages/admin/ProfilePage";
import ReportsPage from "../pages/admin/ReportsPage";

import ReservationReport from "../pages/Reports/ReservationReport";
import FinancialReport from "../pages/Reports/FinancialReport";
import RoomUsageReport from "../pages/Reports/RoomUsageReport";

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
          path="profile"
          element={<ProfilePage />}
        />
        <Route
          path="reports"
          element={<ReportsPage />}
        >
          <Route
            index
            element={
              <Navigate
                to="reservations"
                replace
              />
            }
          />

          <Route
            path="reservations"
            element={<ReservationReport />}
          />

          <Route
            path="financial"
            element={<FinancialReport />}
          />

          <Route
            path="room-usage"
            element={<RoomUsageReport />}
          />
        </Route>

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