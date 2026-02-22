// import React from "react";
// import { NavLink } from "react-router-dom";

// /**
//  * Sidebar
//  * - Desktop navigation panel
//  * - Hidden on mobile
//  */
// export default function Sidebar() {
//   const linkClass = ({ isActive }) =>
//     `block px-3 py-2 rounded-xl text-sm transition
//      hover:bg-white/10 ${
//        isActive ? "bg-white/10 font-medium" : "text-white/80"
//      }`;

//   return (
//     <aside className="rounded-2xl border border-border bg-card p-3">
//       <div className="mb-2 px-2 text-xs text-white/60 uppercase tracking-wide">
//         Menu
//       </div>

//       <nav className="flex flex-col gap-1">
//         <NavLink to="/" end className={linkClass}>
//           Home
//         </NavLink>
//         <NavLink to="/explore" className={linkClass}>
//           Explore
//         </NavLink>
//         <NavLink to="/notifications" className={linkClass}>
//           Notifications
//         </NavLink>
//         <NavLink to="/saved" className={linkClass}>
//           Saved
//         </NavLink>
//         <NavLink to="/settings" className={linkClass}>
//           Settings
//         </NavLink>
//       </nav>
//     </aside>
//   );
// }

// import React from "react";
// import { NavLink } from "react-router-dom";

// const itemClass = ({ isActive }) =>
//   [
//     "block rounded-xl px-4 py-2 text-sm transition",
//     isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5",
//   ].join(" ");

// export default function Sidebar() {
//   return (
//     <aside className="rounded-2xl border border-white/10 bg-white/5 p-4">
//       <div className="text-xs text-white/50 mb-3">MENU</div>

//       <div className="space-y-1">
//         <NavLink to="/" end className={itemClass}>
//           Home
//         </NavLink>

//         <NavLink to="/explore" className={itemClass}>
//           Explore
//         </NavLink>

//         <NavLink to="/notifications" className={itemClass}>
//           Notifications
//         </NavLink>

//         {/* ✅ Saved works now */}
//         <NavLink to="/saved" className={itemClass}>
//           Saved
//         </NavLink>

//         <NavLink to="/settings" className={itemClass}>
//           Settings
//         </NavLink>
//       </div>
//     </aside>
//   );
// }


import React from "react";
import { NavLink } from "react-router-dom";

const itemClass = ({ isActive }) =>
  [
    "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
    isActive
      ? "bg-white/10 text-white"
      : "text-white/70 hover:bg-white/5 hover:text-white",
  ].join(" ");

export default function Sidebar() {
  return (
    <aside className="glass-card p-5 space-y-6">
      {/* Logo */}
      <div className="text-xl font-semibold tracking-wide">Orbix</div>

      {/* Menu */}
      <div className="space-y-1">
        <NavLink to="/" end className={itemClass}>
          🏠 Home
        </NavLink>

        <NavLink to="/explore" className={itemClass}>
          🧭 Explore
        </NavLink>

        <NavLink to="/create" className={itemClass}>
          ➕ Create
        </NavLink>

        <NavLink to="/notifications" className={itemClass}>
          🔔 Notifications
        </NavLink>

        <NavLink to="/saved" className={itemClass}>
          💾 Saved
        </NavLink>

        <NavLink to="/settings" className={itemClass}>
          ⚙ Settings
        </NavLink>
      </div>

      <div className="border-t border-white/10 pt-4 text-xs text-white/40">
        © {new Date().getFullYear()} Orbix
      </div>
    </aside>
  );
}