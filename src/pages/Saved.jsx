// import React, { useMemo } from "react";
// import { Link } from "react-router-dom";

// /**
//  * Saved
//  * - Shows saved/bookmarked posts
//  * - Demo data for now
//  * - Later connect to backend: GET /saved
//  */
// export default function Saved() {
//   const demoSaved = useMemo(
//     () => [
//       { _id: "s1", mediaUrl: "https://picsum.photos/700/700?random=31" },
//       { _id: "s2", mediaUrl: "https://picsum.photos/700/700?random=32" },
//       { _id: "s3", mediaUrl: "https://picsum.photos/700/700?random=33" }
//     ],
//     []
//   );

//   if (!demoSaved.length) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-5 text-white/70">
//         You haven’t saved any posts yet.
//       </div>
//     );
//   }

//   return (
//     <section className="space-y-4">
//       <h1 className="text-lg font-semibold">Saved Posts</h1>

//       <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//         {demoSaved.map((p) => (
//           <Link
//             key={p._id}
//             to={`/p/${p._id}`}
//             className="relative overflow-hidden rounded-xl border border-border bg-black group"
//           >
//             <img
//               src={p.mediaUrl}
//               alt="saved"
//               loading="lazy"
//               className="w-full h-full object-cover aspect-square group-hover:scale-[1.03] transition"
//             />
//             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/35" />
//           </Link>
//         ))}
//       </div>

//       <div className="text-xs text-white/50">
//         Saved posts are demo-only right now.
//       </div>
//     </section>
//   );
// }
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

/**
 * Saved
 * - Shows saved/bookmarked posts
 * - Demo data for now
 * - Later connect to backend: GET /saved
 */
export default function Saved() {
  const demoSaved = useMemo(
    () => [
      { _id: "s1", mediaUrl: "https://picsum.photos/700/700?random=31" },
      { _id: "s2", mediaUrl: "https://picsum.photos/700/700?random=32" },
      { _id: "s3", mediaUrl: "https://picsum.photos/700/700?random=33" }
    ],
    []
  );

  if (!demoSaved.length) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 text-white/70">
        You haven’t saved any posts yet.
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <h1 className="text-lg font-semibold">Saved Posts</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {demoSaved.map((p) => (
          <Link
            key={p._id}
            to={`/p/${p._id}`}
            className="relative overflow-hidden rounded-xl border border-border bg-black group"
          >
            <img
              src={p.mediaUrl}
              alt="saved"
              loading="lazy"
              className="w-full h-full object-cover aspect-square group-hover:scale-[1.03] transition"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/35" />
          </Link>
        ))}
      </div>

      <div className="text-xs text-white/50">
        Saved posts are demo-only right now.
      </div>
    </section>
  );
}
