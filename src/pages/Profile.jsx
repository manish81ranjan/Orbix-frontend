// import React, { useEffect, useMemo, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useAuth } from "@/store/auth.store";
// import {
//   followUser,
//   getUserPosts,
//   getUserProfile,
//   unfollowUser,
// } from "@/api/users.api";

// const BACKEND_ORIGIN =
//   import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5000";

// const resolveUrl = (url) => {
//   if (!url) return "";
//   if (url.startsWith("http://") || url.startsWith("https://")) return url;
//   if (url.startsWith("/uploads/")) return `${BACKEND_ORIGIN}${url}`;
//   return url;
// };

// export default function Profile() {
//   const { username } = useParams();
//   const { token, user: me } = useAuth();

//   const [profile, setProfile] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [tab, setTab] = useState("posts");
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   const isMe = useMemo(() => {
//     return (me?.username || "").toLowerCase() === (username || "").toLowerCase();
//   }, [me, username]);

//   const load = async () => {
//     if (!token || !username) return;
//     try {
//       setErr("");
//       setLoading(true);

//       const [a, b] = await Promise.all([
//         getUserProfile(token, username),
//         getUserPosts(token, username),
//       ]);

//       setProfile(a.user || null);
//       setPosts(b.posts || []);
//     } catch (e) {
//       setErr(e.message || "Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token, username]);

//   const toggleFollow = async () => {
//     if (!token || !profile || isMe) return;

//     const next = !profile.isFollowing;

//     // optimistic UI
//     setProfile((p) =>
//       p
//         ? {
//             ...p,
//             isFollowing: next,
//             followersCount: Math.max(
//               0,
//               (p.followersCount || 0) + (next ? 1 : -1)
//             ),
//           }
//         : p
//     );

//     try {
//       if (next) await followUser(token, profile.username);
//       else await unfollowUser(token, profile.username);
//       await load();
//     } catch {
//       // rollback
//       setProfile((p) =>
//         p
//           ? {
//               ...p,
//               isFollowing: !next,
//               followersCount: Math.max(
//                 0,
//                 (p.followersCount || 0) + (next ? -1 : 1)
//               ),
//             }
//           : p
//       );
//     }
//   };

//   if (!token) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4 text-white/70">
//         Please login to view profiles.
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-6 animate-pulse h-[260px]" />
//     );
//   }

//   if (err) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4 text-red-300">
//         {err}
//       </div>
//     );
//   }

//   if (!profile) return null;

//   return (
//     <section className="space-y-4">
//       {/* HEADER */}
//       <div className="rounded-2xl border border-border bg-card p-5">
//         <div className="flex flex-col md:flex-row md:items-start gap-5">
//           {/* Avatar */}
//           <div className="flex items-center gap-4">
//             <div className="h-16 w-16 rounded-full bg-white/10 grid place-items-center text-base font-semibold shrink-0">
//               {(profile.username || "u").slice(0, 2).toUpperCase()}
//             </div>

//             {/* Username + Follow (mobile) */}
//             <div className="md:hidden min-w-0">
//               <div className="flex items-center gap-3">
//                 <div className="text-lg font-semibold truncate">
//                   @{profile.username}
//                 </div>
//                 {!isMe && (
//                   <button
//                     onClick={toggleFollow}
//                     className={[
//                       "text-sm px-3 py-1.5 rounded-xl border shrink-0",
//                       profile.isFollowing
//                         ? "border-white/10 bg-white/10 text-white/80 hover:bg-white/15"
//                         : "border-indigo-400/30 bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30",
//                     ].join(" ")}
//                   >
//                     {profile.isFollowing ? "Following" : "Follow"}
//                   </button>
//                 )}
//               </div>
//               <div className="text-sm text-white/70 mt-1">
//                 {profile.name || "Orbix User"}
//               </div>
//             </div>
//           </div>

//           {/* Main header info */}
//           <div className="flex-1 min-w-0">
//             {/* Username + Follow (desktop) */}
//             <div className="hidden md:flex items-center gap-3">
//               <div className="text-xl font-semibold truncate">
//                 @{profile.username}
//               </div>
//               {!isMe && (
//                 <button
//                   onClick={toggleFollow}
//                   className={[
//                     "text-sm px-3 py-1.5 rounded-xl border",
//                     profile.isFollowing
//                       ? "border-white/10 bg-white/10 text-white/80 hover:bg-white/15"
//                       : "border-indigo-400/30 bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30",
//                   ].join(" ")}
//                 >
//                   {profile.isFollowing ? "Following" : "Follow"}
//                 </button>
//               )}
//             </div>

//             {/* COUNTS (fix overlap) */}
//             <div className="mt-4 grid grid-cols-3 gap-3 max-w-md">
//               <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
//                 <div className="text-base font-semibold text-white">
//                   {profile.postsCount || 0}
//                 </div>
//                 <div className="text-xs text-white/60">Posts</div>
//               </div>

//               <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
//                 <div className="text-base font-semibold text-white">
//                   {profile.followersCount || 0}
//                 </div>
//                 <div className="text-xs text-white/60">Followers</div>
//               </div>

//               <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
//                 <div className="text-base font-semibold text-white">
//                   {profile.followingCount || 0}
//                 </div>
//                 <div className="text-xs text-white/60">Following</div>
//               </div>
//             </div>

//             {/* Bio */}
//             <div className="mt-4 text-sm text-white/80">
//               <div className="font-medium text-white/90">
//                 {profile.name || "Orbix User"}
//               </div>
//               <div className="text-white/70">{profile.bio || "No bio yet."}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* TABS */}
//       <div className="rounded-2xl border border-border bg-card p-2 flex gap-2">
//         {["posts", "reels", "tagged"].map((k) => (
//           <button
//             key={k}
//             onClick={() => setTab(k)}
//             className={[
//               "flex-1 py-2 rounded-xl text-sm",
//               tab === k ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5",
//             ].join(" ")}
//           >
//             {k === "posts" ? "Posts" : k === "reels" ? "Reels" : "Tagged"}
//           </button>
//         ))}
//       </div>

//       {/* GRID */}
//       {tab !== "posts" ? (
//         <div className="rounded-2xl border border-border bg-card p-6 text-white/60">
//           Coming soon.
//         </div>
//       ) : posts.length ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
//           {posts.map((p) => {
//             const media = p.media_url || p.mediaUrl || "";
//             const url = resolveUrl(media);
//             const isVideo = (p.media_type || p.mediaType) === "video";

//             return (
//               <Link
//                 to={`/p/${p._id}`}
//                 key={p._id}
//                 className="group relative overflow-hidden rounded-xl border border-white/10 bg-black aspect-square"
//                 title="Open post"
//               >
//                 {url ? (
//                   isVideo ? (
//                     <video
//                       src={url}
//                       className="w-full h-full object-cover"
//                       muted
//                       playsInline
//                       preload="metadata"
//                     />
//                   ) : (
//                     <img
//                       src={url}
//                       alt={p.caption || "post"}
//                       className="w-full h-full object-cover group-hover:scale-[1.02] transition"
//                       loading="lazy"
//                     />
//                   )
//                 ) : (
//                   <div className="w-full h-full grid place-items-center text-white/50 text-sm">
//                     No media
//                   </div>
//                 )}

//                 {/* hover overlay */}
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/35" />
//               </Link>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="rounded-2xl border border-border bg-card p-6 text-white/60">
//           No posts yet.
//         </div>
//       )}
//     </section>
//   );
// }
// import React, { useEffect, useMemo, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useAuth } from "@/store/auth.store";
// import {
//   followUser,
//   getFollowers,
//   getFollowing,
//   getUserPosts,
//   getUserProfile,
//   unfollowUser,
// } from "@/api/users.api";
// import FollowListModal from "@/components/profile/FollowListModal";

// const BACKEND_ORIGIN =
//   import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5000";

// const resolveUrl = (url) => {
//   if (!url) return "";
//   if (url.startsWith("http://") || url.startsWith("https://")) return url;
//   if (url.startsWith("/uploads/")) return `${BACKEND_ORIGIN}${url}`;
//   return url;
// };

// export default function Profile() {
//   const { username } = useParams();
//   const { token, user: me } = useAuth();

//   const [profile, setProfile] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [tab, setTab] = useState("posts");
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   // modals
//   const [openFollowers, setOpenFollowers] = useState(false);
//   const [openFollowing, setOpenFollowing] = useState(false);

//   const isMe = useMemo(() => {
//     return (me?.username || "").toLowerCase() === (username || "").toLowerCase();
//   }, [me, username]);

//   const load = async () => {
//     if (!token || !username) return;
//     try {
//       setErr("");
//       setLoading(true);

//       const a = await getUserProfile(token, username);
//       const b = await getUserPosts(token, username);

//       setProfile(a.user);
//       setPosts(b.posts || []);
//     } catch (e) {
//       setErr(e.message || "Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token, username]);

//   const toggleFollow = async () => {
//     if (!token || !profile || isMe) return;
//     const next = !profile.isFollowing;

//     // optimistic
//     setProfile((p) =>
//       p
//         ? {
//             ...p,
//             isFollowing: next,
//             followersCount: Math.max(
//               0,
//               (p.followersCount || 0) + (next ? 1 : -1)
//             ),
//           }
//         : p
//     );

//     try {
//       if (next) await followUser(token, profile.username);
//       else await unfollowUser(token, profile.username);
//       await load();
//     } catch {
//       // rollback
//       setProfile((p) =>
//         p
//           ? {
//               ...p,
//               isFollowing: !next,
//               followersCount: Math.max(
//                 0,
//                 (p.followersCount || 0) + (next ? -1 : 1)
//               ),
//             }
//           : p
//       );
//     }
//   };

//   if (!token) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4 text-white/70">
//         Please login to view profiles.
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-6 animate-pulse h-[260px]" />
//     );
//   }

//   if (err) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4 text-red-300">
//         {err}
//       </div>
//     );
//   }

//   if (!profile) return null;

//   return (
//     <section className="space-y-4">
//       {/* HEADER */}
//       <div className="rounded-2xl border border-border bg-card p-5">
//         <div className="flex flex-col md:flex-row md:items-start gap-5">
//           {/* Avatar */}
//           <div className="flex items-center gap-4">
//             <div className="h-16 w-16 rounded-full bg-white/10 grid place-items-center text-base font-semibold shrink-0">
//               {(profile.username || "u").slice(0, 2).toUpperCase()}
//             </div>

//             {/* Username + Follow (mobile) */}
//             <div className="md:hidden">
//               <div className="flex items-center gap-3">
//                 <div className="text-lg font-semibold">@{profile.username}</div>
//                 {!isMe && (
//                   <button
//                     onClick={toggleFollow}
//                     className={[
//                       "text-sm px-3 py-1.5 rounded-xl border",
//                       profile.isFollowing
//                         ? "border-white/10 bg-white/10 text-white/80 hover:bg-white/15"
//                         : "border-indigo-400/30 bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30",
//                     ].join(" ")}
//                   >
//                     {profile.isFollowing ? "Following" : "Follow"}
//                   </button>
//                 )}
//               </div>
//               <div className="text-sm text-white/70 mt-1">
//                 {profile.name || "Orbix User"}
//               </div>
//             </div>
//           </div>

//           {/* Main header info */}
//           <div className="flex-1 min-w-0">
//             {/* Username + Follow (desktop) */}
//             <div className="hidden md:flex items-center gap-3">
//               <div className="text-xl font-semibold truncate">
//                 @{profile.username}
//               </div>
//               {!isMe && (
//                 <button
//                   onClick={toggleFollow}
//                   className={[
//                     "text-sm px-3 py-1.5 rounded-xl border",
//                     profile.isFollowing
//                       ? "border-white/10 bg-white/10 text-white/80 hover:bg-white/15"
//                       : "border-indigo-400/30 bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30",
//                   ].join(" ")}
//                 >
//                   {profile.isFollowing ? "Following" : "Follow"}
//                 </button>
//               )}
//             </div>

//             {/* Counts row (clickable like Instagram) */}
//             <div className="mt-3 flex items-center gap-6 text-sm">
//               <div className="text-white/90">
//                 <span className="font-semibold">{profile.postsCount || 0}</span>{" "}
//                 <span className="text-white/60">posts</span>
//               </div>

//               <button
//                 onClick={() => setOpenFollowers(true)}
//                 className="text-white/90 hover:text-white"
//                 type="button"
//                 title="View followers"
//               >
//                 <span className="font-semibold">{profile.followersCount || 0}</span>{" "}
//                 <span className="text-white/60">followers</span>
//               </button>

//               <button
//                 onClick={() => setOpenFollowing(true)}
//                 className="text-white/90 hover:text-white"
//                 type="button"
//                 title="View following"
//               >
//                 <span className="font-semibold">{profile.followingCount || 0}</span>{" "}
//                 <span className="text-white/60">following</span>
//               </button>
//             </div>

//             {/* Bio */}
//             <div className="mt-3 text-sm text-white/80">
//               <div className="font-medium text-white/90">
//                 {profile.name || "Orbix User"}
//               </div>
//               <div className="text-white/70">{profile.bio || "No bio yet."}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* TABS */}
//       <div className="rounded-2xl border border-border bg-card p-2 flex gap-2">
//         {["posts", "reels", "tagged"].map((k) => (
//           <button
//             key={k}
//             onClick={() => setTab(k)}
//             className={[
//               "flex-1 py-2 rounded-xl text-sm",
//               tab === k ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5",
//             ].join(" ")}
//           >
//             {k === "posts" ? "Posts" : k === "reels" ? "Reels" : "Tagged"}
//           </button>
//         ))}
//       </div>

//       {/* GRID */}
//       {tab !== "posts" ? (
//         <div className="rounded-2xl border border-border bg-card p-6 text-white/60">
//           Coming soon.
//         </div>
//       ) : posts.length ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
//           {posts.map((p) => {
//             const url = resolveUrl(p.media_url);
//             return (
//               <Link
//                 key={p._id}
//                 to={`/p/${p._id}`}
//                 className="relative overflow-hidden rounded-xl border border-white/10 bg-black aspect-square group"
//                 title={p.caption || "View post"}
//               >
//                 {p.media_type === "video" ? (
//                   <video
//                     src={url}
//                     className="w-full h-full object-cover"
//                     muted
//                     playsInline
//                     preload="metadata"
//                   />
//                 ) : (
//                   <img
//                     src={url}
//                     alt={p.caption || "post"}
//                     className="w-full h-full object-cover group-hover:scale-[1.02] transition"
//                     loading="lazy"
//                   />
//                 )}

//                 {/* hover overlay */}
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/35" />
//               </Link>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="rounded-2xl border border-border bg-card p-6 text-white/60">
//           No posts yet.
//         </div>
//       )}

//       {/* Followers modal */}
//       <FollowListModal
//         open={openFollowers}
//         onClose={() => setOpenFollowers(false)}
//         title="Followers"
//         loader={(t) => getFollowers(t, profile.username)}
//         onChanged={load}
//       />

//       {/* Following modal */}
//       <FollowListModal
//         open={openFollowing}
//         onClose={() => setOpenFollowing(false)}
//         title="Following"
//         loader={(t) => getFollowing(t, profile.username)}
//         onChanged={load}
//       />
//     </section>
//   );
// }

// import React, { useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAuth } from "@/store/auth.store";
// import {
//   followUser,
//   getFollowers,
//   getFollowing,
//   getUserPosts,
//   getUserProfile,
//   unfollowUser,
// } from "@/api/users.api";
// import FollowListModal from "@/components/profile/FollowListModal";

// const BACKEND_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5000";
// const resolveUrl = (url) => {
//   if (!url) return "";
//   if (url.startsWith("http://") || url.startsWith("https://")) return url;
//   if (url.startsWith("/uploads/")) return `${BACKEND_ORIGIN}${url}`;
//   return url;
// };

// export default function Profile() {
//   const { username } = useParams();
//   const { token, user: me } = useAuth();

//   const [profile, setProfile] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [tab, setTab] = useState("posts");
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   const [openFollowers, setOpenFollowers] = useState(false);
//   const [openFollowing, setOpenFollowing] = useState(false);

//   const isMe = useMemo(() => {
//     return (me?.username || "").toLowerCase() === (username || "").toLowerCase();
//   }, [me, username]);

//   const load = async () => {
//     if (!token || !username) return;
//     try {
//       setErr("");
//       setLoading(true);
//       const a = await getUserProfile(token, username);
//       const b = await getUserPosts(token, username);
//       setProfile(a.user);
//       setPosts(b.posts || []);
//     } catch (e) {
//       setErr(e.message || "Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token, username]);

//   const toggleFollow = async () => {
//     if (!token || !profile || isMe) return;
//     const next = !profile.isFollowing;

//     setProfile((p) =>
//       p
//         ? {
//             ...p,
//             isFollowing: next,
//             followersCount: Math.max(0, (p.followersCount || 0) + (next ? 1 : -1)),
//           }
//         : p
//     );

//     try {
//       if (next) await followUser(token, profile.username);
//       else await unfollowUser(token, profile.username);
//       await load();
//     } catch {
//       setProfile((p) =>
//         p
//           ? {
//               ...p,
//               isFollowing: !next,
//               followersCount: Math.max(0, (p.followersCount || 0) + (next ? -1 : 1)),
//             }
//           : p
//       );
//     }
//   };

//   if (!token) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4 text-white/70">
//         Please login to view profiles.
//       </div>
//     );
//   }

//   if (loading) return <div className="rounded-2xl border border-border bg-card p-6 animate-pulse h-[260px]" />;

//   if (err) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4 text-red-300">
//         {err}
//       </div>
//     );
//   }

//   if (!profile) return null;

//   return (
//     <section className="space-y-4">
//       {/* HEADER */}
//       <div className="rounded-2xl border border-border bg-card p-5">
//         <div className="flex flex-col md:flex-row md:items-start gap-5">
//           {/* Avatar */}
//           <div className="flex items-center gap-4">
//             <div className="h-16 w-16 rounded-full bg-white/10 grid place-items-center text-base font-semibold shrink-0">
//               {(profile.username || "u").slice(0, 2).toUpperCase()}
//             </div>

//             {/* Mobile user row */}
//             <div className="md:hidden">
//               <div className="flex items-center gap-3">
//                 <div className="text-lg font-semibold">@{profile.username}</div>
//                 {!isMe && (
//                   <button
//                     onClick={toggleFollow}
//                     className={[
//                       "text-sm px-3 py-1.5 rounded-xl border",
//                       profile.isFollowing
//                         ? "border-white/10 bg-white/10 text-white/80 hover:bg-white/15"
//                         : "border-indigo-400/30 bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30",
//                     ].join(" ")}
//                   >
//                     {profile.isFollowing ? "Following" : "Follow"}
//                   </button>
//                 )}
//               </div>
//               <div className="text-sm text-white/70 mt-1">{profile.name || "Orbix User"}</div>
//             </div>
//           </div>

//           {/* Main header info */}
//           <div className="flex-1 min-w-0">
//             {/* Desktop username + follow */}
//             <div className="hidden md:flex items-center gap-3">
//               <div className="text-xl font-semibold truncate">@{profile.username}</div>
//               {!isMe && (
//                 <button
//                   onClick={toggleFollow}
//                   className={[
//                     "text-sm px-3 py-1.5 rounded-xl border",
//                     profile.isFollowing
//                       ? "border-white/10 bg-white/10 text-white/80 hover:bg-white/15"
//                       : "border-indigo-400/30 bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30",
//                   ].join(" ")}
//                 >
//                   {profile.isFollowing ? "Following" : "Follow"}
//                 </button>
//               )}
//             </div>

//             {/* Counts row (CLICKABLE) */}
//             <div className="mt-3 flex items-center gap-6 text-sm">
//               <button
//                 type="button"
//                 className="text-white/90 hover:text-white"
//                 onClick={() => setTab("posts")}
//               >
//                 <span className="font-semibold">{profile.postsCount || 0}</span>{" "}
//                 <span className="text-white/60">posts</span>
//               </button>

//               <button
//                 type="button"
//                 className="text-white/90 hover:text-white"
//                 onClick={() => setOpenFollowers(true)}
//                 disabled={(profile.followersCount || 0) === 0}
//                 title={(profile.followersCount || 0) ? "View followers" : "No followers"}
//               >
//                 <span className="font-semibold">{profile.followersCount || 0}</span>{" "}
//                 <span className="text-white/60">followers</span>
//               </button>

//               <button
//                 type="button"
//                 className="text-white/90 hover:text-white"
//                 onClick={() => setOpenFollowing(true)}
//                 disabled={(profile.followingCount || 0) === 0}
//                 title={(profile.followingCount || 0) ? "View following" : "Not following anyone"}
//               >
//                 <span className="font-semibold">{profile.followingCount || 0}</span>{" "}
//                 <span className="text-white/60">following</span>
//               </button>
//             </div>

//             {/* Bio */}
//             <div className="mt-3 text-sm text-white/80">
//               <div className="font-medium text-white/90">{profile.name || "Orbix User"}</div>
//               <div className="text-white/70">{profile.bio || "No bio yet."}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* TABS */}
//       <div className="rounded-2xl border border-border bg-card p-2 flex gap-2">
//         {["posts", "reels", "tagged"].map((k) => (
//           <button
//             key={k}
//             onClick={() => setTab(k)}
//             className={[
//               "flex-1 py-2 rounded-xl text-sm",
//               tab === k ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5",
//             ].join(" ")}
//           >
//             {k === "posts" ? "Posts" : k === "reels" ? "Reels" : "Tagged"}
//           </button>
//         ))}
//       </div>

//       {/* GRID */}
//       {tab !== "posts" ? (
//         <div className="rounded-2xl border border-border bg-card p-6 text-white/60">
//           Coming soon.
//         </div>
//       ) : posts.length ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
//           {posts.map((p) => {
//             const url = resolveUrl(p.media_url || p.mediaUrl);
//             const type = p.media_type || p.mediaType;
//             return (
//               <div
//                 key={p._id}
//                 className="relative overflow-hidden rounded-xl border border-white/10 bg-black aspect-square"
//                 title={p.caption || ""}
//               >
//                 {type === "video" ? (
//                   <video
//                     src={url}
//                     className="w-full h-full object-cover"
//                     muted
//                     playsInline
//                     preload="metadata"
//                   />
//                 ) : (
//                   <img
//                     src={url}
//                     alt={p.caption || "post"}
//                     className="w-full h-full object-cover"
//                     loading="lazy"
//                   />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="rounded-2xl border border-border bg-card p-6 text-white/60">
//           No posts yet.
//         </div>
//       )}

//       {/* FOLLOWERS MODAL */}
//       <FollowListModal
//         open={openFollowers}
//         onClose={() => setOpenFollowers(false)}
//         title="Followers"
//         loader={(token2) => getFollowers(token2, profile.username)}
//       />

//       {/* FOLLOWING MODAL */}
//       <FollowListModal
//         open={openFollowing}
//         onClose={() => setOpenFollowing(false)}
//         title="Following"
//         loader={(token2) => getFollowing(token2, profile.username)}
//       />
//     </section>
//   );
// }

// import React, { useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAuth } from "@/store/auth.store";
// import {
//   followUser,
//   getFollowers,
//   getFollowing,
//   getUserPosts,
//   getUserProfile,
//   unfollowUser,
// } from "@/api/users.api";
// import FollowListModal from "@/components/profile/FollowListModal";

// const BACKEND_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5000";
// const resolveUrl = (url) => {
//   if (!url) return "";
//   if (url.startsWith("http://") || url.startsWith("https://")) return url;
//   if (url.startsWith("/uploads/")) return `${BACKEND_ORIGIN}${url}`;
//   return url;
// };

// export default function Profile() {
//   const { username } = useParams();
//   const { token, user: me } = useAuth();

//   const [profile, setProfile] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [tab, setTab] = useState("posts");
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   const [followersOpen, setFollowersOpen] = useState(false);
//   const [followingOpen, setFollowingOpen] = useState(false);

//   const isMe = useMemo(
//     () => (me?.username || "").toLowerCase() === (username || "").toLowerCase(),
//     [me, username]
//   );

//   const load = async () => {
//     if (!token || !username) return;
//     try {
//       setErr("");
//       setLoading(true);
//       const a = await getUserProfile(token, username);
//       const b = await getUserPosts(token, username);
//       setProfile(a.user);
//       setPosts(b.posts || []);
//     } catch (e) {
//       setErr(e.message || "Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token, username]);

//   const toggleFollow = async () => {
//     if (!token || !profile || isMe) return;
//     const next = !profile.isFollowing;

//     // optimistic
//     setProfile((p) =>
//       p
//         ? {
//             ...p,
//             isFollowing: next,
//             followersCount: Math.max(0, (p.followersCount || 0) + (next ? 1 : -1)),
//           }
//         : p
//     );

//     try {
//       if (next) await followUser(token, profile.username);
//       else await unfollowUser(token, profile.username);
//       await load();
//     } catch {
//       // rollback
//       setProfile((p) =>
//         p
//           ? {
//               ...p,
//               isFollowing: !next,
//               followersCount: Math.max(0, (p.followersCount || 0) + (next ? -1 : 1)),
//             }
//           : p
//       );
//     }
//   };

//   if (!token) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4 text-white/70">
//         Please login to view profiles.
//       </div>
//     );
//   }

//   if (loading) return <div className="rounded-2xl border border-border bg-card p-6 animate-pulse h-[260px]" />;

//   if (err) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4 text-red-300">
//         {err}
//       </div>
//     );
//   }

//   if (!profile) return null;

//   return (
//     <section className="space-y-4">
//       {/* Followers modal */}
//       <FollowListModal
//         open={followersOpen}
//         onClose={() => setFollowersOpen(false)}
//         title="Followers"
//         loadUsers={() => getFollowers(token, profile.username)}
//       />
//       <FollowListModal
//         open={followingOpen}
//         onClose={() => setFollowingOpen(false)}
//         title="Following"
//         loadUsers={() => getFollowing(token, profile.username)}
//       />

//       {/* HEADER */}
//       <div className="rounded-2xl border border-border bg-card p-5">
//         <div className="flex flex-col md:flex-row md:items-start gap-5">
//           {/* Avatar */}
//           <div className="flex items-center gap-4">
//             <div className="h-16 w-16 rounded-full bg-white/10 grid place-items-center text-base font-semibold shrink-0">
//               {(profile.username || "u").slice(0, 2).toUpperCase()}
//             </div>

//             {/* Mobile username + follow */}
//             <div className="md:hidden">
//               <div className="flex items-center gap-3">
//                 <div className="text-lg font-semibold">@{profile.username}</div>
//                 {!isMe && (
//                   <button
//                     onClick={toggleFollow}
//                     className={[
//                       "text-sm px-3 py-1.5 rounded-xl border",
//                       profile.isFollowing
//                         ? "border-white/10 bg-white/10 text-white/80 hover:bg-white/15"
//                         : "border-indigo-400/30 bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30",
//                     ].join(" ")}
//                   >
//                     {profile.isFollowing ? "Following" : "Follow"}
//                   </button>
//                 )}
//               </div>
//               <div className="text-sm text-white/70 mt-1">{profile.name || "Orbix User"}</div>
//             </div>
//           </div>

//           {/* Main */}
//           <div className="flex-1 min-w-0">
//             {/* Desktop username + follow */}
//             <div className="hidden md:flex items-center gap-3">
//               <div className="text-xl font-semibold truncate">@{profile.username}</div>
//               {!isMe && (
//                 <button
//                   onClick={toggleFollow}
//                   className={[
//                     "text-sm px-3 py-1.5 rounded-xl border",
//                     profile.isFollowing
//                       ? "border-white/10 bg-white/10 text-white/80 hover:bg-white/15"
//                       : "border-indigo-400/30 bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30",
//                   ].join(" ")}
//                 >
//                   {profile.isFollowing ? "Following" : "Follow"}
//                 </button>
//               )}
//             </div>

//             {/* Counts */}
//             <div className="mt-3 flex items-center gap-6 text-sm">
//               <div className="text-white/90">
//                 <span className="font-semibold">{profile.postsCount || 0}</span>{" "}
//                 <span className="text-white/60">posts</span>
//               </div>

//               <button
//                 onClick={() => setFollowersOpen(true)}
//                 className="text-white/90 hover:underline"
//                 type="button"
//               >
//                 <span className="font-semibold">{profile.followersCount || 0}</span>{" "}
//                 <span className="text-white/60">followers</span>
//               </button>

//               <button
//                 onClick={() => setFollowingOpen(true)}
//                 className="text-white/90 hover:underline"
//                 type="button"
//               >
//                 <span className="font-semibold">{profile.followingCount || 0}</span>{" "}
//                 <span className="text-white/60">following</span>
//               </button>
//             </div>

//             {/* Bio */}
//             <div className="mt-3 text-sm text-white/80">
//               <div className="font-medium text-white/90">{profile.name || "Orbix User"}</div>
//               <div className="text-white/70">{profile.bio || "No bio yet."}</div>
//               {profile.website ? (
//                 <a
//                   href={profile.website}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="text-indigo-200 hover:underline text-sm inline-block mt-1"
//                 >
//                   {profile.website}
//                 </a>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* TABS */}
//       <div className="rounded-2xl border border-border bg-card p-2 flex gap-2">
//         {["posts", "reels", "tagged"].map((k) => (
//           <button
//             key={k}
//             onClick={() => setTab(k)}
//             className={[
//               "flex-1 py-2 rounded-xl text-sm",
//               tab === k ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5",
//             ].join(" ")}
//           >
//             {k === "posts" ? "Posts" : k === "reels" ? "Reels" : "Tagged"}
//           </button>
//         ))}
//       </div>

//       {/* GRID */}
//       {tab !== "posts" ? (
//         <div className="rounded-2xl border border-border bg-card p-6 text-white/60">
//           Coming soon.
//         </div>
//       ) : posts.length ? (
//         <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
//           {posts.map((p) => {
//             const url = resolveUrl(p.media_url);
//             return (
//               <div
//                 key={p._id}
//                 className="relative overflow-hidden rounded-xl border border-white/10 bg-black aspect-square"
//                 title={p.caption || ""}
//               >
//                 {p.media_type === "video" ? (
//                   <video src={url} className="w-full h-full object-cover" muted playsInline preload="metadata" />
//                 ) : (
//                   <img src={url} alt={p.caption} className="w-full h-full object-cover" loading="lazy" />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="rounded-2xl border border-border bg-card p-6 text-white/60">
//           No posts yet.
//         </div>
//       )}
//     </section>
//   );
// }
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/store/auth.store";
import {
  followUser,
  getFollowers,
  getFollowing,
  getUserPosts,
  getUserProfile,
  unfollowUser,
} from "@/api/users.api";
import FollowListModal from "@/components/profile/FollowListModal";

const BACKEND_ORIGIN =
  import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5000";

const resolveUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads/")) return `${BACKEND_ORIGIN}${url}`;
  return url;
};

export default function Profile() {
  const { username } = useParams();
  const { token, user: me } = useAuth();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState("posts");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);

  const isMe = useMemo(
    () =>
      (me?.username || "").toLowerCase() ===
      (username || "").toLowerCase(),
    [me, username]
  );

  const load = async () => {
    if (!token || !username) return;
    try {
      setErr("");
      setLoading(true);
      const a = await getUserProfile(token, username);
      const b = await getUserPosts(token, username);
      setProfile(a.user);
      setPosts(b.posts || []);
    } catch (e) {
      setErr(e.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [token, username]);

  const toggleFollow = async () => {
    if (!token || !profile || isMe) return;
    const next = !profile.isFollowing;

    // optimistic
    setProfile((p) =>
      p
        ? {
            ...p,
            isFollowing: next,
            followersCount: Math.max(
              0,
              (p.followersCount || 0) + (next ? 1 : -1)
            ),
          }
        : p
    );

    try {
      if (next) await followUser(token, profile.username);
      else await unfollowUser(token, profile.username);
    } catch {
      load();
    }
  };

  if (!token) {
    return (
      <div className="glass-card p-6 text-white/70 text-center">
        Please login to view profiles.
      </div>
    );
  }

  if (loading) {
    return <div className="glass-card h-[300px] animate-pulse" />;
  }

  if (err) {
    return <div className="glass-card p-6 text-red-300">{err}</div>;
  }

  if (!profile) return null;

  return (
    <section className="space-y-6">
      {/* FOLLOW MODALS */}
      <FollowListModal
        open={followersOpen}
        onClose={() => setFollowersOpen(false)}
        title="Followers"
        loadUsers={() => getFollowers(token, profile.username)}
      />
      <FollowListModal
        open={followingOpen}
        onClose={() => setFollowingOpen(false)}
        title="Following"
        loadUsers={() => getFollowing(token, profile.username)}
      />

      {/* HEADER */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="flex justify-center md:justify-start">
            <div className="h-28 w-28 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 border border-white/10 grid place-items-center text-2xl font-semibold shadow-xl">
              {(profile.username || "u").slice(0, 2).toUpperCase()}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="text-2xl font-semibold">@{profile.username}</div>

              {!isMe && (
                <button
                  onClick={toggleFollow}
                  className={[
                    "px-5 py-2 rounded-xl text-sm font-semibold border transition",
                    profile.isFollowing
                      ? "bg-white/10 border-white/10 text-white/80 hover:bg-white/15"
                      : "bg-indigo-500/20 border-indigo-400/30 text-indigo-200 hover:bg-indigo-500/30",
                  ].join(" ")}
                >
                  {profile.isFollowing ? "Following" : "Follow"}
                </button>
              )}

              {isMe && (
                <Link
                  to="/edit-profile"
                  className="px-5 py-2 rounded-xl text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 transition w-fit"
                >
                  Edit Profile
                </Link>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-4 text-sm">
              <div>
                <span className="font-semibold">{profile.postsCount || 0}</span>{" "}
                posts
              </div>

              <button
                onClick={() => setFollowersOpen(true)}
                className="hover:underline"
              >
                <span className="font-semibold">
                  {profile.followersCount || 0}
                </span>{" "}
                followers
              </button>

              <button
                onClick={() => setFollowingOpen(true)}
                className="hover:underline"
              >
                <span className="font-semibold">
                  {profile.followingCount || 0}
                </span>{" "}
                following
              </button>
            </div>

            {/* Bio */}
            <div className="mt-4 text-sm">
              <div className="font-medium">{profile.name || "Orbix User"}</div>
              <div className="text-white/70">{profile.bio || "No bio yet."}</div>

              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-300 hover:underline block mt-1"
                >
                  {profile.website}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="border-t border-white/10 flex justify-center gap-12 text-sm">
        {["posts", "reels", "tagged"].map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={[
              "py-3 border-t-2 transition",
              tab === k
                ? "border-white text-white"
                : "border-transparent text-white/50 hover:text-white",
            ].join(" ")}
          >
            {k.toUpperCase()}
          </button>
        ))}
      </div>

      {/* GRID (CLICK -> /p/:id) */}
      {tab === "posts" ? (
        posts.length ? (
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {posts.map((p) => {
              const url = resolveUrl(p.media_url);

              return (
                <Link
                  key={p._id}
                  to={`/p/${p._id}`}
                  className="relative group aspect-square overflow-hidden bg-black"
                  title={p.caption || ""}
                >
                  {p.media_type === "video" ? (
                    <>
                      <video
                        src={url}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                      />
                      {/* video badge */}
                      <div className="absolute top-2 right-2 text-xs bg-black/60 border border-white/10 px-2 py-1 rounded-lg">
                        ▶
                      </div>
                    </>
                  ) : (
                    <img
                      src={url}
                      alt={p.caption || "post"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}

                  {/* Hover overlay like Instagram */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-5 text-white text-sm font-semibold">
                    <span>❤️ {p.likesCount || 0}</span>
                    <span>💬 {p.commentsCount || 0}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="glass-card p-6 text-white/60 text-center">
            No posts yet.
          </div>
        )
      ) : (
        <div className="glass-card p-6 text-white/60 text-center">Coming soon.</div>
      )}
    </section>
  );
}