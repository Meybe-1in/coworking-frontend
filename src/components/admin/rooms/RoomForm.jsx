import { useState, useRef, useEffect } from "react";
import { Building2, Users, MapPin, List, Camera, Loader2, Plus, } from "lucide-react";
import "../forms/AdminForm.css";
import AdminInput from "../forms/AdminInput.jsx";
import AdminField from "../forms/AdminField.jsx";
import AdminSubmitBtn from "../forms/AdminSubmitBtn";
import AdminToggle from "../forms/AdminToggle";
import AdminImageUpload from "../forms/AdminImageUpload";

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

      <div className="admin-form-grid">
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
          <AdminToggle
            value={form.available}
            onChange={(value) =>
              set("available", value)
            }
          />
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

        <AdminImageUpload
          preview={preview}
          fileRef={fileRef}
          clearImage={clearImage}
        />
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