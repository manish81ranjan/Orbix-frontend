// import React from "react";
// import { Outlet } from "react-router-dom";

// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import BottomNav from "./BottomNav";
// import RightPanel from "./RightPanel";

// /**
//  * RootLayout
//  * - Main authenticated app shell
//  * - Desktop: Sidebar + Feed + RightPanel
//  * - Mobile: Top Navbar + BottomNav
//  */
// export default function RootLayout() {
//   return (
//     <div className="min-h-screen bg-bg text-white">
//       {/* Top Navbar */}
//       <Navbar />

//       {/* Main Content */}
//       <div className="mx-auto max-w-6xl px-3 md:px-6 pt-4 pb-24 md:pb-6">
//         <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_280px] gap-4">
//           {/* Left Sidebar (Desktop only) */}
//           <aside className="hidden md:block">
//             <Sidebar />
//           </aside>

//           {/* Page Content */}
//           <main className="min-w-0">
//             <Outlet />
//           </main>

//           {/* Right Panel (Desktop only) */}
//           <aside className="hidden md:block">
//             <RightPanel />
//           </aside>
//         </div>
//       </div>

//       {/* Bottom Navigation (Mobile only) */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
//         <BottomNav />
//       </div>
//     </div>
//   );
// }
import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import RightPanel from "./RightPanel";

/**
 * RootLayout
 * - Main app shell
 * - Desktop: Sidebar | Feed | RightPanel
 * - Mobile: Top Navbar + BottomNav
 */
export default function RootLayout() {
  return (
    <div className="min-h-screen bg-bg text-white">
      {/* Top Navbar */}
      <div className="sticky top-0 z-40">
        <Navbar />
      </div>

      {/* Main grid */}
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-12 gap-4 md:gap-6 py-4 md:py-6">
          {/* LEFT: Sidebar (desktop only) */}
          <aside className="hidden md:block md:col-span-3 lg:col-span-2">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>

          {/* CENTER: Page content */}
          <main className="col-span-12 md:col-span-9 lg:col-span-7 min-w-0">
            <div className="space-y-4 pb-20 md:pb-0">
              <Outlet />
            </div>
          </main>

          {/* RIGHT: RightPanel (large screens only) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <RightPanel />
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom Navigation (Mobile only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNav />
      </div>
    </div>
  );
}