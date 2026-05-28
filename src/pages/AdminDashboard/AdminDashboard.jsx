import { useState, useEffect } from "react";
import { getAdminStats, getAllReservations, getAllPayments } from "../../api/adminApi";
import StatusPill from "../../components/admin/ui/StatusPill";
import AdminHeader from "../../components/admin/layout/AdminHeader";
import AdminSidebar from "../../components/admin/layout/AdminSidebar";
import DashboardStats from "../../components/admin/DashboardStats";
import ReservationsTable from "../../components/admin/tables/ReservationsTable";
import PaymentsTable from "../../components/admin/tables/PaymentsTable";
import Icon from "../../components/admin/ui/Icon";
import { ICONS } from "../../helpers/admin/icons";
import { fmt, fmtDate, fmtDateTime, } from "../../helpers/admin/formatters";
import { TABS } from "../../helpers/admin/tabs";
import ReservationActions from "../../components/admin/reservations/ReservationActions";

export default function AdminDashboard() {
  const [tab, setTab] = useState("stats");

  const [stats, setStats] = useState(null);

  const [reservations, setReservations] =
    useState([]);

  const [payments, setPayments] =
    useState([]);

  const [loading, setLoading] = useState({});

  const [error, setError] = useState({});

  const load = async (key, fn, setter) => {
    setLoading((l) => ({
      ...l,
      [key]: true,
    }));

    setError((e) => ({
      ...e,
      [key]: null,
    }));

    try {
      const data = await fn();
      setter(data);
    } catch {
      setError((e) => ({
        ...e,
        [key]: "Error al cargar datos",
      }));
    } finally {
      setLoading((l) => ({
        ...l,
        [key]: false,
      }));
    }
  };

  useEffect(() => {
    load("stats", getAdminStats, setStats);
  }, []);

  useEffect(() => {
    if (
      tab === "reservations" &&
      reservations.length === 0
    ) {
      load(
        "reservations",
        getAllReservations,
        setReservations
      );
    }

    if (
      tab === "payments" &&
      payments.length === 0
    ) {
      load(
        "payments",
        getAllPayments,
        setPayments
      );
    }
  }, [tab]);

  const resCols = [
    {
      key: "id",
      label: "#",
      render: (r) => (
        <span
          style={{
            color: "#d1d5db",
            fontFamily: "monospace",
          }}
        >
          #{r.id}
        </span>
      ),
    },

    {
      key: "username",
      label: "Usuario",
    },

    {
      key: "roomName",
      label: "Sala",
    },

    {
      key: "startAt",
      label: "Inicio",
      render: (r) =>
        fmtDateTime(r.startAt),
    },

    {
      key: "endAt",
      label: "Fin",
      render: (r) =>
        fmtDateTime(r.endAt),
    },

    {
      key: "price",
      label: "Precio",
      render: (r) => fmt(r.price),
    },

    {
      key: "status",
      label: "Estado",
      render: (r) => (
        <StatusPill status={r.status} />
      ),
    },

    {
      key: "createdAt",
      label: "Creada",
      render: (r) =>
        fmtDate(r.createdAt),
    },

    {
      key: "actions",
      label: "Acciones",
      render: (r) => (
        <ReservationActions
          reservation={r}
          reloadReservations={() =>
            load(
              "reservations",
              getAllReservations,
              setReservations
            )
          }
        />
      ),
    },
  ];

  const payCol = [
    {
      key: "id",
      label: "#",
      render: (r) => (
        <span
          style={{
            color: "#d1d5db",
            fontFamily: "monospace",
          }}
        >
          #{r.id}
        </span>
      ),
    },

    {
      key: "reservationId",
      label: "Reserva",
      render: (r) => `#${r.reservationId}`,
    },

    {
      key: "roomName",
      label: "Sala",
    },

    {
      key: "amount",
      label: "Monto",
      render: (r) => fmt(r.amount),
    },

    {
      key: "currency",
      label: "Moneda",
    },

    {
      key: "status",
      label: "Estado",
      render: (r) => (
        <StatusPill status={r.status} />
      ),
    },

    {
      key: "paidAt",
      label: "Pagado el",
      render: (r) =>
        fmtDateTime(r.paidAt),
    },
  ];

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

      <AdminHeader
        Icon={Icon}
        ICONS={ICONS}
      />

      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <AdminSidebar
          tab={tab}
          setTab={setTab}
          TABS={TABS}
          Icon={Icon}
        />

        <main
          style={{
            flex: 1,
            padding: "28px 32px",
            maxWidth: 1100,
          }}
        >
          {tab === "stats" && (
            <DashboardStats
              stats={stats}
              loading={loading.stats}
              error={error.stats}
              setTab={setTab}
              ICONS={ICONS}
              fmt={fmt}
              Icon={Icon}
            />
          )}

          {tab === "reservations" && (
            <ReservationsTable
              reservations={reservations}
              loading={
                loading.reservations
              }
              error={error.reservations}
              load={load}
              setReservations={
                setReservations
              }
              getAllReservations={
                getAllReservations
              }
              resCols={resCols}
              Icon={Icon}
              ICONS={ICONS}
            />
          )}

          {tab === "payments" && (
            <PaymentsTable
              payments={payments}
              loading={loading.payments}
              error={error.payments}
              load={load}
              setPayments={setPayments}
              getAllPayments={
                getAllPayments
              }
              payCol={payCol}
              Icon={Icon}
              ICONS={ICONS}
            />
          )}
        </main>
      </div>
    </div>
  );
}