import React from "react";

/**
 * Skeleton
 * - Loading placeholder
 * - Use for cards, avatars, text
 */
export default function Skeleton({
  width = "100%",
  height = "1rem",
  className = ""
}) {
  return (
    <div
      className={`
        animate-pulse
        rounded-xl
        bg-white/10
        ${className}
      `}
      style={{ width, height }}
    />
  );
}
