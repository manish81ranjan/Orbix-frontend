// import React from "react";

// /**
//  * Modal
//  * - Generic modal component
//  * - Controlled via `open` prop
//  */
// export default function Modal({ open, onClose, children }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 grid place-items-center">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/60"
//         onClick={onClose}
//       />

//       {/* Modal content */}
//       <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card backdrop-blur-xl p-5">
//         {children}
//       </div>
//     </div>
//   );
// }
import React, { useEffect } from "react";

/**
 * Modal (Instagram-like)
 * ✅ ESC to close
 * ✅ Body scroll lock
 * ✅ Backdrop click closes
 * ✅ Optional title
 */
export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-3">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="text-sm font-semibold text-white/90">
            {title || ""}
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-xl grid place-items-center text-white/70 hover:text-white hover:bg-white/10"
            title="Close"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}