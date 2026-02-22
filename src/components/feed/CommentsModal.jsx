// import React, { useEffect, useState } from "react";
// import Modal from "@/components/ui/Modal";
// import Input from "@/components/ui/Input";
// import Button from "@/components/ui/Button";

// import { useAuth } from "@/store/auth.store";
// import { getComments, addComment } from "@/api/posts.api";

// export default function CommentsModal({ open, onClose, postId, onChanged }) {
//   const { token } = useAuth();

//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");
//   const [comments, setComments] = useState([]);
//   const [text, setText] = useState("");

//   const load = async () => {
//     if (!token || !postId) return;
//     try {
//       setErr("");
//       setLoading(true);
//       const data = await getComments(token, postId);
//       setComments(data.comments || []);
//     } catch (e) {
//       setErr(e.message || "Failed to load comments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (open) load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [open, postId]);

//   const submit = async (e) => {
//     e.preventDefault();
//     const v = text.trim();
//     if (!v) return;

//     try {
//       setErr("");
//       await addComment(token, postId, v);
//       setText("");
//       await load();        // refresh list
//       onChanged?.();       // refresh feed counts
//     } catch (e2) {
//       setErr(e2.message || "Failed to post comment");
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <div className="flex items-center justify-between mb-3">
//         <div className="text-sm font-semibold">Comments</div>
//         <button
//           className="text-white/60 hover:text-white"
//           onClick={onClose}
//           type="button"
//         >
//           ✕
//         </button>
//       </div>

//       {loading ? (
//         <div className="text-sm text-white/60">Loading...</div>
//       ) : err ? (
//         <div className="text-sm text-red-300 rounded-xl border border-red-500/20 bg-red-500/10 p-3">
//           {err}
//         </div>
//       ) : comments.length ? (
//         <div className="max-h-[320px] overflow-y-auto space-y-3 pr-1">
//           {comments.map((c) => (
//             <div key={c._id} className="text-sm">
//               <div className="text-white/80 font-medium">
//                 @{c.authorUsername || c.author_username || "unknown"}
//               </div>
//               <div className="text-white/70">{c.text}</div>
//               <div className="text-xs text-white/40">
//                 {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-sm text-white/60">No comments yet.</div>
//       )}

//       <form onSubmit={submit} className="mt-4 flex gap-2">
//         <Input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Write a comment..."
//         />
//         <Button className="shrink-0">Post</Button>
//       </form>
//     </Modal>
//   );
// }

// import React, { useEffect, useState } from "react";
// import Modal from "@/components/ui/Modal";
// import Input from "@/components/ui/Input";
// import Button from "@/components/ui/Button";
// import { useAuth } from "@/store/auth.store";
// import { addComment, getComments } from "@/api/posts.api";

// function CommentRow({ c }) {
//   const u = c.authorUsername || c.author_username || "unknown";
//   const t = c.text || "";
//   const dtRaw = c.createdAt || c.created_at;
//   const dt = dtRaw ? new Date(dtRaw).toLocaleString() : "";
//   return (
//     <div className="flex gap-3 py-2 border-b border-white/10 last:border-b-0">
//       <div className="h-9 w-9 rounded-full bg-white/10 grid place-items-center text-xs font-semibold">
//         {u.slice(0, 2).toUpperCase()}
//       </div>
//       <div className="min-w-0">
//         <div className="text-sm">
//           <span className="font-medium">@{u}</span>{" "}
//           <span className="text-white/80">{t}</span>
//         </div>
//         <div className="text-xs text-white/40">{dt}</div>
//       </div>
//     </div>
//   );
// }

// export default function CommentsModal({ open, onClose, postId, onAdded }) {
//   const { token } = useAuth();
//   const [items, setItems] = useState([]);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");

//   const load = async () => {
//     if (!token || !postId) return;
//     try {
//       setErr("");
//       setLoading(true);
//       const data = await getComments(token, postId);
//       setItems(data.comments || []);
//     } catch (e) {
//       setErr(e.message || "Failed to load comments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (open) load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [open, postId]);

//   const submit = async (e) => {
//     e.preventDefault();
//     const val = text.trim();
//     if (!val) return;

//     try {
//       setErr("");
//       const data = await addComment(token, postId, val);
//       setItems((prev) => [...prev, data.comment]);
//       setText("");
//       onAdded?.(); // refresh feed counts
//     } catch (e2) {
//       setErr(e2.message || "Failed to comment");
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <div className="flex items-center justify-between">
//         <div className="text-sm font-semibold">Comments</div>
//         <button onClick={onClose} className="text-white/60 hover:text-white text-xl">
//           ×
//         </button>
//       </div>

//       <div className="mt-3 max-h-[320px] overflow-auto pr-1">
//         {loading ? (
//           <div className="text-sm text-white/60">Loading…</div>
//         ) : err ? (
//           <div className="text-sm text-red-300">{err}</div>
//         ) : items.length ? (
//           items.map((c) => <CommentRow key={c._id} c={c} />)
//         ) : (
//           <div className="text-sm text-white/60">No comments yet.</div>
//         )}
//       </div>

//       <form onSubmit={submit} className="mt-3 flex gap-2">
//         <Input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Write a comment…"
//         />
//         <Button className="shrink-0">Post</Button>
//       </form>
//     </Modal>
//   );
// }
import React, { useEffect, useMemo, useRef, useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/store/auth.store";
import { addComment, getComments } from "@/api/posts.api";

function CommentRow({ c }) {
  const u = c.authorUsername || c.author_username || "unknown";
  const t = c.text || "";
  const dtRaw = c.createdAt || c.created_at;
  const dt = dtRaw ? new Date(dtRaw).toLocaleString() : "";

  return (
    <div className="flex gap-3 py-2 border-b border-white/10 last:border-b-0">
      <div className="h-9 w-9 rounded-full bg-white/10 grid place-items-center text-xs font-semibold">
        {u.slice(0, 2).toUpperCase()}
      </div>

      <div className="min-w-0">
        <div className="text-sm leading-snug">
          <span className="font-medium">@{u}</span>{" "}
          <span className="text-white/85 whitespace-pre-wrap break-words">
            {t}
          </span>
        </div>
        <div className="text-xs text-white/40 mt-0.5">{dt}</div>
      </div>
    </div>
  );
}

export default function CommentsModal({ open, onClose, postId, onAdded }) {
  const { token } = useAuth();

  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [err, setErr] = useState("");

  const listRef = useRef(null);

  const canLoad = useMemo(() => Boolean(token && postId), [token, postId]);

  const load = async () => {
    if (!canLoad) return;

    try {
      setErr("");
      setLoading(true);

      const data = await getComments(token, postId);
      const comments = data?.comments || [];

      // Oldest -> Newest
      comments.sort((a, b) => {
        const da = new Date(a.createdAt || a.created_at || 0).getTime();
        const db = new Date(b.createdAt || b.created_at || 0).getTime();
        return da - db;
      });

      setItems(comments);

      // scroll to bottom
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTop = listRef.current.scrollHeight;
        }
      }, 0);
    } catch (e) {
      setErr(e?.message || "Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setItems([]);
      setText("");
      setErr("");
      setLoading(false);
      setPosting(false);
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, postId]);

  const submit = async (e) => {
    e.preventDefault();
    if (!canLoad || posting) return;

    const val = text.trim();
    if (!val) return;

    // optimistic
    const temp = {
      _id: "tmp_" + Date.now(),
      authorUsername: "you",
      text: val,
      createdAt: new Date().toISOString(),
    };

    try {
      setErr("");
      setPosting(true);
      setItems((prev) => [...prev, temp]);
      setText("");

      await addComment(token, postId, val);

      // reload real list (correct ids)
      await load();

      // refresh feed counts
      onAdded?.();
    } catch (e2) {
      // rollback optimistic
      setItems((prev) => prev.filter((x) => x._id !== temp._id));
      setErr(e2?.message || "Failed to comment");
      setText(val);
    } finally {
      setPosting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Comments">
      <div
        ref={listRef}
        className="max-h-[320px] overflow-auto pr-1"
      >
        {loading ? (
          <div className="text-sm text-white/60">Loading…</div>
        ) : err ? (
          <div className="text-sm text-red-300">{err}</div>
        ) : items.length ? (
          items.map((c) => <CommentRow key={c._id} c={c} />)
        ) : (
          <div className="text-sm text-white/60">No comments yet.</div>
        )}
      </div>

      <form onSubmit={submit} className="mt-3 flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment…"
          disabled={!canLoad || posting}
        />
        <Button className="shrink-0" disabled={!text.trim() || posting}>
          {posting ? "Posting..." : "Post"}
        </Button>
      </form>
    </Modal>
  );
}