import React from "react";
import { NavLink } from "react-router-dom";

/**
 * BottomNav (Instagram-like)
 * - Mobile only
 * - Fixed bottom + safe area
 */
export default function BottomNav() {
  const item = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1 flex-1 py-2
     ${isActive ? "text-white" : "text-white/60"} hover:text-white`;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0b1220]/90 backdrop-blur">
      <div className="mx-auto max-w-6xl flex px-2 pb-[env(safe-area-inset-bottom)]">
        <NavLink to="/" end className={item}>
          <span className="text-lg">🏠</span>
          <span className="text-[10px]">Home</span>
        </NavLink>

        <NavLink to="/explore" className={item}>
          <span className="text-lg">🧭</span>
          <span className="text-[10px]">Explore</span>
        </NavLink>

        <NavLink to="/create" className={item}>
          <span className="text-lg">➕</span>
          <span className="text-[10px]">Create</span>
        </NavLink>

        <NavLink to="/notifications" className={item}>
          <span className="text-lg">♡</span>
          <span className="text-[10px]">Alerts</span>
        </NavLink>

        <NavLink to="/settings" className={item}>
          <span className="text-lg">⚙️</span>
          <span className="text-[10px]">Settings</span>
        </NavLink>
      </div>
    </nav>
  );
}