import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/store/auth.store";
import { followUser, getSuggestions, unfollowUser } from "@/api/users.api";

export default function SuggestionsCard() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!token) return;
    try {
      setErr("");
      setLoading(true);
      const data = await getSuggestions(token, 6);
      setItems(data.users || []);
    } catch (e) {
      setErr(e.message || "Failed to load suggestions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const toggleFollow = async (u) => {
    if (!token) return;
    const next = !u.isFollowing;

    // optimistic UI
    setItems((prev) =>
      prev.map((x) => (x._id === u._id ? { ...x, isFollowing: next } : x))
    );

    try {
      if (next) await followUser(token, u.username);
      else await unfollowUser(token, u.username);

      // refresh list to show new suggestions
      await load();
    } catch (e) {
      // rollback
      setItems((prev) =>
        prev.map((x) => (x._id === u._id ? { ...x, isFollowing: !next } : x))
      );
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Suggestions</div>
        <button onClick={load} className="text-xs text-white/60 hover:text-white">
          Refresh
        </button>
      </div>

      <div className="mt-3">
        {loading ? (
          <div className="text-sm text-white/60">Loading…</div>
        ) : err ? (
          <div className="text-sm text-red-300">{err}</div>
        ) : !items.length ? (
          <div className="text-sm text-white/60">No suggestions right now.</div>
        ) : (
          <div className="space-y-3">
            {items.map((u) => (
              <div key={u._id} className="flex items-center justify-between">
                <Link to={`/u/${u.username}`} className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-full bg-white/10 grid place-items-center text-xs font-semibold">
                    {(u.username || "u").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 leading-tight">
                    <div className="text-sm font-medium truncate">@{u.username}</div>
                    <div className="text-xs text-white/50 truncate">
                      {u.bio || "Suggested for you"}
                    </div>
                  </div>
                </Link>

                <button
                  onClick={() => toggleFollow(u)}
                  className={[
                    "text-sm px-3 py-1.5 rounded-xl border",
                    u.isFollowing
                      ? "border-white/10 bg-white/10 text-white/80 hover:bg-white/15"
                      : "border-indigo-400/30 bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30",
                  ].join(" ")}
                >
                  {u.isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-white/40">
        Real suggestions from your database.
      </div>
    </div>
  );
}