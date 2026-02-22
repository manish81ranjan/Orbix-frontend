// import React from "react";

// /**
//  * AppShell
//  * - Optional wrapper for future global UI layers
//  * - Good place for:
//  *   - Toast provider
//  *   - Modal root
//  *   - Command palette
//  *   - Theme switcher
//  *
//  * Currently acts as a simple pass-through.
//  */
// export default function AppShell({ children }) {
//   return <>{children}</>;
// }

import React from "react";
import Sidebar from "./Sidebar.jsx";
import RightPanel from "./RightPanel.jsx";
import BottomNav from "./BottomNav.jsx";
import Navbar from "./Navbar.jsx";

/**
 * AppShell (Instagram-style 3-column glass layout)
 * - Desktop: Sidebar | Feed | RightPanel
 * - Mobile: Navbar + Feed + BottomNav
 * - Uses glass utilities from globals.css
 */
export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-bg text-white">
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-40">
        <div className="glass border-b border-white/10">
          <Navbar />
        </div>
      </div>

      {/* Desktop / Main grid */}
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-12 gap-4 md:gap-6 py-4 md:py-6">
          {/* LEFT: Sidebar */}
          <aside className="hidden md:block md:col-span-3 lg:col-span-2">
            <div className="sticky top-6">
              <div className="glass-card p-4">
                <Sidebar />
              </div>
            </div>
          </aside>

          {/* CENTER: Main content */}
          <main className="col-span-12 md:col-span-9 lg:col-span-7">
            <div className="space-y-4">{children}</div>
          </main>

          {/* RIGHT: Right panel */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6">
              <div className="glass-card p-4">
                <RightPanel />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="glass border-t border-white/10">
          <BottomNav />
        </div>
      </div>

      {/* Mobile safe space so content doesn't hide behind BottomNav */}
      <div className="h-16 md:hidden" />
    </div>
  );
}