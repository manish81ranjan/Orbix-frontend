import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const BACKEND_ORIGIN =
  import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5000";

function resolveUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/uploads/")) return `${BACKEND_ORIGIN}${url}`;
  return url;
}

function isVideoUrl(url) {
  return /\.(mp4|webm|mov|mkv)$/i.test(url);
}

/**
 * REAL ExploreGrid
 * - Uses real backend posts
 * - Shows image/video tiles
 * - Instagram-like hover overlay with stats
 */
export default function ExploreGrid({ posts = [] }) {
  const tiles = useMemo(() => posts.filter((p) => p.media_url), [posts]);

  return (
    <div className="grid grid-cols-3 gap-1 md:gap-2">
      {tiles.map((p, idx) => {
        const raw = p.media_url || p.mediaUrl || "";
        const url = resolveUrl(raw);
        const type = p.media_type || p.mediaType || (isVideoUrl(url) ? "video" : "image");

        const likes = Number(p.likes_count ?? p.likesCount ?? 0);
        const comments = Number(p.comments_count ?? p.commentsCount ?? 0);

        // simple Instagram-style varied grid (optional)
        const big = idx % 10 === 0; // makes some tiles bigger
        const cls = big
          ? "col-span-2 row-span-2 aspect-square"
          : "col-span-1 row-span-1 aspect-square";

        return (
          <Link
            key={p._id}
            to={`/p/${p._id}`}
            className={[
              "group relative overflow-hidden rounded-lg border border-border bg-black",
              cls,
            ].join(" ")}
          >
            {type === "video" ? (
              <video
                src={url}
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={url}
                alt={p.caption || "post"}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            )}

            {/* overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/40" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition grid place-items-center">
              <div className="flex items-center gap-4 text-white font-semibold text-sm">
                <span>♥ {likes}</span>
                <span>💬 {comments}</span>
              </div>
            </div>

            {/* video icon */}
            {type === "video" && (
              <div className="absolute top-2 right-2 text-xs bg-black/60 px-2 py-1 rounded-lg">
                ▶ Reel
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}