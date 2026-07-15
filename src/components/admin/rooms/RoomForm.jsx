import { useState, useRef, useEffect } from "react";
import { Building2, Users, MapPin, List, Camera, Loader2, Plus, } from "lucide-react";
import "../forms/AdminForm.css";
import AdminInput from "../forms/AdminInput.jsx";
import AdminField from "../forms/AdminField.jsx";
import AdminSubmitBtn from "../forms/AdminSubmitBtn";

export default function RoomForm({ onSubmit, loading, initialData, isEdit = false, }) {
  const [form, setForm] =
    useState({
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      capacity: initialData?.capacity ?? "",
      price: initialData?.price ?? "",
      location: initialData?.location ?? "",
      features: initialData?.features?.join(", ") ?? "",
      available: initialData?.available ?? true,
    });

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState(initialData?.imageUrl ?? null);

  useEffect(() => {
    setPreview(initialData?.imageUrl ?? null);
  }, [initialData]);

  const [errors, setErrors] =
    useState({});

  const fileRef = useRef();

  const set = (key, value) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

  const validate = () => {
    const e = {};

    if (!form.name.trim())
      e.name = "Obligatorio";

    if (!form.capacity)
      e.capacity = "Obligatorio";

    if (!form.price)
      e.price = "Obligatorio";

    if (!form.location.trim())
      e.location = "Obligatorio";

    return e;
  };

  const pickImage = (file) => {
    if (!file) return;

    setImage(file);
    setPreview(
      URL.createObjectURL(file)
    );
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
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

    onSubmit(
      {
        ...form,
        capacity: Number(
          form.capacity
        ),
        price: Number(form.price),
        features: form.features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      },
      image
    );
  };

  return (
    <form
      onSubmit={submit}
      className="admin-form"
    >
      <AdminField label="Nombre" error={errors.name}
      >
        <AdminInput icon={Building2} placeholder="Sala Focus A" value={form.name} onChange={(e) =>
          set(
            "name",
            e.target.value
          )
        }
        />
      </AdminField>

      <AdminField label="Descripción">
        <textarea rows={2} placeholder="Descripción de la sala" value={form.description} onChange={(e) =>
          set(
            "description",
            e.target.value
          )
        }
          className="admin-form-input"
          style={{
            padding: 10,
            height: "auto",
            resize: "none",
          }}
        />
      </AdminField>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr 1fr",
          gap: 10,
        }}
      >
        <AdminField
          label="Capacidad"
          error={errors.capacity}
        >
          <AdminInput
            icon={Users}
            type="number"
            min="1"
            value={form.capacity}
            onChange={(e) =>
              set(
                "capacity",
                e.target.value
              )
            }
          />
        </AdminField>

        <AdminField
          label="Precio / hora"
          error={errors.price}
        >
          <AdminInput
            dollar
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) =>
              set(
                "price",
                e.target.value
              )
            }
          />
        </AdminField>

        {/* toggle disponible */}
        <AdminField label="Disponible">
          <div
            onClick={() =>
              set(
                "available",
                !form.available
              )
            }
            style={{
              height: 36,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 10px",
              border:
                "1px solid #e5e7eb",
              borderRadius: 8,
              background:
                "#f9fafb",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <div
              style={{
                width: 28,
                height: 15,
                borderRadius: 99,
                background:
                  form.available
                    ? "#10b981"
                    : "#d1d5db",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: "#fff",
                  position:
                    "absolute",
                  top: 2,
                  left: 2,
                  transform:
                    form.available
                      ? "translateX(13px)"
                      : "translateX(0)",
                }}
              />
            </div>

            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color:
                  form.available
                    ? "#059669"
                    : "#9ca3af",
              }}
            >
              {form.available
                ? "Sí"
                : "No"}
            </span>
          </div>
        </AdminField>
      </div>

      <AdminField
        label="Ubicación"
        error={errors.location}
      >
        <AdminInput
          icon={MapPin}
          value={form.location}
          onChange={(e) =>
            set(
              "location",
              e.target.value
            )
          }
        />
      </AdminField>

      <AdminField
        label="Características"
        hint="(separar con coma)"
      >
        <AdminInput
          icon={List}
          placeholder="Wifi, Aire, Proyector"
          value={form.features}
          onChange={(e) =>
            set(
              "features",
              e.target.value
            )
          }
        />
      </AdminField>

      {/* imagen */}
      <AdminField label="Imagen">
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
          onChange={(e) => pickImage(e.target.files[0])} />


        {preview ? (
          <div style={{ position: "relative", height: 80, borderRadius: 8, overflow: "hidden", border: "1px solid #e5e7eb" }}>
            <img src={preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "rgba(0,0,0,.55)", display: "flex",
              alignItems: "center", justifyContent: "center", gap: 12, padding: "5px 0",
            }}>
              <button type="button" onClick={() => fileRef.current.click()}
                style={{ fontSize: 11, fontWeight: 500, color: "#fff", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                Cambiar
              </button>
              <span style={{ color: "rgba(255,255,255,.35)", fontSize: 11 }}>·</span>
              <button type="button" onClick={clearImage}
                style={{ fontSize: 11, fontWeight: 500, color: "#fca5a5", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                Quitar
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current.click()}
            style={{
              height: 36, width: "100%", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 8,
              border: "1px dashed #d1d5db", borderRadius: 8,
              background: "#f9fafb", color: "#9ca3af",
              fontSize: 13, cursor: "pointer", fontFamily: "inherit",
            }}
          >
            {/* camera icon inline */}
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            Subir imagen
          </button>
        )}
      </AdminField>

      <div className="admin-form-footer">
        <AdminSubmitBtn
          loading={loading}
          loadingText="Guardando..."
          text={
            isEdit
              ? "Actualizar sala"
              : "Crear sala"
          }
        />
      </div>
    </form>
  );
}