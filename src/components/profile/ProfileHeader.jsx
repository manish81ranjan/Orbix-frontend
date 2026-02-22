import React from "react";
import FollowButton from "./FollowButton";

/**
 * ProfileHeader
 * - Instagram-style profile top section
 * - Shows avatar, stats, bio
 */
export default function ProfileHeader({ user }) {
  const initials = (user?.username || "u").slice(0, 2).toUpperCase();

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-white/10 border border-border grid place-items-center text-lg font-semibold">
          {initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg font-semibold truncate">@{user.username}</h1>
            <FollowButton />
          </div>

          <div className="mt-2 grid grid-cols-3 gap-3 max-w-sm text-center">
            <Stat label="Posts" value={user.postsCount ?? 0} />
            <Stat label="Followers" value={user.followersCount ?? 0} />
            <Stat label="Following" value={user.followingCount ?? 0} />
          </div>

          <div className="mt-3">
            <div className="text-sm font-medium">{user.name || "Orbix User"}</div>
            <div className="text-sm text-white/70 whitespace-pre-wrap">
              {user.bio || "No bio yet."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-border bg-white/5 py-2">
      <div className="text-sm font-semibold">{value}</div>
      <div className="text-[11px] text-white/60">{label}</div>
    </div>
  );
}
