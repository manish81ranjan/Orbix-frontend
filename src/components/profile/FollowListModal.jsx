// // import React, { useEffect, useState } from "react";
// // import Modal from "@/components/ui/Modal";
// // import { Link } from "react-router-dom";
// // import { useAuth } from "@/store/auth.store";
// // import { followUser, unfollowUser } from "@/api/users.api";

// // export default function FollowListModal({
// //   open,
// //   onClose,
// //   title = "Users",
// //   loader,          // async (token) => { users: [] }
// //   onChanged,       // callback after follow/unfollow
// // }) {
// //   const { token, user: me } = useAuth();
// //   const [items, setItems] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [err, setErr] = useState("");

// //   const load = async () => {
// //     if (!token || !loader) return;
// //     try {
// //       setErr("");
// //       setLoading(true);
// //       const data = await loader(token);
// //       setItems(data.users || []);
// //     } catch (e) {
// //       setErr(e.message || "Failed to load list");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (open) load();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [open]);

// //   const toggleFollow = async (u) => {
// //     if (!token) return;

// //     // don’t follow yourself
// //     if ((me?.username || "").toLowerCase() === (u.username || "").toLowerCase()) return;

// //     const next = !u.isFollowing;
// //     setItems((prev) => prev.map((x) => (x._id === u._id ? { ...x, isFollowing: next } : x)));

// //     try {
// //       if (next) await followUser(token, u.username);
// //       else await unfollowUser(token, u.username);

// //       onChanged?.();
// //       await load();
// //     } catch (e) {
// //       // rollback
// //       setItems((prev) => prev.map((x) => (x._id === u._id ? { ...x, isFollowing: !next } : x)));
// //     }
// //   };

// //   return (
// //     <Modal open={open} onClose={onClose} title={title}>
// //       {loading ? (
// //         <div className="text-sm text-white/60">Loading…</div>
// //       ) : err ? (
// //         <div className="text-sm text-red-300">{err}</div>
// //       ) : !items.length ? (
// //         <div className="text-sm text-white/60">No users yet.</div>
// //       ) : (
// //         <div className="max-h-[380px] overflow-auto pr-1 space-y-3">
// //           {items.map((u) => (
// //             <div key={u._id} className="flex items-center justify-between">
// //               <Link to={`/u/${u.username}`} className="flex items-center gap-3 min-w-0">
// //                 <div className="h-10 w-10 rounded-full bg-white/10 grid place-items-center text-xs font-semibold shrink-0">
// //                   {(u.username || "u").slice(0, 2).toUpperCase()}
// //                 </div>
// //                 <div className="min-w-0 leading-tight">
// //                   <div className="text-sm font-medium truncate">@{u.username}</div>
// //                   <div className="text-xs text-white/50 truncate">
// //                     {u.bio || u.name || "Orbix user"}
// //                   </div>
// //                 </div>
// //               </Link>

// //               {(me?.username || "").toLowerCase() !== (u.username || "").toLowerCase() && (
// //                 <button
// //                   onClick={() => toggleFollow(u)}
// //                   className={[
// //                     "text-sm px-3 py-1.5 rounded-xl border",
// //                     u.isFollowing
// //                       ? "border-white/10 bg-white/10 text-white/80 hover:bg-white/15"
// //                       : "border-indigo-400/30 bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30",
// //                   ].join(" ")}
// //                 >
// //                   {u.isFollowing ? "Following" : "Follow"}
// //                 </button>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </Modal>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Modal from "@/components/ui/Modal";
// import { useAuth } from "@/store/auth.store";
// import { followUser, unfollowUser } from "@/api/users.api";

// export default function FollowListModal({
//   open,
//   onClose,
//   title = "Users",
//   loader, // async (token) => ({ users: [] })
// }) {
//   const { token } = useAuth();
//   const [items, setItems] = useState([]);
//   const [err, setErr] = useState("");
//   const [loading, setLoading] = useState(false);

//   const load = async () => {
//     if (!token || !loader) return;
//     try {
//       setErr("");
//       setLoading(true);
//       const data = await loader(token);
//       setItems(data.users || []);
//     } catch (e) {
//       setErr(e.message || "Failed to load list");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (open) load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [open]);

//   const toggleFollow = async (u) => {
//     if (!token) return;
//     const next = !u.isFollowing;

//     setItems((prev) => prev.map((x) => (x._id === u._id ? { ...x, isFollowing: next } : x)));

//     try {
//       if (next) await followUser(token, u.username);
//       else await unfollowUser(token, u.username);
//       await load();
//     } catch {
//       setItems((prev) => prev.map((x) => (x._id === u._id ? { ...x, isFollowing: !next } : x)));
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title={title}>
//       <div className="max-h-[420px] overflow-auto pr-1">
//         {loading ? (
//           <div className="text-sm text-white/60">Loading…</div>
//         ) : err ? (
//           <div className="text-sm text-red-300">{err}</div>
//         ) : !items.length ? (
//           <div className="text-sm text-white/60">No users found.</div>
//         ) : (
//           <div className="space-y-3">
//             {items.map((u) => (
//               <div key={u._id} className="flex items-center justify-between gap-3">
//                 <Link to={`/u/${u.username}`} onClick={onClose} className="flex items-center gap-3 min-w-0">
//                   <div className="h-10 w-10 rounded-full bg-white/10 grid place-items-center text-xs font-semibold">
//                     {(u.username || "u").slice(0, 2).toUpperCase()}
//                   </div>
//                   <div className="min-w-0">
//                     <div className="text-sm font-medium truncate">@{u.username}</div>
//                     <div className="text-xs text-white/50 truncate">{u.bio || u.name || "Orbix user"}</div>
//                   </div>
//                 </Link>

//                 <button
//                   onClick={() => toggleFollow(u)}
//                   className={[
//                     "shrink-0 text-sm px-3 py-1.5 rounded-xl border transition",
//                     u.isFollowing
//                       ? "border-white/10 bg-white/10 text-white/80 hover:bg-white/15"
//                       : "border-indigo-400/30 bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30",
//                   ].join(" ")}
//                 >
//                   {u.isFollowing ? "Following" : "Follow"}
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// }

import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { Link } from "react-router-dom";
import { useAuth } from "@/store/auth.store";
import { followUser, unfollowUser } from "@/api/users.api";

function Row({ u, onToggle }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0">
      <Link to={`/u/${u.username}`} className="flex items-center gap-3 min-w-0">
        <div className="h-9 w-9 rounded-full bg-white/10 grid place-items-center text-xs font-semibold">
          {(u.username || "u").slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium truncate">@{u.username}</div>
          <div className="text-xs text-white/50 truncate">{u.bio || "Orbix user"}</div>
        </div>
      </Link>

      <button
        onClick={onToggle}
        className={[
          "text-sm px-3 py-1.5 rounded-xl border",
          u.isFollowing
            ? "border-white/10 bg-white/10 text-white/80 hover:bg-white/15"
            : "border-indigo-400/30 bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30",
        ].join(" ")}
      >
        {u.isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
}

export default function FollowListModal({ open, onClose, title, loadUsers }) {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!token) return;
    try {
      setErr("");
      setLoading(true);
      const data = await loadUsers();
      setItems(data.users || []);
    } catch (e) {
      setErr(e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const toggle = async (u) => {
    if (!token) return;
    const next = !u.isFollowing;

    // optimistic
    setItems((prev) => prev.map((x) => (x._id === u._id ? { ...x, isFollowing: next } : x)));

    try {
      if (next) await followUser(token, u.username);
      else await unfollowUser(token, u.username);
    } catch {
      // rollback
      setItems((prev) => prev.map((x) => (x._id === u._id ? { ...x, isFollowing: !next } : x)));
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="max-h-[420px] overflow-auto pr-1">
        {loading ? (
          <div className="text-sm text-white/60">Loading…</div>
        ) : err ? (
          <div className="text-sm text-red-300">{err}</div>
        ) : items.length ? (
          items.map((u) => <Row key={u._id} u={u} onToggle={() => toggle(u)} />)
        ) : (
          <div className="text-sm text-white/60">No users.</div>
        )}
      </div>
    </Modal>
  );
}