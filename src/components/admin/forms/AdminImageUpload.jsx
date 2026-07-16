export default function AdminImageUpload({
  preview,
  fileRef,
  clearImage,
}) {
  return preview ? (
    <div className="admin-image-preview">
      <img
        src={preview}
        alt="preview"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div className="admin-image-overlay">
        <button
          type="button"
          className="admin-image-action"
          onClick={() =>
            fileRef.current.click()
          }
        >
          Cambiar
        </button>

        <span className="admin-image-divider">
          ·
        </span>

        <button
          type="button"
          className="admin-image-action admin-image-action-remove"
          onClick={clearImage}
        >
          Quitar
        </button>
      </div>
    </div>
  ) : (
    <button
      type="button"
      className="admin-upload-btn"
      onClick={() =>
        fileRef.current.click()
      }
    >
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>

      Subir imagen
    </button>
  );
}