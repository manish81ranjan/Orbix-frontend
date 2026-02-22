// import React from "react";

// /**
//  * RightPanel
//  * - Desktop-only auxiliary panel
//  * - Used for suggestions, trends, tips
//  */
// export default function RightPanel() {
//   return (
//     <aside className="rounded-2xl border border-border bg-card p-3">
//       <h3 className="text-sm font-medium mb-2">Suggestions</h3>

//       <ul className="space-y-2">
//         <li className="flex items-center justify-between text-sm">
//           <span className="text-white/80">@creative_dev</span>
//           <button className="text-indigo-400 hover:underline text-xs">
//             Follow
//           </button>
//         </li>
//         <li className="flex items-center justify-between text-sm">
//           <span className="text-white/80">@ui_inspo</span>
//           <button className="text-indigo-400 hover:underline text-xs">
//             Follow
//           </button>
//         </li>
//         <li className="flex items-center justify-between text-sm">
//           <span className="text-white/80">@orbix_team</span>
//           <button className="text-indigo-400 hover:underline text-xs">
//             Follow
//           </button>
//         </li>
//       </ul>

//       <div className="mt-4 text-xs text-white/50">
//         Trending features & creators will appear here.
//       </div>
//     </aside>
//   );
// }
// 

import React from "react";
import SuggestionsCard from "@/components/right/SuggestionsCard";

function Chip({ children }) {
  return (
    <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition cursor-pointer">
      {children}
    </span>
  );
}

function MessageItem({ name, text, time }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl px-3 py-2 hover:bg-white/5 transition">
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-white/10 grid place-items-center text-xs font-semibold">
        {name.slice(0, 2).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-medium truncate">{name}</div>
          <div className="text-xs text-white/40">{time}</div>
        </div>
        <div className="text-xs text-white/50 truncate">{text}</div>
      </div>
    </div>
  );
}

export default function RightPanel() {
  return (
    <div className="space-y-4">
      {/* Explore / trends */}
      {/* <div className="glass-card p-5">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Explore</div>
          <div className="text-xs text-white/50">Trending</div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Chip>#travel</Chip>
          <Chip>#nature</Chip>
          <Chip>#ai</Chip>
          <Chip>#design</Chip>
          <Chip>#coding</Chip>
          <Chip>#sunset</Chip>
        </div>

        <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <div className="p-3">
            <div className="text-xs text-white/50">Featured</div>
            <div className="text-sm font-medium mt-1">Space + Glass UI Vibes</div>
            <div className="text-xs text-white/50 mt-1">
              Build premium social UI like Instagram.
            </div>
          </div>
          <div className="h-24 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-fuchsia-500/20" />
        </div>
      </div> */}

      {/* Suggestions (your real API card) */}
      <SuggestionsCard />

      {/* Messages preview */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Messages</div>
          <button className="text-xs text-white/60 hover:text-white">View all</button>
        </div>

        <div className="mt-3 space-y-1">
          <MessageItem name="Daniel" text="Are we posting today?" time="2m" />
          <MessageItem name="Sophie" text="That UI looks insane 🔥" time="15m" />
          <MessageItem name="James" text="Send me the repo link" time="1h" />
        </div>
      </div>
    </div>
  );
}