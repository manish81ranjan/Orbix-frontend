import React from "react";
import { Link } from "react-router-dom";

/**
 * CommentItem
 * - Single comment row
 * - Shows author + text
 */
export default function CommentItem({ comment }) {
  const username = comment.authorUsername || "user";

  return (
    <div className="flex items-start gap-2 text-sm">
      {/* Avatar placeholder */}
      <div className="w-7 h-7 rounded-full bg-white/10 grid place-items-center text-[10px]">
        {username.slice(0, 2).toUpperCase()}
      </div>

      <div className="leading-tight">
        <Link
          to={`/u/${username}`}
          className="font-medium hover:underline mr-1"
        >
          @{username}
        </Link>
        <span className="text-white/80">
          {comment.text || ""}
        </span>

        {comment.createdAt && (
          <div className="text-xs text-white/40 mt-0.5">
            {new Date(comment.createdAt).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}
