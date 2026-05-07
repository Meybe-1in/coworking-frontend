import { useLocation, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../stripe/stripe";
import PaymentForm from "../../components/payment/PaymentForm";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import "./payment.css";

export default function PaymentPage() {
  const { state } = useLocation();
  const { reservationId, room, filters, total } = state || {};

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

            {/* Payment method tabs */}
            <div className="method-tabs">
              <button className="method-tab active">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <rect x="0.5" y="0.5" width="17" height="13" rx="1.5" stroke="currentColor"/>
                  <rect y="3" width="18" height="3" fill="currentColor"/>
                </svg>
                Tarjeta
              </button>
              <button className="method-tab disabled" disabled>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" fill="#003087"/>
                  <path d="M6.5 5.5h2.8c1.2 0 2 .8 1.8 2-.2 1.3-1.3 2-2.5 2H7.4l-.4 2H5.5l1-6z" fill="white"/>
                </svg>
                PayPal
                <span className="coming-soon">Próximamente</span>
              </button>
            </div>

            {/* Stripe card form */}
            <div className="card-form-wrapper">

              <Elements stripe={stripePromise}>
                <PaymentForm reservationId={reservationId} total={total} />
              </Elements>
            </div>

            {/* Trust badges */}
            <div className="trust-row">
              <span className="trust-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 0L1 2.5v4.5C1 10.1 3.6 13 7 14c3.4-1 6-3.9 6-7V2.5L7 0z" fill="#22c55e"/>
                </svg>
                Pago seguro con Stripe
              </span>
              <span className="trust-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="5" width="12" height="8" rx="1" stroke="#6b7280" strokeWidth="1.2"/>
                  <path d="M4 5V3.5a3 3 0 016 0V5" stroke="#6b7280" strokeWidth="1.2"/>
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