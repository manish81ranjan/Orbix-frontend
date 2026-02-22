// import React, { useEffect, useState } from "react";
// import { useAuth } from "@/store/auth.store";
// import { getFeed } from "@/api/posts.api";
// import Feed from "@/components/feed/Feed";

// /**
//  * HomeFeed
//  * - Main feed page (Instagram-style)
//  * - Fetches posts from backend
//  * - Handles loading & error states
//  */
// export default function HomeFeed() {
//   const { token } = useAuth();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let mounted = true;

//     const loadFeed = async () => {
//       try {
//         setLoading(true);
//         const data = await getFeed(token);
//         if (mounted) setPosts(data.posts || []);
//       } catch (err) {
//         if (mounted) setError(err.message || "Failed to load feed");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     loadFeed();
//     return () => {
//       mounted = false;
//     };
//   }, [token]);

//   if (loading) {
//     return (
//       <div className="space-y-4">
//         <div className="h-32 rounded-2xl bg-card border border-border animate-pulse" />
//         <div className="h-64 rounded-2xl bg-card border border-border animate-pulse" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4 text-red-400">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <section className="space-y-4">
//       <Feed posts={posts} />
//     </section>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useAuth } from "@/store/auth.store";
// import { getFeed } from "@/api/posts.api";
// import Feed from "@/components/feed/Feed";

// /**
//  * HomeFeed
//  * - Fetches posts only when authenticated
//  * - Avoids 401 spam when token is missing
//  */
// export default function HomeFeed() {
//   const { token, isAuthenticated } = useAuth();

//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false); // start false (important)
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let mounted = true;

//     // ✅ if not logged in, don't call feed
//     if (!isAuthenticated || !token) {
//       setPosts([]);
//       setLoading(false);
//       setError("");
//       return;
//     }

//     const loadFeed = async () => {
//       try {
//         setError("");
//         setLoading(true);
//         const data = await getFeed(token);
//         if (!mounted) return;
//         setPosts(data?.posts || []);
//       } catch (err) {
//         if (!mounted) return;
//         setError(err?.message || "Failed to load feed");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     loadFeed();
//     return () => {
//       mounted = false;
//     };
//   }, [token, isAuthenticated]);

//   if (!isAuthenticated) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4 text-muted-foreground">
//         Please login to see your feed.
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="space-y-4">
//         <div className="h-32 rounded-2xl bg-card border border-border animate-pulse" />
//         <div className="h-64 rounded-2xl bg-card border border-border animate-pulse" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4 text-red-400">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <section className="space-y-4">
//       <Feed posts={posts} />
//     </section>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useAuth } from "@/store/auth.store";
// import { getFeed } from "@/api/posts.api";
// import Feed from "@/components/feed/Feed";

// export default function HomeFeed() {
//   const { isAuthenticated } = useAuth();

//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let mounted = true;

//     if (!isAuthenticated) {
//       setPosts([]);
//       setLoading(false);
//       setError("");
//       return;
//     }

//     const loadFeed = async () => {
//       try {
//         setError("");
//         setLoading(true);
//         const data = await getFeed();
//         if (!mounted) return;
//         setPosts(data?.posts || []);
//       } catch (err) {
//         if (!mounted) return;
//         setError(err?.message || "Failed to load feed");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     loadFeed();
//     return () => {
//       mounted = false;
//     };
//   }, [isAuthenticated]);

//   if (!isAuthenticated) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4 text-muted-foreground">
//         Please login to see your feed.
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="space-y-4">
//         <div className="h-32 rounded-2xl bg-card border border-border animate-pulse" />
//         <div className="h-64 rounded-2xl bg-card border border-border animate-pulse" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4 text-red-400">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <section className="space-y-4">
//       <Feed posts={posts} />
//     </section>
//   );
// }


// import React, { useEffect, useMemo, useState } from "react";
// import { useAuth } from "@/store/auth.store";
// import { getFeed } from "@/api/posts.api";
// import Feed from "@/components/feed/Feed";

// function StoriesRow() {
//   const stories = useMemo(
//     () => [
//       { username: "manish", active: true },
//       { username: "creative_dev" },
//       { username: "ui_inspo" },
//       { username: "orbix_team" },
//       { username: "travel" },
//       { username: "music" },
//       { username: "sports" },
//     ],
//     []
//   );

//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
//       <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
//         {stories.map((s) => (
//           <div key={s.username} className="flex flex-col items-center min-w-[68px]">
//             <div
//               className={[
//                 "h-14 w-14 rounded-full grid place-items-center text-xs font-semibold",
//                 s.active
//                   ? "bg-gradient-to-tr from-pink-500/60 via-purple-500/60 to-indigo-500/60"
//                   : "bg-white/10",
//               ].join(" ")}
//             >
//               {s.username.slice(0, 2).toUpperCase()}
//             </div>
//             <div className="mt-1 text-[11px] text-white/70 max-w-[68px] truncate">
//               {s.username}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function SuggestionsCard() {
//   const sug = [{ u: "creative_dev" }, { u: "ui_inspo" }, { u: "orbix_team" }];

//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//       <div className="flex items-center justify-between">
//         <div className="text-sm font-semibold">Suggestions</div>
//         <button className="text-xs text-white/60 hover:text-white">See all</button>
//       </div>

//       <div className="mt-3 space-y-3">
//         {sug.map((x) => (
//           <div key={x.u} className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="h-9 w-9 rounded-full bg-white/10 grid place-items-center text-xs font-semibold">
//                 {x.u.slice(0, 2).toUpperCase()}
//               </div>
//               <div className="leading-tight">
//                 <div className="text-sm font-medium">@{x.u}</div>
//                 <div className="text-xs text-white/50">Suggested for you</div>
//               </div>
//             </div>
//             <button className="text-sm text-indigo-300 hover:text-indigo-200">
//               Follow
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="mt-4 text-xs text-white/40">
//         Trending features & creators will appear here.
//       </div>
//     </div>
//   );
// }

// export default function HomeFeed() {
//   const { token, loading: authLoading } = useAuth();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const reload = async () => {
//     if (!token) return;
//     try {
//       setError("");
//       setLoading(true);
//       const data = await getFeed(token);
//       setPosts(data.posts || []);
//     } catch (err) {
//       setError(err.message || "Failed to load feed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (authLoading) return;
//     if (!token) {
//       setLoading(false);
//       return;
//     }
//     reload();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token, authLoading]);

//   if (authLoading) return null;

//   if (!token) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4 text-white/70">
//         Please login to view your feed.
//       </div>
//     );
//   }

//   return (
//     <section className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
//       <div className="space-y-4">
//         <StoriesRow />

//         <div className="flex items-center justify-between">
//           <div className="text-white/70 text-sm">For you</div>
//           <button
//             onClick={reload}
//             className="text-sm rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 hover:bg-white/15"
//           >
//             Refresh
//           </button>
//         </div>

//         {loading ? (
//           <div className="space-y-4">
//             <div className="h-32 rounded-2xl bg-card border border-border animate-pulse" />
//             <div className="h-64 rounded-2xl bg-card border border-border animate-pulse" />
//           </div>
//         ) : error ? (
//           <div className="rounded-2xl border border-border bg-card p-4 text-red-400">
//             {error}
//           </div>
//         ) : !posts.length ? (
//           <div className="rounded-2xl border border-border bg-card p-4 text-white/70">
//             No posts yet. Create your first post from{" "}
//             <span className="text-indigo-300">Create</span>.
//           </div>
//         ) : (
//           <Feed posts={posts} onRefresh={reload} />
//         )}
//       </div>

//       <div className="space-y-4 hidden lg:block">
//         <SuggestionsCard />
//       </div>
//     </section>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useAuth } from "@/store/auth.store";
// import { getFeed } from "@/api/posts.api";
// import Feed from "@/components/feed/Feed";

// export default function HomeFeed() {
//   const { token, loading: authLoading } = useAuth();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const reload = async () => {
//     if (!token) return;
//     try {
//       setError("");
//       setLoading(true);
//       const data = await getFeed(token);
//       setPosts(data.posts || []);
//     } catch (err) {
//       setError(err.message || "Failed to load feed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (authLoading) return;
//     if (!token) {
//       setLoading(false);
//       return;
//     }
//     reload();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token, authLoading]);

//   if (authLoading) return null;

//   if (!token) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4 text-white/70">
//         Please login to view your feed.
//       </div>
//     );
//   }

//   return (
//     <section className="space-y-4">
//       <div className="flex items-center justify-between">
//         <div className="text-white/70 text-sm">For you</div>
//         <button
//           onClick={reload}
//           className="text-sm rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 hover:bg-white/15"
//         >
//           Refresh
//         </button>
//       </div>

//       {loading ? (
//         <div className="space-y-4">
//           <div className="h-32 rounded-2xl bg-card border border-border animate-pulse" />
//           <div className="h-64 rounded-2xl bg-card border border-border animate-pulse" />
//         </div>
//       ) : error ? (
//         <div className="rounded-2xl border border-border bg-card p-4 text-red-400">
//           {error}
//         </div>
//       ) : (
//         <Feed posts={posts} onRefresh={reload} />
//       )}
//     </section>
//   );
// }

import React, { useEffect, useState } from "react";
import { useAuth } from "@/store/auth.store";
import { getFeed } from "@/api/posts.api";
import Feed from "@/components/feed/Feed";

export default function HomeFeed() {
  const { token, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = async () => {
    if (!token) return;
    try {
      setError("");
      setLoading(true);
      const data = await getFeed(token);
      setPosts(data.posts || []);
    } catch (err) {
      setError(err.message || "Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!token) {
      setLoading(false);
      return;
    }
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, authLoading]);

  if (authLoading) return null;

  if (!token) {
    return (
      <div className="glass-card p-6 text-white/70 text-center">
        Please login to view your feed.
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="glass-soft rounded-2xl p-4 border border-white/10 flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">For You</div>
          <div className="text-xs text-white/50">
            Latest posts from people you follow
          </div>
        </div>

        <button
          onClick={reload}
          className="rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
        >
          Refresh
        </button>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="space-y-6">
          <div className="glass-card p-5 space-y-4 animate-pulse">
            <div className="h-5 w-32 bg-white/10 rounded-lg" />
            <div className="h-64 bg-white/10 rounded-2xl" />
            <div className="h-4 w-48 bg-white/10 rounded-lg" />
          </div>

          <div className="glass-card p-5 space-y-4 animate-pulse">
            <div className="h-5 w-28 bg-white/10 rounded-lg" />
            <div className="h-64 bg-white/10 rounded-2xl" />
            <div className="h-4 w-40 bg-white/10 rounded-lg" />
          </div>
        </div>
      ) : error ? (
        <div className="glass-card p-5 text-red-400">
          {error}
        </div>
      ) : posts.length === 0 ? (
        <div className="glass-card p-6 text-center text-white/60">
          No posts yet.
          <div className="mt-2 text-sm">
            Follow people or create your first post.
          </div>
        </div>
      ) : (
        <Feed posts={posts} onRefresh={reload} />
      )}
    </section>
  );
}