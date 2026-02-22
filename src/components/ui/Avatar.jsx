import React from "react";

/**
 * Avatar
 * - Displays user avatar or initials
 * - Size configurable
 */
export default function Avatar({ src, name = "", size = 40 }) {
  const initials = name ? name.slice(0, 2).toUpperCase() : "?";

  return (
    <div
      className="rounded-full overflow-hidden bg-white/10 border border-border grid place-items-center text-xs font-semibold text-white"
      style={{ width: size, height: size }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}
