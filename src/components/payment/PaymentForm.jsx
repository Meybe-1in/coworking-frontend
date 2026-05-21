import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import { createPaymentIntent } from "../../api/paymentApi";
import { useNavigate } from "react-router-dom";

const STRIPE_STYLE = {
  style: {
    base: {
      fontSize: "15px",
      color: "#111827",
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: "400",
      "::placeholder": { color: "#9ca3af" },
    },
    invalid: { color: "#ef4444" },
  },
};

export default function PaymentForm({ reservationId, total, expired }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [cardErrors, setCardErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    country: "El Salvador",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleCardChange = (field) => (e) => {
    setCardErrors((prev) => ({
      ...prev,
      [field]: e.error ? e.error.message : "",
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nombre requerido";
    if (!form.lastname.trim()) e.lastname = "Apellido requerido";
    if (!form.email.includes("@")) e.email = "Email inválido";
    setFormErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!validate()) return;

    try {
      setLoading(true);

      const { clientSecret } = await createPaymentIntent(reservationId);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: `${form.name} ${form.lastname}`,
            email: form.email,
          },
        },
      });

      if (result.error) throw new Error(result.error.message);

      Swal.fire({
        icon: "success",
        title: "¡Pago exitoso!",
        text: "Tu reserva ha sido confirmada.",
        confirmButtonColor: "#111827",
      }).then(() => navigate("/calendar"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el pago",
        text: error.message,
        confirmButtonColor: "#111827",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      {/* Billing info */}
      <div className="form-section">
        <p className="form-section-label">Información de facturación</p>

        <div className="field-row">
          <div className="field-group">
            <label className="field-label">Nombre</label>
            <input
              className={`text-input ${formErrors.name ? "error" : ""}`}
              placeholder="María"
              value={form.name}
              onChange={handleChange("name")}
            />
            {formErrors.name && (
              <span className="field-error">{formErrors.name}</span>
            )}
          </div>

          <div className="field-group">
            <label className="field-label">Apellido</label>
            <input
              className={`text-input ${formErrors.lastname ? "error" : ""}`}
              placeholder="García"
              value={form.lastname}
              onChange={handleChange("lastname")}
            />
            {formErrors.lastname && (
              <span className="field-error">{formErrors.lastname}</span>
            )}
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">Correo electrónico</label>
          <input
            className={`text-input ${formErrors.email ? "error" : ""}`}
            placeholder="maria@email.com"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
          />
          {formErrors.email && (
            <span className="field-error">{formErrors.email}</span>
          )}
        </div>

        <div className="field-group">
          <label className="field-label">País</label>
          <select
            className="text-input select-input"
            value={form.country}
            onChange={handleChange("country")}
          >
            <option>El Salvador</option>
            <option>Guatemala</option>
            <option>Honduras</option>
            <option>México</option>
            <option>Costa Rica</option>
            <option>Panamá</option>
            <option>Colombia</option>
            <option>Estados Unidos</option>
            <option>Otro</option>
          </select>
        </div>
      </div>

      {/* Card fields */}
      <div className="form-section">
        <p className="form-section-label">Datos de la tarjeta</p>

        <div className="field-group">
          <label className="field-label">Número de tarjeta</label>
          <div className={`stripe-field ${cardErrors.number ? "error" : ""}`}>
            <CardNumberElement
              options={STRIPE_STYLE}
              onChange={handleCardChange("number")}
            />
          </div>
          {cardErrors.number && (
            <span className="field-error">{cardErrors.number}</span>
          )}
        </div>

        <div className="field-row">
          <div className="field-group">
            <label className="field-label">Vencimiento</label>
            <div className={`stripe-field ${cardErrors.expiry ? "error" : ""}`}>
              <CardExpiryElement
                options={STRIPE_STYLE}
                onChange={handleCardChange("expiry")}
              />
            </div>
            {cardErrors.expiry && (
              <span className="field-error">{cardErrors.expiry}</span>
            )}
          </div>

          <div className="field-group">
            <label className="field-label">Código de seguridad</label>
            <div className={`stripe-field ${cardErrors.cvc ? "error" : ""}`}>
              <CardCvcElement
                options={STRIPE_STYLE}
                onChange={handleCardChange("cvc")}
              />
            </div>
            {cardErrors.cvc && (
              <span className="field-error">{cardErrors.cvc}</span>
            )}
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!stripe || loading || expired}
        className={`pay-btn ${loading ? "loading" : ""}`}
      >
        {loading ? (
          <span className="btn-inner">
            <span className="spinner white" /> Procesando pago...
          </span>
        ) : (
          <span className="btn-inner">
            {expired
              ? "Reserva expirada"
              : `Pagar $${total}`}

            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M1 8h14M9 2l6 6-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </button>
    </form>
  );
}