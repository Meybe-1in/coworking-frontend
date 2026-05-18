import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import { getMyReservations } from "../../api/reservationApi";
import Swal from "sweetalert2";

const STATUS_MAP = {
  PENDING:   { label: "Pendiente",  dot: "bg-amber-400",  pill: "bg-amber-50 text-amber-700 ring-amber-200/60"  },
  PAID:      { label: "Pagada",     dot: "bg-green-400",  pill: "bg-green-50 text-green-700 ring-green-200/60"  },
  CANCELLED: { label: "Cancelada",  dot: "bg-gray-300",   pill: "bg-gray-50 text-gray-500 ring-gray-200/60"     },
  UNPAID:    { label: "Sin pagar",  dot: "bg-red-400",    pill: "bg-red-50 text-red-600 ring-red-200/60"        },
};

const TABS = ["ALL", "PENDING", "PAID", "UNPAID", "CANCELLED"];

const fmt = (d, type) =>
  new Date(d).toLocaleString("es-SV", type === "date"
    ? { weekday: "short", day: "numeric", month: "short", year: "numeric" }
    : { hour: "2-digit", minute: "2-digit" });

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [tab, setTab]                   = useState("ALL");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try   { setReservations(await getMyReservations()); }
      catch (e) { console.error(e); }
      finally   { setLoading(false); }
    })();
  }, []);

  const handleCancel = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Cancelar reserva?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "Volver",
    });
    if (!isConfirmed) return;
    try {
      await cancelReservation(id);
      setReservations(prev => prev.map(r => r.id === id ? { ...r, status: "CANCELLED" } : r));
      Swal.fire({ icon: "success", title: "Reserva cancelada", timer: 1600, showConfirmButton: false });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          e.response?.data?.message ||
          "No se pudo cancelar la reservación"
      });
    }
  };

  const handlePay = (r) =>
    navigate("/payment", {
      state: {
        reservationId: r.id,
        room:    { name: r.roomName, id: r.roomId },
        filters: { date: fmt(r.startAt, "date"), start: fmt(r.startAt, "time"), end: fmt(r.endAt, "time") },
        total:   r.price,
      },
    });

  const count  = (s) => s === "ALL" ? reservations.length : reservations.filter(r => r.status === s).length;
  const list   = tab === "ALL" ? reservations : reservations.filter(r => r.status === tab);

  return (
    <>
      <NavbarUser />

      {/* offset for floating navbar (h-14 + mt-3 + gap = ~80px) */}
      <div className="min-h-dvh bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-8">

          {/* Header */}
          <div className="mb-6 pt-2">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mis Reservaciones</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {reservations.length} reserva{reservations.length !== 1 ? "s" : ""} en total
            </p>
          </div>

          {/* Filter tabs — horizontal scroll on mobile */}
          <div className="overflow-x-auto -mx-4 px-4 pb-1 mb-5 [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-1.5 w-max">
              {TABS.map(t => {
                const s = STATUS_MAP[t];
                const active = tab === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold
                      border transition-all duration-150 whitespace-nowrap
                      ${active
                        ? "bg-gray-900 border-gray-900 text-white"
                        : "bg-white border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800"}`}
                  >
                    {t !== "ALL" && (
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s?.dot ?? "bg-gray-300"}`} />
                    )}
                    {t === "ALL" ? "Todas" : s?.label ?? t}
                    <span className={`${active ? "text-gray-400" : "text-gray-400"}`}>{count(t)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center py-24 gap-3 text-gray-400">
              <div className="w-7 h-7 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
              <span className="text-sm">Cargando...</span>
            </div>
          )}

          {/* Empty */}
          {!loading && list.length === 0 && (
            <div className="flex flex-col items-center py-24 gap-3 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">📋</div>
              <p className="font-semibold text-gray-800">Sin resultados</p>
              <p className="text-sm text-gray-400 max-w-xs">
                {tab === "ALL" ? "Aún no tienes reservas." : `Sin reservas con estado "${STATUS_MAP[tab]?.label ?? tab}".`}
              </p>
              <button
                onClick={() => navigate("/userdashboard")}
                className="mt-1 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
              >
                Reservar una sala
              </button>
            </div>
          )}

          {/* Cards */}
          {!loading && list.length > 0 && (
            <div className="flex flex-col gap-2.5">
              {list.map((r, i) => {
                const s       = STATUS_MAP[r.status] ?? { label: r.status, dot: "bg-gray-300", pill: "bg-gray-50 text-gray-500 ring-gray-200" };
                const canPay  = ["UNPAID", "PENDING"].includes(r.status);
                const canCancel = ["PENDING", "CONFIRMED"].includes(r.status);

                return (
                  <div
                    key={r.id}
                    className="bg-white border border-gray-100 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,.05)]
                      hover:shadow-[0_4px_16px_rgba(0,0,0,.08)] hover:-translate-y-px
                      transition-all duration-200 overflow-hidden"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <div className="p-5">
                      {/* Top */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="min-w-0">
                            <p className="text-[15px] font-bold text-gray-900 truncate leading-snug">{r.roomName}</p>
                            <p className="text-xs text-gray-400">Sala privada</p>
                          </div>
                        </div>

                        {/* Status badge */}
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px]
                          font-semibold ring-1 shrink-0 ${s.pill}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                          {s.label}
                        </span>
                      </div>

                      {/* Details row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3">
                        <span className="flex items-center gap-1.5 text-[13px] text-gray-500">
                          <svg className="w-3.5 h-3.5 text-gray-300 shrink-0" viewBox="0 0 14 14" fill="none">
                            <rect x=".7" y="1.7" width="12.6" height="11.6" rx="1.6" stroke="currentColor" strokeWidth="1.1"/>
                            <path d="M4.5.7v1.5M9.5.7v1.5M.7 5.2h12.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                          </svg>
                          {fmt(r.startAt, "date")}
                        </span>

                        <span className="flex items-center gap-1.5 text-[13px] text-gray-500">
                          <svg className="w-3.5 h-3.5 text-gray-300 shrink-0" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6.3" stroke="currentColor" strokeWidth="1.1"/>
                            <path d="M7 4v3.2l1.8 1.8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                          </svg>
                          {fmt(r.startAt, "time")} – {fmt(r.endAt, "time")}
                        </span>

                        <span className="ml-auto text-[15px] font-bold text-gray-900">${r.price}</span>
                      </div>
                    </div>

                    {/* Actions footer */}
                    {(canPay || canCancel) && (
                      <div className="flex justify-end gap-2 px-5 py-3 border-t border-gray-50 bg-gray-50/50"> {canPay && (
                          <button
                            onClick={() => handlePay(r)}
                            className="flex items-center justify-center gap-2 py-2 px-4
                              bg-gray-900 text-white text-[13px] font-semibold rounded-xl
                              hover:bg-gray-800 active:scale-[.98] transition-all duration-150"
                          >
                            Pagar ahora
                          </button>
                        )}
                        {canCancel && (
                          <button
                            onClick={() => handleCancel(r.id)}
                            className="flex items-center justify-center gap-1.5 py-2 px-3
                              bg-white text-red-500 text-[13px] font-semibold rounded-xl
                              border border-red-100 hover:bg-red-50 active:scale-[.98]
                              transition-all duration-150"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none">
                              <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                            </svg>
                            Cancelar
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </>
  );
}