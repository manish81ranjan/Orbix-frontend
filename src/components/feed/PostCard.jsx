// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// import PostHeader from "./PostHeader";
// import PostMedia from "./PostMedia";
// import PostActions from "./PostActions";
// import PostCaption from "./PostCaption";
// import CommentsModal from "./CommentsModal";

// export default function PostCard({ post, onRefresh }) {
//   const [openComments, setOpenComments] = useState(false);

//   return (
//     <article className="rounded-2xl border border-border bg-card overflow-hidden">
//       <div className="p-4">
//         <PostHeader post={post} />
//       </div>

//       <PostMedia post={post} />

//       <div className="p-4 space-y-3">
//         <PostActions
//           post={post}
//           onUpdated={onRefresh}
//           onOpenComments={() => setOpenComments(true)}
//         />

//         <PostCaption post={post} />

//         <div className="flex items-center justify-between">
//           <button
//             onClick={() => setOpenComments(true)}
//             className="text-xs text-white/60 hover:text-white"
//           >
//             View comments
//           </button>

//           <Link
//             to={`/p/${post._id}`}
//             className="text-xs text-white/60 hover:text-white"
//           >
//             View details
//           </Link>
//         </div>
//       </div>

//       <CommentsModal
//         open={openComments}
//         onClose={() => setOpenComments(false)}
//         postId={post._id}
//         onChanged={onRefresh}
//       />
//     </article>
//   );
// }
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "@/store/auth.store";
import { deletePost } from "@/api/posts.api";

import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostActions from "./PostActions";
import PostCaption from "./PostCaption";
import CommentsModal from "./CommentsModal";

export default function PostCard({ post, onRefresh }) {
  const { token } = useAuth();
  const [openComments, setOpenComments] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (postId) => {
    if (!token) return;
    if (deleting) return;

    const ok = confirm("Delete this post?");
    if (!ok) return;

    try {
      setDeleting(true);
      await deletePost(token, postId);
      onRefresh?.(); // refresh feed after delete
    } catch (e) {
      alert(e.message || "Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <article className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="p-4">
        <PostHeader post={post} onDelete={handleDelete} deleting={deleting} />
      </div>

      <PostMedia post={post} />

      <div className="p-4 space-y-3">
        <PostActions
          post={post}
          onOpenComments={() => setOpenComments(true)}
          onChanged={onRefresh}
        />

        <PostCaption post={post} />

        <div className="flex items-center justify-between text-xs text-white/60">
          <button onClick={() => setOpenComments(true)} className="hover:text-white">
            View comments
          </button>

          <Link to={`/p/${post._id}`} className="hover:text-white">
            View details
          </Link>
        </div>
      </div>

      <CommentsModal
        open={openComments}
        onClose={() => setOpenComments(false)}
        postId={post._id}
        onAdded={onRefresh}
      />
    </article>
  );
}