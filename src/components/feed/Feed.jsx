// import React from "react";
// import PostCard from "./PostCard";

// export default function Feed({ posts = [], onRefresh }) {
//   return (
//     <div className="grid gap-4">
//       {posts.map((post) => (
//         <PostCard key={post._id || post.id} post={post} onRefresh={onRefresh} />
//       ))}
//     </div>
//   );
// }
import React from "react";
import PostCard from "./PostCard";

export default function Feed({ posts = [], onRefresh }) {
  if (!posts.length) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 text-white/70">
        No posts yet. Create your first post from{" "}
        <span className="text-indigo-300">Create</span>.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <PostCard key={post._id || post.id} post={post} onRefresh={onRefresh} />
      ))}
    </div>
  );
}