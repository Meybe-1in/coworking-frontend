import { useState } from "react";
import {
  User, Mail, Lock, Eye, EyeOff, Building2,
  Users, MapPin, List, Camera, Loader2, Plus,
} from "lucide-react";

function Field({
  label,
  error,
  children,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <label
        style={{
          fontSize: 11,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: ".5px",
          color: "#9ca3af",
        }}
      >
        {label}
      </label>

      {children}

      {error && (
        <p
          style={{
            fontSize: 11,
            color: "#ef4444",
            margin: 0,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

const inputStyle = {
  height: 36,
  width: "100%",
  boxSizing: "border-box",
  padding: "0 10px 0 32px",
  fontSize: 13,
  background: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
};

function IconInput({
  icon: Icon,
  ...props
}) {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Icon
        size={14}
        style={{
          position: "absolute",
          left: 10,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#9ca3af",
        }}
      />

      <input
        {...props}
        style={inputStyle}
      />
    </div>
  );
}

export default function UserForm({
  onSubmit,
  loading,
}) {
  const [form, setForm] =
    useState({
      username: "",
      email: "",
      password: "",
    });

  const [errors, setErrors] =
    useState({});

  const [showPassword, setShowPassword] =
    useState(false);

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

  const validate = () => {
    const errs = {};

    if (form.username.trim().length < 3) {
      errs.username = "Mínimo 3 caracteres";
    }

    if (!emailRegex.test(form.email)) {
      errs.email = "Ingresa un email válido";
    }

    if (!strongPasswordRegex.test(form.password)) {
      errs.password =
        "Mínimo 8 caracteres, mayúscula, minúscula, número y símbolo";
    }

    return errs;
  };

  const set = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  const validateField = (key, value) => {
    setErrors((prev) => {
      const next = { ...prev };

      if (key === "username") {
        if (value.length < 3) {
          next.username = "Mínimo 3 caracteres";
        } else {
          delete next.username;
        }
      }

      if (key === "email") {
        if (!emailRegex.test(value)) {
          next.email = "Ingresa un email válido";
        } else {
          delete next.email;
        }
      }

      if (key === "password") {
        if (!strongPasswordRegex.test(value)) {
          next.password =
            "Mínimo 8 caracteres, mayúscula, minúscula, número y símbolo";
        } else {
          delete next.password;
        }
      }

      return next;
    });
  };

  const submit = (e) => {
    e.preventDefault();

    const errs = validate();

    if (
      Object.keys(errs).length > 0
    ) {
      setErrors(errs);
      return;
    }

    onSubmit(form);
  };

  return (
    <form
      onSubmit={submit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <Field
        label="Usuario"
        error={errors.username}
      >
        <IconInput
          icon={User}
          value={form.username}
          onChange={(e) =>
            set(
              "username",
              e.target.value
            )
          }
        />
      </Field>

      <Field
        label="Correo"
        error={errors.email}
      >
        <IconInput
          icon={Mail}
          type="email"
          value={form.email}
          onChange={(e) => {
            set("email", e.target.value);
            validateField("email", e.target.value);
          }}
        />
      </Field>

      <Field
        label="Contraseña"
        error={errors.password}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <Lock
            size={14}
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
              zIndex: 1,
            }}
          />

          <input
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => {
              set("password", e.target.value);
              validateField("password", e.target.value);
            }}
            style={{
              ...inputStyle,
              paddingLeft: 32,
              paddingRight: 40,
            }}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              padding: 0,
              margin: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9ca3af",
              zIndex: 1,
            }}
          >
            {showPassword ? (
              <EyeOff size={16} />
            ) : (
              <Eye size={16} />
            )}
          </button>
        </div>
      </Field>

      <div
        style={{
          borderTop:
            "1px solid #f3f4f6",
          paddingTop: 8,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          type="submit"
          disabled={loading}
          style={{
            height: 34,
            padding: "0 16px",
            border: "none",
            borderRadius: 8,
            background:
              loading
                ? "#93c5fd"
                : "#1d4ed8",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {loading ? (
            <Loader2
              size={14}
              style={{
                animation:
                  "spin 1s linear infinite",
              }}
            />
          ) : (
            <Plus size={14} />
          )}

          {loading
            ? "Guardando..."
            : "Crear administrador"}
        </button>
      </div>

      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </form>
  );
}