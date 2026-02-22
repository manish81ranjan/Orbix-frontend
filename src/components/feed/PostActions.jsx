// import React, { useMemo, useState } from "react";
// import { useAuth } from "@/store/auth.store";
// import { likePost, unlikePost, savePost, unsavePost } from "@/api/posts.api";

// export default function PostActions({ post, onUpdated, onOpenComments }) {
//   const { token } = useAuth();
//   const [busy, setBusy] = useState(false);

//   const likedInitial = Boolean(post?.likedByMe ?? post?.liked_by_me);
//   const savedInitial = Boolean(post?.savedByMe ?? post?.saved_by_me);

//   const [liked, setLiked] = useState(likedInitial);
//   const [saved, setSaved] = useState(savedInitial);

//   const baseLikes = Number(post.likesCount ?? post.likes_count ?? 0);
//   const baseComments = Number(post.commentsCount ?? post.comments_count ?? 0);
//   const baseSaves = Number(post.savesCount ?? post.saves_count ?? 0);

//   const likesCount = useMemo(() => {
//     // optimistic display
//     if (liked === likedInitial) return baseLikes;
//     return liked ? baseLikes + 1 : Math.max(0, baseLikes - 1);
//   }, [liked, likedInitial, baseLikes]);

//   const doLike = async () => {
//     if (!token || busy) return;
//     try {
//       setBusy(true);
//       if (!liked) {
//         setLiked(true);
//         await likePost(token, post._id);
//       } else {
//         setLiked(false);
//         await unlikePost(token, post._id);
//       }
//       onUpdated?.();
//     } finally {
//       setBusy(false);
//     }
//   };

//   const doSave = async () => {
//     if (!token || busy) return;
//     try {
//       setBusy(true);
//       if (!saved) {
//         setSaved(true);
//         await savePost(token, post._id);
//       } else {
//         setSaved(false);
//         await unsavePost(token, post._id);
//       }
//       onUpdated?.();
//     } finally {
//       setBusy(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex items-center gap-2">
//         <button
//           disabled={busy}
//           onClick={doLike}
//           className={`px-3 py-1.5 rounded-xl text-sm border border-border hover:bg-white/10 ${
//             liked ? "text-pink-300" : "text-white/80"
//           }`}
//         >
//           {liked ? "♥ Liked" : "♡ Like"}
//         </button>

//         <button
//           disabled={busy}
//           onClick={() => onOpenComments?.(post._id)}
//           className="px-3 py-1.5 rounded-xl text-sm border border-border hover:bg-white/10 text-white/80"
//         >
//           💬 Comment
//         </button>
//       </div>

//       <button
//         disabled={busy}
//         onClick={doSave}
//         className={`px-3 py-1.5 rounded-xl text-sm border border-border hover:bg-white/10 ${
//           saved ? "text-indigo-300" : "text-white/80"
//         }`}
//       >
//         {saved ? "★ Saved" : "☆ Save"}
//       </button>

//       <div className="hidden sm:block text-xs text-white/60">
//         {likesCount} likes • {baseComments} comments • {baseSaves} saves
//       </div>
//     </div>
//   );
// }

import React, { useMemo, useState } from "react";
import { useAuth } from "@/store/auth.store";
import { likePost, unlikePost, savePost, unsavePost } from "@/api/posts.api";

export default function PostActions({ post, onOpenComments, onChanged }) {
  const { token } = useAuth();

  // ✅ initial from backend flags
  const initialLiked = Boolean(post?.isLiked ?? post?.is_liked);
  const initialSaved = Boolean(post?.isSaved ?? post?.is_saved);

  // ✅ local state for instant UI
  const [liked, setLiked] = useState(initialLiked);
  const [saved, setSaved] = useState(initialSaved);

  const [likeDelta, setLikeDelta] = useState(0);
  const [saveDelta, setSaveDelta] = useState(0);

  const [busyLike, setBusyLike] = useState(false);
  const [busySave, setBusySave] = useState(false);

  const baseLikes = Number(post?.likesCount ?? post?.likes_count ?? 0);
  const baseComments = Number(post?.commentsCount ?? post?.comments_count ?? 0);
  const baseSaves = Number(post?.savesCount ?? post?.saves_count ?? 0);

  const likesCount = useMemo(() => baseLikes + likeDelta, [baseLikes, likeDelta]);
  const savesCount = useMemo(() => baseSaves + saveDelta, [baseSaves, saveDelta]);

  const toggleLike = async () => {
    if (!token || busyLike) return;

    // optimistic UI
    const next = !liked;
    setLiked(next);
    setLikeDelta((d) => d + (next ? 1 : -1));

    try {
      setBusyLike(true);
      if (next) await likePost(token, post._id);
      else await unlikePost(token, post._id);

      // keep feed synced (optional)
      onChanged?.();
    } catch (e) {
      // rollback if request fails
      setLiked(!next);
      setLikeDelta((d) => d + (next ? -1 : 1));
      alert(e.message || "Failed to update like");
    } finally {
      setBusyLike(false);
    }
  };

  const toggleSave = async () => {
    if (!token || busySave) return;

    const next = !saved;
    setSaved(next);
    setSaveDelta((d) => d + (next ? 1 : -1));

    try {
      setBusySave(true);
      if (next) await savePost(token, post._id);
      else await unsavePost(token, post._id);

      onChanged?.();
    } catch (e) {
      setSaved(!next);
      setSaveDelta((d) => d + (next ? -1 : 1));
      alert(e.message || "Failed to update save");
    } finally {
      setBusySave(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        {/* Like */}
        <button
          onClick={toggleLike}
          disabled={busyLike}
          className={[
            "px-3 py-1.5 rounded-xl text-sm border border-border hover:bg-white/10 transition",
            liked ? "text-pink-300" : "text-white/80",
            busyLike ? "opacity-60 cursor-not-allowed" : "",
          ].join(" ")}
        >
          {liked ? "♥ Liked" : "♡ Like"}
        </button>

        {/* Comment */}
        <button
          onClick={() => onOpenComments?.()}
          className="px-3 py-1.5 rounded-xl text-sm border border-border hover:bg-white/10 text-white/80 transition"
        >
          💬 Comment
        </button>
      </div>

      {/* Save */}
      <button
        onClick={toggleSave}
        disabled={busySave}
        className={[
          "px-3 py-1.5 rounded-xl text-sm border border-border hover:bg-white/10 transition",
          saved ? "text-indigo-300" : "text-white/80",
          busySave ? "opacity-60 cursor-not-allowed" : "",
        ].join(" ")}
      >
        {saved ? "★ Saved" : "☆ Save"}
      </button>

      {/* Stats */}
      <div className="hidden sm:block text-xs text-white/60">
        {likesCount} likes • {baseComments} comments • {savesCount} saves
      </div>
    </div>
  );
}