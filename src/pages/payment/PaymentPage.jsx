import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../stripe/stripe";
import PaymentForm from "../../components/payment/PaymentForm";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import "./payment.css";

export default function PaymentPage() {
  const { state } = useLocation();
  const { reservationId, room, filters, total, createdAt } = state || {};
  console.log(createdAt);
  const calculateTimeLeft = () => {
    if (!createdAt) return "00:00";

    const created = new Date(createdAt).getTime();
    const expiresAt = created + 15 * 60 * 1000;
    const diff = expiresAt - Date.now();

    if (diff <= 0) return "00:00";

    const minutes = Math.floor(diff / 1000 / 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!createdAt) return;

    const interval = setInterval(() => {
      const diff =
        new Date(createdAt).getTime() +
        15 * 60 * 1000 -
        Date.now();

      if (diff <= 0) {
        setExpired(true);
        setTimeLeft("00:00");
        clearInterval(interval);
        return;
      } setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  const isEndingSoon =
    Number(timeLeft.split(":")[0]) < 5;

  const timerClass =
    expired
      ? "bg-red-100 text-red-700 border-red-200"
      : isEndingSoon
        ? "bg-amber-100 text-amber-700 border-amber-200 animate-pulse"
        : "bg-blue-50 text-blue-700 border-blue-100";

  if (!reservationId) return <p>Error en pago</p>;

  return (
    <div className="payment-page">
      <NavbarUser />

      <main className="payment-main">
        {/* Step breadcrumb */}
        <nav className="step-nav">
          <span className="step done">Cuenta</span>
          <span className="step-arrow">›</span>
          <span className="step done">Reserva</span>
          <span className="step-arrow">›</span>
          <span className="step current">Pago</span>
          <span className="step-arrow">›</span>
          <span className="step">Confirmación</span>
        </nav>

        <div className="payment-layout">
          {/* LEFT — Form */}
          <div className="payment-left">
            <h1 className="payment-title">Método de pago</h1>

            <div
              className={`
                inline-flex items-center gap-2 px-3 py-1.5
                rounded-full text-sm font-medium
                border mt-3
                ${timerClass}
              `}
            >
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

              {expired
                ? "La reserva expiró"
                : `Tu reserva expira en ${timeLeft}`}
            </div>

            {/* Payment method tabs */}
            <div className="method-tabs">
              <button className="method-tab active">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <rect x="0.5" y="0.5" width="17" height="13" rx="1.5" stroke="currentColor" />
                  <rect y="3" width="18" height="3" fill="currentColor" />
                </svg>
                Tarjeta
              </button>
              <button className="method-tab disabled" disabled>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" fill="#003087" />
                  <path d="M6.5 5.5h2.8c1.2 0 2 .8 1.8 2-.2 1.3-1.3 2-2.5 2H7.4l-.4 2H5.5l1-6z" fill="white" />
                </svg>
                PayPal
                <span className="coming-soon">Próximamente</span>
              </button>
            </div>

            {/* Stripe card form */}
            <div className="card-form-wrapper">

              <Elements stripe={stripePromise}>
                <PaymentForm
                  reservationId={reservationId}
                  total={total}
                  expired={expired}
                />
              </Elements>
            </div>

            {/* Trust badges */}
            <div className="trust-row">
              <span className="trust-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 0L1 2.5v4.5C1 10.1 3.6 13 7 14c3.4-1 6-3.9 6-7V2.5L7 0z" fill="#22c55e" />
                </svg>
                Pago seguro con Stripe
              </span>
              <span className="trust-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="5" width="12" height="8" rx="1" stroke="#6b7280" strokeWidth="1.2" />
                  <path d="M4 5V3.5a3 3 0 016 0V5" stroke="#6b7280" strokeWidth="1.2" />
                </svg>
                Encriptación SSL
              </span>
            </div>
          </div>

          {/* RIGHT — Summary */}
          <aside className="summary-card">
            <h2 className="summary-title">Tu reserva</h2>

            <div className="summary-room">{room?.name}</div>

            <div className="summary-divider" />

            <div className="summary-rows">
              <div className="summary-row">
                <span>Fecha</span>
                <span>{filters?.date}</span>
              </div>
              <div className="summary-row">
                <span>Horario</span>
                <span>
                  {filters?.start} – {filters?.end}
                </span>
              </div>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total a pagar</span>
              <span className="total-amount">${total}</span>
            </div>

            <p className="summary-note">
              Cargo único · No se realizarán cobros adicionales
            </p>
          </aside>
        </div>
      </main>
    </div>
  );
}