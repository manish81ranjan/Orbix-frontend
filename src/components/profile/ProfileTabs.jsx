import React, { useState } from "react";

/**
 * ProfileTabs
 * - Simple tab bar (Posts / Reels / Tagged placeholders)
 * - Later integrate routing or state with real content
 */
export default function ProfileTabs() {
  const [active, setActive] = useState("posts");

  const Tab = ({ id, label }) => (
    <button
      onClick={() => setActive(id)}
      className={`flex-1 py-2 text-sm rounded-xl border transition ${
        active === id
          ? "bg-white/10 border-border text-white"
          : "bg-transparent border-transparent text-white/60 hover:text-white hover:bg-white/5"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-2 flex gap-2">
      <Tab id="posts" label="Posts" />
      <Tab id="reels" label="Reels" />
      <Tab id="tagged" label="Tagged" />
    </div>
  );
}
