import React from "react";

/**
 * Input
 * - Reusable input with Orbix styling
 */
export default function Input({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  ...rest
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      className={`
        w-full px-3 py-2 rounded-xl
        border border-border
        bg-white/5 text-white
        placeholder-white/40
        outline-none
        focus:ring-2 focus:ring-indigo-500/30
        ${className}
      `}
      {...rest}
    />
  );
}
