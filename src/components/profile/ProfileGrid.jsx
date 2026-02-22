import React from "react";
import { Link } from "react-router-dom";

/**
 * ProfileGrid
 * - Instagram-style grid of user posts
 * - Responsive: 3 cols on mobile, 4 on md+
 */
export default function ProfileGrid({ posts = [] }) {
  if (!posts.length) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 text-white/70">
        No posts yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
      {posts.map((p) => (
        <Link
          key={p._id}
          to={`/p/${p._id}`}
          className="relative overflow-hidden rounded-xl border border-border bg-black group"
        >
          <img
            src={p.mediaUrl}
            alt="post"
            loading="lazy"
            className="w-full h-full object-cover aspect-square group-hover:scale-[1.03] transition"
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/35" />
        </Link>
      ))}
    </div>
  );
}
