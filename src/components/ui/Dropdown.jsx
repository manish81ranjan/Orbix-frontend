import React, { useEffect, useRef, useState } from "react";

/**
 * Dropdown
 * - Simple accessible dropdown
 * - Closes on outside click
 */
export default function Dropdown({ trigger, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div className="absolute right-0 mt-2 min-w-[160px] rounded-xl border border-border bg-card shadow-lg z-50">
          {children}
        </div>
      )}
    </div>
  );
}
