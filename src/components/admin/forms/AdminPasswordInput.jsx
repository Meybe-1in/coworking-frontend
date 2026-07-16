import { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AdminPasswordInput({
  value,
  onChange,
}) {


  return (
    <div
      className="admin-form-input-wrapper"
      style={{ width: "100%" }}
    >
      <Lock
        size={14}
        className="admin-form-icon"
        style={{ zIndex: 1 }}
      />

      <input
        type={
          showPassword
            ? "text"
            : "password"
        }
        value={value}
        onChange={onChange}
        className="admin-form-input"
        style={{
          paddingLeft: 32,
          paddingRight: 40,
        }}
      />

      <button
        type="button"
        className="admin-password-toggle"
        onClick={() =>
          setShowPassword(
            !showPassword
          )
        }
      >
        {showPassword ? (
          <EyeOff size={16} />
        ) : (
          <Eye size={16} />
        )}
      </button>
    </div>
  );
}