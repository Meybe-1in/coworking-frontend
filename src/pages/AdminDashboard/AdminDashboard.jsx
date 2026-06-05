import { useState, useMemo } from "react";
import AdminHeader from "../../components/admin/layout/AdminHeader";
import AdminSidebar from "../../components/admin/layout/AdminSidebar";
import DashboardStats from "../../components/admin/stats/DashboardStats";
import ReservationsTable from "../../components/admin/tables/ReservationsTable";
import PaymentsTable from "../../components/admin/tables/PaymentsTable";
import Icon from "../../components/admin/ui/Icon";
import { ICONS } from "../../helpers/admin/icons";
import { TABS } from "../../helpers/admin/tabs";
import useAdminStats from "../../components/admin/hooks/useAdminStats";
import useReservations from "../../components/admin/hooks/useReservations";
import usePayments from "../../components/admin/hooks/usePayments";
import {reservationColumns} from "../../components/admin/columns/reservationColumns";
import {paymentColumns} from "../../components/admin/columns/paymentColumns";

export default function AdminDashboard() {

  const [tab, setTab] =
    useState("stats");

  // ─── Stats hook ─────────────────────
  const {
    stats,
    loading: statsLoading,
    error: statsError,
  } = useAdminStats();

  // ─── Reservations hook ──────────────
  const {
    reservations,
    loading: reservationsLoading,
    error: reservationsError,
    reloadReservations,
  } = useReservations(tab);

  // ─── Payments hook ──────────────────
  const {
    payments,
    loading: paymentsLoading,
    error: paymentsError,
    reloadPayments,
  } = usePayments(tab);

  // ─── useMemo ──────────────────
   const resCols = useMemo(
    () => reservationColumns(reloadReservations),
    [reloadReservations]
  );

  const payCols = useMemo(
    () => paymentColumns(reloadPayments),
    [reloadPayments]
  );

  return (
    
    <div
      style={{
        minHeight: "100vh",
        background: "#f9fafb",
        fontFamily:
          "'DM Sans', system-ui, sans-serif",
        color: "#111",
      }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}
      </style>

      {/* Header */}
      <AdminHeader
        Icon={Icon}
        ICONS={ICONS}
      />

      <div style={{ display: "flex",minHeight:"calc(100vh - 60px)",}}>

        {/* Sidebar */}
        <AdminSidebar
          tab={tab}
          setTab={setTab}
          TABS={TABS}
          Icon={Icon}
        />

        {/* Main */}
        <main
          style={{ flex: 1,padding: "28px 32px",maxWidth: 1100,}}
        >

          {/* Stats */}
          {tab === "stats" && (
            <DashboardStats
              stats={stats}
              loading={statsLoading}
              error={statsError}
              setTab={setTab}
              ICONS={ICONS}
              Icon={Icon}
            />
          )}

          {/* Reservations */}
          {tab === "reservations" && (
            <ReservationsTable
              reservations={reservations}
              loading={reservationsLoading}
              error={reservationsError}
              reloadReservations={reloadReservations}
              resCols={resCols}
              Icon={Icon}
              ICONS={ICONS}
            />
          )}

          {/* Payments */}
          {tab === "payments" && (
            <PaymentsTable
              payments={payments}
              loading={paymentsLoading}
              error={paymentsError}
              reloadPayments={reloadPayments}
              payCol={payCols}
              Icon={Icon}
              ICONS={ICONS}
            />
          )}

        </main>
      </div>
    </div>
  );
}