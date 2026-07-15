import { Loader2, Plus } from "lucide-react";

export default function AdminSubmitBtn({
  loading,
  loadingText,
  text,
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="admin-form-submit"
      style={{
        background:
          loading
            ? "#93c5fd"
            : "#1d4ed8",
      }}
    >
      {loading ? (
        <Loader2
          size={14}
          className="admin-form-spin"
        />
      ) : (
        <Plus size={14} />
      )}

      {loading
        ? loadingText
        : text}
    </button>
  );
}