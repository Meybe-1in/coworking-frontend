import { useState, useEffect } from "react";
import { User, Mail, Shield } from "lucide-react";
import "../forms/AdminForm.css";
import AdminInput from "../forms/AdminInput.jsx";
import AdminField from "../forms/AdminField.jsx";
import AdminSubmitBtn from "../forms/AdminSubmitBtn";
import AdminPasswordInput from "../forms/AdminPasswordInput";

const ROLE_OPTIONS = [
  {
    value: "USER",
    label: "Usuario",
  },
  {
    value: "ADMIN",
    label: "Administrador",
  },
];

export default function UserForm({ onSubmit, loading, mode = "create", initialData = {}, }) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    username: initialData.username || "",
    email: initialData.email || "",
    role: initialData.role || "USER",
    password: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({
      username: initialData.username || "",
      email: initialData.email || "",
      role: initialData.role || "USER",
      password: "",
    });

    setErrors({});
  }, [initialData]);

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

      if (key === "role") {
        if (!value) {
          next.role = "Selecciona un rol";
        } else {
          delete next.role;
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

    if (isEdit) {
      onSubmit({
        username: form.username.trim(),
        email: form.email.trim(),
        role: form.role,
      });

      return;
    }

    onSubmit(form);
  };

  return (
    <form
      onSubmit={submit}
      className="admin-form"
    >
      <AdminField
        label="Usuario"
        error={errors.username}
      >
        <AdminInput
          icon={User}
          value={form.username}
          onChange={(e) => {
            set("username", e.target.value);
            validateField("username", e.target.value);
          }}
        />
      </AdminField>

      <AdminField
        label="Correo"
        error={errors.email}
      >
        <AdminInput
          icon={Mail}
          type="email"
          value={form.email}
          onChange={(e) => {
            set("email", e.target.value);
            validateField("email", e.target.value);
          }}
        />
      </AdminField>

      {isEdit && (
        <AdminField
          label="Rol"
          error={errors.role}
        >
          <FilterSelect
            value={form.role}
            onChange={(value) => {
              set("role", value);
              validateField("role", value);
            }}
            options={ROLE_OPTIONS}
            minWidth="100%"
          />
        </AdminField>
      )}

      {!isEdit && (
        <AdminField
          label="Contraseña"
          error={errors.password}
        >
          <AdminPasswordInput
            value={form.password}
            onChange={(e) => {
              set("password", e.target.value);
              validateField("password", e.target.value);
            }}
          />
        </AdminField>
      )}

      <div className="admin-form-footer">
        <AdminSubmitBtn
          loading={loading}
          loadingText="Guardando..."
          text="Crear administrador"
        />
      </div>
    </form>
  );
}