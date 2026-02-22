import React from "react";
import CommentItem from "./CommentItem";

/**
 * CommentList
 * - Renders comments list
 * - Used in PostDetails later
 */
export default function CommentList({ comments = [] }) {
  if (!comments.length) {
    return <div className="text-sm text-white/50">No comments yet.</div>;
  }

  return (
    <div className="space-y-2">
      {comments.map((c) => (
        <CommentItem key={c._id || c.id} comment={c} />
      ))}
    </div>
  );
}
