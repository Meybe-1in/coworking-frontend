import { useState, useMemo } from "react";
import AdminHeader from "../../components/admin/layout/AdminHeader";
import AdminSidebar from "../../components/admin/layout/AdminSidebar";
import DashboardStats from "../../components/admin/stats/DashboardStats";

import ReservationsTable from "../../components/admin/tables/ReservationsTable";
import PaymentsTable from "../../components/admin/tables/PaymentsTable";
import RoomsTable from "../../components/admin/tables/RoomsTable";
import Icon from "../../components/admin/ui/Icon";
import { ICONS } from "../../helpers/admin/icons";
import { TABS } from "../../helpers/admin/tabs";

import useAdminStats from "../../components/admin/hooks/useAdminStats";
import useReservations from "../../components/admin/hooks/useReservations";
import usePayments from "../../components/admin/hooks/usePayments";
import useRooms from "../../components/admin/hooks/useRooms";

import { reservationColumns } from "../../components/admin/columns/reservationColumns";
import { paymentColumns } from "../../components/admin/columns/paymentColumns";
import { roomColumns } from "../../components/admin/columns/roomColumns";
import EditRoomModal from "../../components/admin/rooms/EditRoomModal";


export default function AdminDashboard() {

  const [tab, setTab] =
    useState("stats");

  const [editingRoom, setEditingRoom] =
    useState(null);

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

  // Room handlers
  const handleEditRoom = (room) => {
    setEditingRoom(room);
  };

  const handleDeleteRoom = (room) => {
    // Aquí iría la lógica para eliminar la sala, como mostrar una confirmación
    if (window.confirm(`¿Eliminar sala: ${room.name}?`)) {
      alert(`Sala eliminada: ${room.name}`);
    }
  };


  // ─── Rooms hook ──────────────────
  const {
    rooms,
    loading: roomsLoading,
    error: roomsError,
    reloadRooms,
  } = useRooms(tab);

  // ─── useMemo ──────────────────
  const resCols = useMemo(
    () => reservationColumns(reloadReservations),
    [reloadReservations]
  );

  const payCols = useMemo(
    () => paymentColumns(reloadPayments),
    [reloadPayments]
  );

  const roomCols = useMemo(
    () =>
      roomColumns(
        handleEditRoom,
        handleDeleteRoom
      ),
    [handleEditRoom, handleDeleteRoom]
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

      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)", }}>

        {/* Sidebar */}
        <AdminSidebar
          tab={tab}
          setTab={setTab}
          TABS={TABS}
          Icon={Icon}
        />

        {/* Main */}
        <main
          style={{ flex: 1, padding: "28px 32px", maxWidth: 1100, }}
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

          {/* Rooms */}
          {tab === "rooms" && (
            <RoomsTable
              rooms={rooms}
              loading={roomsLoading}
              error={roomsError}
              reloadRooms={reloadRooms}
              roomCols={roomCols}
              Icon={Icon}
              ICONS={ICONS}
            />
          )}

          {editingRoom && (
            <EditRoomModal
              room={editingRoom}
              open={!!editingRoom}
              onClose={() => setEditingRoom(null)}
              reloadRooms={reloadRooms}
            />
          )}

        </main>
      </div>
    </div>
  );
}