// // import React, { useMemo, useState } from "react";
// // import { Link, NavLink, useNavigate } from "react-router-dom";
// // import { useAuth } from "@/store/auth.store";

// // function Icon({ children }) {
// //   return (
// //     <span className="grid h-9 w-9 place-items-center rounded-xl hover:bg-white/10 text-white/90">
// //       {children}
// //     </span>
// //   );
// // }

// // export default function Navbar() {
// //   const navigate = useNavigate();
// //   const { user, logout, loading } = useAuth();
// //   const [q, setQ] = useState("");

// //   const isAuthed = useMemo(() => !loading && Boolean(user), [loading, user]);

// //   const goSearch = (e) => {
// //     e.preventDefault();
// //     const query = q.trim();
// //     if (!query) return;
// //     // You can redirect to explore with query
// //     navigate(`/explore?q=${encodeURIComponent(query)}`);
// //   };

// //   return (
// //     <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1220]/80 backdrop-blur">
// //       <div className="mx-auto max-w-6xl h-14 px-3 md:px-6 flex items-center gap-3">
// //         {/* Brand */}
// //         <Link
// //           to="/"
// //           className="font-semibold text-lg tracking-wide hover:opacity-90"
// //         >
// //           Orbix
// //         </Link>

// //         {/* Search (desktop) */}
// //         <form
// //           onSubmit={goSearch}
// //           className="hidden md:flex flex-1 max-w-md mx-auto"
// //         >
// //           <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
// //             <span className="text-white/50 text-sm">🔎</span>
// //             <input
// //               value={q}
// //               onChange={(e) => setQ(e.target.value)}
// //               placeholder="Search"
// //               className="w-full bg-transparent outline-none text-sm text-white/90 placeholder:text-white/40"
// //             />
// //           </div>
// //         </form>

// //         {/* Right actions */}
// //         <div className="ml-auto flex items-center gap-1">
// //           <NavLink to="/" end title="Home">
// //             <Icon>🏠</Icon>
// //           </NavLink>

// //           <NavLink to="/explore" title="Explore">
// //             <Icon>🧭</Icon>
// //           </NavLink>

// //           <NavLink to="/create" title="Create">
// //             <Icon>➕</Icon>
// //           </NavLink>

// //           <NavLink to="/notifications" title="Notifications">
// //             <Icon>♡</Icon>
// //           </NavLink>

// //           {/* Auth */}
// //           {!loading && isAuthed ? (
// //             <div className="flex items-center gap-2 ml-2">
// //               <button
// //                 onClick={() => navigate(`/u/${user.username}`)}
// //                 className="hidden sm:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
// //                 title="Profile"
// //               >
// //                 <div className="h-7 w-7 rounded-full bg-white/10 grid place-items-center text-xs font-semibold">
// //                   {user.username?.slice(0, 2).toUpperCase()}
// //                 </div>
// //                 <span className="text-sm text-white/90">@{user.username}</span>
// //               </button>

// //               <button
// //                 onClick={logout}
// //                 className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
// //               >
// //                 Logout
// //               </button>
// //             </div>
// //           ) : (
// //             !loading && (
// //               <Link
// //                 to="/login"
// //                 className="ml-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
// //               >
// //                 Login
// //               </Link>
// //             )
// //           )}
// //         </div>
// //       </div>

// //       {/* Search (mobile) */}
// //       <div className="md:hidden px-3 pb-3">
// //         <form onSubmit={goSearch} className="flex">
// //           <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
// //             <span className="text-white/50 text-sm">🔎</span>
// //             <input
// //               value={q}
// //               onChange={(e) => setQ(e.target.value)}
// //               placeholder="Search"
// //               className="w-full bg-transparent outline-none text-sm text-white/90 placeholder:text-white/40"
// //             />
// //           </div>
// //         </form>
// //       </div>
// //     </header>
// //   );
// // }

// import React, { useMemo, useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "@/store/auth.store";

// function Icon({ children }) {
//   return (
//     <span className="grid h-9 w-9 place-items-center rounded-xl hover:bg-white/10 text-white/90">
//       {children}
//     </span>
//   );
// }

// // Profile-like "logo" icon (for Suggestions)
// function BubbleIcon({ label = "SG" }) {
//   return (
//     <div className="h-9 w-9 rounded-full bg-white/10 grid place-items-center text-xs font-semibold">
//       {label}
//     </div>
//   );
// }

// export default function Navbar() {
//   const navigate = useNavigate();
//   const { user, logout, loading } = useAuth();
//   const [q, setQ] = useState("");

//   const isAuthed = useMemo(() => !loading && Boolean(user), [loading, user]);

//   const goSearch = (e) => {
//     e.preventDefault();
//     const query = q.trim();
//     if (!query) return;
//     navigate(`/explore?q=${encodeURIComponent(query)}`);
//   };

//   return (
//     <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1220]/80 backdrop-blur">
//       <div className="mx-auto max-w-6xl h-14 px-3 md:px-6 flex items-center gap-3">
//         {/* Brand */}
//         <Link to="/" className="font-semibold text-lg tracking-wide hover:opacity-90">
//           Orbix
//         </Link>

//         {/* Search (desktop only) */}
//         <form onSubmit={goSearch} className="hidden md:flex flex-1 max-w-md mx-auto">
//           <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
//             <span className="text-white/50 text-sm">🔎</span>
//             <input
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//               placeholder="Search"
//               className="w-full bg-transparent outline-none text-sm text-white/90 placeholder:text-white/40"
//             />
//           </div>
//         </form>

//         {/* Right actions */}
//         <div className="ml-auto flex items-center gap-1">
//           {/* ✅ DESKTOP ICONS (keep same as your current laptop UI) */}
//           <div className="hidden md:flex items-center gap-1">
//             <NavLink to="/" end title="Home">
//               <Icon>🏠</Icon>
//             </NavLink>
//             <NavLink to="/explore" title="Explore">
//               <Icon>🧭</Icon>
//             </NavLink>
//             <NavLink to="/create" title="Create">
//               <Icon>➕</Icon>
//             </NavLink>
//             <NavLink to="/notifications" title="Notifications">
//               <Icon>♡</Icon>
//             </NavLink>
//           </div>

//           {/* ✅ MOBILE ONLY: Suggestions + Profile + Logout/Login */}
//           {!loading && isAuthed ? (
//             <div className="flex md:hidden items-center gap-2">
//               {/* Suggestions */}
//               <button
//                 onClick={() => navigate("/suggestions")}
//                 className="rounded-xl hover:bg-white/10"
//                 title="Suggestions"
//                 type="button"
//               >
//                 <BubbleIcon label="SU" />
//               </button>

//               {/* Profile */}
//               <button
//                 onClick={() => navigate(`/u/${user.username}`)}
//                 className="rounded-xl hover:bg-white/10"
//                 title="Profile"
//                 type="button"
//               >
//                 <BubbleIcon label={user.username?.slice(0, 2).toUpperCase()} />
//               </button>

//               {/* Logout */}
//               <button
//                 onClick={logout}
//                 className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
//                 type="button"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             !loading && (
//               <div className="flex md:hidden items-center gap-2">
//                 {/* Suggestions still visible even if logged out (optional) */}
//                 <button
//                   onClick={() => navigate("/suggestions")}
//                   className="rounded-xl hover:bg-white/10"
//                   title="Suggestions"
//                   type="button"
//                 >
//                   <BubbleIcon label="SU" />
//                 </button>

//                 <Link
//                   to="/login"
//                   className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
//                 >
//                   Login
//                 </Link>
//               </div>
//             )
//           )}

//           {/* ✅ DESKTOP AUTH (keep same as your current laptop UI) */}
//           {!loading && isAuthed ? (
//             <div className="hidden md:flex items-center gap-2 ml-2">
//               <button
//                 onClick={() => navigate(`/u/${user.username}`)}
//                 className="hidden sm:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
//                 title="Profile"
//               >
//                 <div className="h-7 w-7 rounded-full bg-white/10 grid place-items-center text-xs font-semibold">
//                   {user.username?.slice(0, 2).toUpperCase()}
//                 </div>
//                 <span className="text-sm text-white/90">@{user.username}</span>
//               </button>

//               <button
//                 onClick={logout}
//                 className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             !loading && (
//               <Link
//                 to="/login"
//                 className="hidden md:inline-flex ml-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
//               >
//                 Login
//               </Link>
//             )
//           )}
//         </div>
//       </div>

//       {/* Search (mobile only) */}
//       <div className="md:hidden px-3 pb-3">
//         <form onSubmit={goSearch} className="flex">
//           <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
//             <span className="text-white/50 text-sm">🔎</span>
//             <input
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//               placeholder="Search"
//               className="w-full bg-transparent outline-none text-sm text-white/90 placeholder:text-white/40"
//             />
//           </div>
//         </form>
//       </div>
//     </header>
//   );
// }


// import React, { useMemo, useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "@/store/auth.store";
// import Modal from "@/components/ui/Modal";
// import SuggestionsCard from "@/components/right/SuggestionsCard";

// function Icon({ children }) {
//   return (
//     <span className="grid h-10 w-10 place-items-center rounded-xl hover:bg-white/10 text-white/90 transition">
//       {children}
//     </span>
//   );
// }

// export default function Navbar() {
//   const navigate = useNavigate();
//   const { user, logout, loading } = useAuth();
//   const [q, setQ] = useState("");
//   const [suggOpen, setSuggOpen] = useState(false);

//   const isAuthed = useMemo(() => !loading && Boolean(user), [loading, user]);

//   const goSearch = (e) => {
//     e.preventDefault();
//     const query = q.trim();
//     if (!query) return;
//     navigate(`/explore?q=${encodeURIComponent(query)}`);
//   };

//   return (
//     <header className="glass border-b border-white/10">
//       <div className="mx-auto max-w-7xl h-16 px-4 md:px-6 flex items-center gap-4">
//         {/* Brand */}
//         <Link to="/" className="font-semibold text-lg tracking-wide hover:opacity-90">
//           Orbix
//         </Link>

//         {/* Search (desktop only) */}
//         <form onSubmit={goSearch} className="hidden md:flex flex-1 max-w-md mx-auto">
//           <div className="flex w-full items-center gap-2 rounded-2xl glass-soft px-3 py-2">
//             <span className="text-white/50 text-sm">🔎</span>
//             <input
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//               placeholder="Search"
//               className="w-full bg-transparent outline-none text-sm text-white/90 placeholder:text-white/40"
//             />
//           </div>
//         </form>

//         {/* Desktop actions */}
//         <div className="ml-auto hidden md:flex items-center gap-1">
//           <NavLink to="/" end title="Home">
//             <Icon>🏠</Icon>
//           </NavLink>
//           <NavLink to="/explore" title="Explore">
//             <Icon>🧭</Icon>
//           </NavLink>
//           <NavLink to="/create" title="Create">
//             <Icon>➕</Icon>
//           </NavLink>
//           <NavLink to="/notifications" title="Notifications">
//             <Icon>🔔</Icon>
//           </NavLink>

//           {!loading && isAuthed ? (
//             <div className="flex items-center gap-2 ml-2">
//               <button
//                 onClick={() => navigate(`/u/${user.username}`)}
//                 className="hidden sm:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
//                 title="Profile"
//               >
//                 <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 grid place-items-center text-xs font-semibold shadow-md">
//                   {user.username?.slice(0, 2).toUpperCase()}
//                 </div>
//                 <span className="text-sm text-white/90">@{user.username}</span>
//               </button>

//               <button
//                 onClick={logout}
//                 className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             !loading && (
//               <Link
//                 to="/login"
//                 className="ml-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
//               >
//                 Login
//               </Link>
//             )
//           )}
//         </div>

//         {/* Mobile actions */}
//         <div className="ml-auto flex md:hidden items-center gap-1">
//           {isAuthed ? (
//             <>
//               <button onClick={() => setSuggOpen(true)} title="Suggestions">
//                 <Icon>👥</Icon>
//               </button>

//               <button onClick={() => navigate(`/u/${user.username}`)} title="Profile">
//                 <Icon>👤</Icon>
//               </button>

//               <button
//                 onClick={logout}
//                 className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             !loading && (
//               <Link
//                 to="/login"
//                 className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
//               >
//                 Login
//               </Link>
//             )
//           )}
//         </div>
//       </div>

//       {/* Mobile suggestions modal */}
//       <Modal open={suggOpen} onClose={() => setSuggOpen(false)} title="Suggestions">
//         <SuggestionsCard />
//       </Modal>
//     </header>
//   );
// }

import React, { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/store/auth.store";
import Modal from "@/components/ui/Modal";
import SuggestionsCard from "@/components/right/SuggestionsCard";

function Icon({ children }) {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-xl hover:bg-white/10 text-white/90 transition">
      {children}
    </span>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [q, setQ] = useState("");
  const [suggOpen, setSuggOpen] = useState(false);

  const isAuthed = useMemo(() => !loading && Boolean(user), [loading, user]);

  const goSearch = (e) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    navigate(`/explore?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="glass border-b border-white/10">
      <div className="mx-auto max-w-7xl h-16 px-4 md:px-6 flex items-center gap-4">
        {/* Brand */}
        <Link to="/" className="font-semibold text-lg tracking-wide hover:opacity-90">
          Orbix
        </Link>

        {/* Search (desktop only) */}
        <form onSubmit={goSearch} className="hidden md:flex flex-1 max-w-md mx-auto">
          <div className="flex w-full items-center gap-2 rounded-2xl glass-soft px-3 py-2">
            <span className="text-white/50 text-sm">🔎</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent outline-none text-sm text-white/90 placeholder:text-white/40"
            />
          </div>
        </form>

        {/* Desktop actions */}
        <div className="ml-auto hidden md:flex items-center gap-1">
          <NavLink to="/" end title="Home">
            <Icon>🏠</Icon>
          </NavLink>
          <NavLink to="/explore" title="Explore">
            <Icon>🧭</Icon>
          </NavLink>

          {!loading && isAuthed ? (
            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={() => navigate(`/u/${user.username}`)}
                className="hidden sm:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
                title="Profile"
              >
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 border border-white/10 grid place-items-center text-xs font-semibold shadow-md">
                  {user.username?.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-sm text-white/90">@{user.username}</span>
              </button>

              <button
                onClick={logout}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Logout
              </button>
            </div>
          ) : (
            !loading && (
              <Link
                to="/login"
                className="ml-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                Login
              </Link>
            )
          )}
        </div>

        {/* Mobile actions (clean version) */}
        <div className="ml-auto flex md:hidden items-center gap-1">
          {isAuthed ? (
            <>
              {/* Explore */}
              <button onClick={() => navigate("/explore")} title="Explore">
                <Icon>🧭</Icon>
              </button>

              {/* Messages */}
              <button onClick={() => navigate("/messages")} title="Messages">
                <Icon>💬</Icon>
              </button>

              {/* Suggestions */}
              <button onClick={() => setSuggOpen(true)} title="Suggestions">
                <Icon>👥</Icon>
              </button>

              {/* Profile */}
              <button onClick={() => navigate(`/u/${user.username}`)} title="Profile">
                <Icon>👤</Icon>
              </button>

              {/* Logout */}
              <button
                onClick={logout}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Logout
              </button>
            </>
          ) : (
            !loading && (
              <Link
                to="/login"
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                Login
              </Link>
            )
          )}
        </div>
      </div>

      {/* Mobile suggestions modal */}
      <Modal open={suggOpen} onClose={() => setSuggOpen(false)} title="Suggestions">
        <SuggestionsCard />
      </Modal>
    </header>
  );
}