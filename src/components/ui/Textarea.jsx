import React from "react";

/**
 * Textarea
 * - Reusable textarea with Orbix styling
 * - Auto-resizable via rows (can enhance later)
 */
export default function Textarea({
  value,
  onChange,
  placeholder = "",
  rows = 3,
  className = "",
  ...rest
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`
        w-full px-3 py-2 rounded-xl
        border border-border
        bg-white/5 text-white
        placeholder-white/40
        outline-none resize-none
        focus:ring-2 focus:ring-indigo-500/30
        ${className}
      `}
      {...rest}
    />
  );
}
