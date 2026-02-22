// import React from "react";
// import { Link } from "react-router-dom";

// /**
//  * PostHeader
//  * - Shows author info and timestamp
//  * - Clickable profile link
//  */
// export default function PostHeader({ post }) {
//     const username = post.authorUsername || post.author_username || "unknown";
//     const createdAtRaw = post.createdAt || post.created_at;
//     const createdAt = createdAtRaw ? new Date(createdAtRaw).toLocaleString() : "";

//     return (
//         <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//                 {/* Avatar (placeholder for now) */}
//                 <div className="w-9 h-9 rounded-full bg-white/10 grid place-items-center text-xs">
//                     {username.slice(0, 2).toUpperCase()}
//                 </div>

//                 <div className="leading-tight">
//                     <Link
//                         to={`/u/${username}`}
//                         className="text-sm font-medium hover:underline"
//                     >
//                         @{username}
//                     </Link>
//                     <div className="text-xs text-white/50">
//                         {createdAt}
//                     </div>
//                 </div>
//             </div>

//             {/* More actions placeholder */}
//             <button
//                 className="text-white/60 hover:text-white text-xl leading-none"
//                 title="More"
//             >
//                 ⋯
//             </button>
//         </div>
//     );
// }
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/store/auth.store";

export default function PostHeader({ post, onDelete, deleting }) {
  const { user } = useAuth();

  const username = post.authorUsername || post.author_username || "unknown";
  const createdAtRaw = post.createdAt || post.created_at;
  const createdAt = createdAtRaw ? new Date(createdAtRaw).toLocaleString() : "";

  const isOwner = useMemo(() => {
    const me = user?.username;
    return Boolean(me && me === username);
  }, [user, username]);

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const copyLink = async () => {
    const url = `${window.location.origin}/p/${post._id}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    } catch {
      alert(url);
    }
    setOpen(false);
  };

  const handleDelete = async () => {
    setOpen(false);
    if (!isOwner) return;
    await onDelete?.(post._id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/10 grid place-items-center text-xs">
          {username.slice(0, 2).toUpperCase()}
        </div>

        <div className="leading-tight">
          <Link to={`/u/${username}`} className="text-sm font-medium hover:underline">
            @{username}
          </Link>
          <div className="text-xs text-white/50">{createdAt}</div>
        </div>
      </div>

      {/* More menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-white/60 hover:text-white text-xl leading-none px-2"
          title="More"
          disabled={deleting}
        >
          ⋯
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-[#0b1220]/95 backdrop-blur shadow-lg overflow-hidden z-50">
            <button
              onClick={copyLink}
              className="w-full text-left px-3 py-2 text-sm hover:bg-white/10"
            >
              Copy link
            </button>

            <Link
              to={`/p/${post._id}`}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm hover:bg-white/10"
            >
              View details
            </Link>

            {isOwner && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-full text-left px-3 py-2 text-sm text-red-300 hover:bg-red-500/10 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete post"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}