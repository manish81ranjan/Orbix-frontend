import React, { useState } from "react";

/**
 * FollowButton
 * - UI-only follow/unfollow toggle for now
 * - Later connect to backend follow API
 */
export default function FollowButton() {
  const [following, setFollowing] = useState(false);

  return (
    <button
      onClick={() => setFollowing((v) => !v)}
      className={`
        px-3 py-1.5 text-xs rounded-xl border transition
        ${
          following
            ? "border-border bg-white/10 text-white/80 hover:bg-white/20"
            : "border-indigo-400/30 bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30"
        }
      `}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}
