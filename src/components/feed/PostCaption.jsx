import React, { useMemo, useState } from "react";

/**
 * PostCaption (Instagram-like)
 * - Shows: username + caption
 * - "more/less" toggle for long captions
 * - Styles hashtags + mentions (UI only)
 */

function tokenize(text) {
  // splits into words while preserving spaces/newlines
  return text.split(/(\s+)/).map((part, i) => {
    if (/^#\w+/.test(part)) return { type: "tag", value: part, key: i };
    if (/^@\w+/.test(part)) return { type: "mention", value: part, key: i };
    return { type: "text", value: part, key: i };
  });
}

export default function PostCaption({ post }) {
  const username =
    post?.authorUsername ||
    post?.author_username ||
    post?.author?.username ||
    "unknown";

  const caption = (post?.caption || "").trim();
  const [expanded, setExpanded] = useState(false);

  const LONG = 140; // IG-like threshold
  const isLong = caption.length > LONG;

  const shown = useMemo(() => {
    if (!caption) return "";
    if (!isLong) return caption;
    return expanded ? caption : caption.slice(0, LONG).trimEnd() + "…";
  }, [caption, expanded, isLong]);

  if (!caption) {
    return (
      <div className="text-sm text-white/50">
        <span className="font-semibold text-white/80">{username}</span>{" "}
        No caption
      </div>
    );
  }

  const parts = tokenize(shown);

  return (
    <div className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap">
      <span className="font-semibold text-white/95 mr-2">{username}</span>

      {parts.map((p) => {
        if (p.type === "tag") {
          return (
            <span key={p.key} className="text-indigo-300 hover:underline cursor-pointer">
              {p.value}
            </span>
          );
        }
        if (p.type === "mention") {
          return (
            <span key={p.key} className="text-indigo-300 hover:underline cursor-pointer">
              {p.value}
            </span>
          );
        }
        return <span key={p.key}>{p.value}</span>;
      })}

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="ml-2 text-white/50 hover:text-white text-sm"
        >
          {expanded ? "less" : "more"}
        </button>
      )}
    </div>
  );
}