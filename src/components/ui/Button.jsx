import React from "react";

/**
 * Button
 * - Simple reusable button with Tailwind styling
 * - Supports: disabled, className, type
 */
export default function Button({
  children,
  className = "",
  type = "submit",
  disabled = false,
  onClick
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2
        px-4 py-2 rounded-xl
        border border-border
        bg-white/5 hover:bg-white/10
        transition
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}
