// import React, { useEffect, useState } from "react";
// import { useAuth } from "@/store/auth.store";
// import SearchBar from "@/components/explore/SearchBar";
// import ExploreGrid from "@/components/explore/ExploreGrid";
// import { explorePosts } from "@/api/posts.api";

// export default function Explore() {
//   const { token, loading: authLoading } = useAuth();
//   const [query, setQuery] = useState("");
//   const [posts, setPosts] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const load = async (q) => {
//     if (!token) return;
//     try {
//       setError("");
//       setLoading(true);
//       const data = await explorePosts(token, q);
//       setPosts(data.posts || []);
//     } catch (e) {
//       setError(e.message || "Failed to load explore");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // first load
//   useEffect(() => {
//     if (authLoading) return;
//     if (!token) {
//       setLoading(false);
//       return;
//     }
//     load("");
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token, authLoading]);

//   // search debounce
//   useEffect(() => {
//     if (!token) return;
//     const t = setTimeout(() => load(query.trim()), 300);
//     return () => clearTimeout(t);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [query]);

//   if (authLoading) return null;

//   if (!token) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4 text-white/70">
//         Please login to use Explore.
//       </div>
//     );
//   }

//   return (
//     <section className="space-y-4">
//       {/* Search */}
//       <div className="rounded-2xl border border-border bg-card p-4">
//         <SearchBar value={query} onChange={setQuery} />
//       </div>

//       {loading ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//           {Array.from({ length: 12 }).map((_, i) => (
//             <div
//               key={i}
//               className="aspect-square rounded-xl border border-border bg-white/5 animate-pulse"
//             />
//           ))}
//         </div>
//       ) : error ? (
//         <div className="rounded-2xl border border-border bg-card p-4 text-red-300">
//           {error}
//         </div>
//       ) : !posts.length ? (
//         <div className="rounded-2xl border border-border bg-card p-4 text-white/70">
//           No results.
//         </div>
//       ) : (
//         <ExploreGrid posts={posts} />
//       )}
//     </section>
//   );
// }

import React, { useEffect, useState } from "react";
import { useAuth } from "@/store/auth.store";
import SearchBar from "@/components/explore/SearchBar";
import ExploreGrid from "@/components/explore/ExploreGrid";
import { explorePosts } from "@/api/posts.api";

export default function Explore() {
  const { token, loading: authLoading } = useAuth();
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async (q) => {
    if (!token) return;
    try {
      setError("");
      setLoading(true);
      const data = await explorePosts(token, q);
      setPosts(data.posts || []);
    } catch (e) {
      setError(e.message || "Failed to load explore");
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    if (authLoading) return;
    if (!token) {
      setLoading(false);
      return;
    }
    load("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, authLoading]);

  // search debounce
  useEffect(() => {
    if (!token) return;
    const t = setTimeout(() => load(query.trim()), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (authLoading) return null;

  if (!token) {
    return (
      <div className="glass-card p-6 text-white/70 text-center">
        Please login to use Explore.
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header + Search */}
      <div className="glass-card p-5">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Explore</h1>
          <p className="text-sm text-white/50">
            Discover trending posts and creators
          </p>
        </div>

        <div className="glass-soft rounded-2xl p-3 border border-white/10">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-white/5 border border-white/10 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="glass-card p-5 text-red-300">
          {error}
        </div>
      ) : !posts.length ? (
        <div className="glass-card p-6 text-center text-white/60">
          No results found.
          <div className="mt-2 text-sm">
            Try searching something different.
          </div>
        </div>
      ) : (
        <ExploreGrid posts={posts} />
      )}
    </section>
  );
}