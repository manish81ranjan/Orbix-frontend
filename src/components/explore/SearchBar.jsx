import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <span className="text-white/50 text-sm">🔍</span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search users or captions..."
        className="w-full bg-transparent text-sm text-white placeholder-white/50 outline-none"
      />

      {value?.length > 0 && (
        <button
          onClick={() => onChange("")}
          className="text-white/50 hover:text-white text-sm"
          title="Clear"
        >
          ✕
        </button>
      )}
    </div>
  );
}