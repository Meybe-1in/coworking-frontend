import { useLocation, useNavigate } from "react-router-dom";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import { createReservation } from "../../api/reservationApi";
import { useState } from "react";
import Swal from "sweetalert2";
import { toUTC } from "../../utils/dateUtils";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { room, filters } = location.state || {};

  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  if (!room || !filters) {
    return <p>Error cargando reserva</p>;
  }

  const getHours =
    parseInt(filters.end.split(":")[0]) -
    parseInt(filters.start.split(":")[0]);

  const total = Number(room.price) * getHours;

  const handleReservation = async () => {
    try {
      setLoading(true);

      const reservationData = {
        roomId: room.id,
        startAt: toUTC(filters.date, filters.start),
        endAt: toUTC(filters.date, filters.end),
        notes: note || "Reserva Coworking",
      };

      const res = await createReservation(reservationData);
      navigate("/payment", {
        state: {
          reservationId: res.data.id,
          room,
          filters,
          total,
          createdAt: res.data.createdAt
        },
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo completar la reserva",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <NavbarUser />

      <main className="checkout-main">
        {/* Step breadcrumb */}
        <nav className="step-nav">
          <span className="step active">Cuenta</span>
          <span className="step-arrow">›</span>
          <span className="step current">Reserva</span>
          <span className="step-arrow">›</span>
          <span className="step">Pago</span>
          <span className="step-arrow">›</span>
          <span className="step">Confirmación</span>
        </nav>

        <div className="checkout-layout">
          {/* LEFT */}
          <div className="checkout-left">
            <h1 className="checkout-title">Confirmar reserva</h1>

            {/* Room card */}
            <div className="info-card">
              <div className="info-card-header">
                <span className="info-label">Espacio</span>
              </div>
              <div className="room-name">{room.name}</div>
              {room.description && (
                <p className="room-description">{room.description}</p>
              )}
            </div>

            {/* Details grid */}
            <div className="info-card">
              <div className="detail-grid">
                <div className="detail-item">
                  <div>
                    <span className="detail-label">Fecha</span>
                    <span className="detail-value">{filters.date}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <div>
                    <span className="detail-label">Horario</span>
                    <span className="detail-value">
                      {filters.start} – {filters.end}
                    </span>
                  </div>
                </div>
                <div className="detail-item">
                  <div>
                    <span className="detail-label">Personas</span>
                    <span className="detail-value">{filters.people}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <div>
                    <span className="detail-label">Duración</span>
                    <span className="detail-value">
                      {getHours} hora{getHours !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="info-card">
              <label className="field-label">
                Nota para la reserva
                <span className="optional-badge">Opcional</span>
              </label>
              <textarea
                placeholder="Ej: Necesitamos proyector, somos 4 personas con laptops..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="note-textarea"
                rows={3}
              />
            </div>

            <button
              onClick={handleReservation}
              disabled={loading}
              className={`cta-btn ${loading ? "loading" : ""}`}
            >
              {loading ? (
                <span className="btn-inner">
                  <span className="spinner" /> Procesando...
                </span>
              ) : (
                <span className="btn-inner">
                  Continuar al pago
                  <span className="btn-arrow">→</span>
                </span>
              )}
            </button>

            <div className="
              inline-flex items-center gap-2 px-3 py-1.5
              bg-blue-50 text-blue-700
              rounded-full text-sm font-medium
              border border-blue-100
              mt-3
            ">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 8v5l3 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>

              Tu reserva se mantendrá durante 15 minutos mientras completas el pago
            </div>

          </div>

          {/* RIGHT — Summary */}
          <aside className="summary-card">
            <h2 className="summary-title">Resumen</h2>

            <div className="summary-room">{room.name}</div>

            <div className="summary-divider" />

            <div className="summary-rows">
              <div className="summary-row">
                <span>Precio por hora</span>
                <span>${room.price}</span>
              </div>
              <div className="summary-row">
                <span>Duración</span>
                <span>
                  {getHours} hora{getHours !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="summary-row">
                <span>Personas</span>
                <span>{filters.people}</span>
              </div>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>
              <span className="total-amount">${total}</span>
            </div>

            <p className="summary-note">
              Pago único · Sin cargos adicionales
            </p>
          </aside>
        </div>
      </main>
    </div>
  );
}