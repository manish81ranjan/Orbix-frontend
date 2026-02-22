import React from "react";

/**
 * Spinner
 * - Lightweight loading spinner
 * - Size: sm | md | lg
 */
export default function Spinner({ size = "md" }) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-4"
  };

  return (
    <span
      className={`
        inline-block
        rounded-full
        border-white/30
        border-t-white
        animate-spin
        ${sizes[size]}
      `}
      aria-label="Loading"
    />
  );
}
