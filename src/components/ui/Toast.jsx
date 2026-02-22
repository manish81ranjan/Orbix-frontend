import React, { useEffect } from "react";

/**
 * Toast
 * - Simple toast notification
 * - Auto-dismiss after duration
 */
export default function Toast({
  open,
  message,
  type = "info", // info | success | error
  duration = 3000,
  onClose
}) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  const styles =
    type === "success"
      ? "border-green-500/20 bg-green-500/10 text-green-200"
      : type === "error"
      ? "border-red-500/20 bg-red-500/10 text-red-200"
      : "border-border bg-white/10 text-white";

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`
          rounded-xl border px-4 py-2 text-sm shadow-lg backdrop-blur
          ${styles}
        `}
      >
        {message}
      </div>
    </div>
  );
}
