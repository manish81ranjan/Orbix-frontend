import React, { useEffect, useState } from "react";
import { useAuth } from "@/store/auth.store";
import { getNotifications, markAllRead } from "@/api/notifications.api";

export default function Notifications() {
  const { token, loading: authLoading } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    if (!token) return;

    try {
      setError("");
      setLoading(true);
      const data = await getNotifications(token);
      setItems(data.notifications || []);
    } catch (e) {
      setError(e.message || "Failed to load notifications");
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
    load();
  }, [token, authLoading]);

  const onReadAll = async () => {
    try {
      setBusy(true);
      await markAllRead(token);
      await load();
    } catch (e) {
      setError("Failed to mark as read");
    } finally {
      setBusy(false);
    }
  };

  if (!token) {
    return (
      <div className="p-4 text-white/60">
        Please login to view notifications.
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Notifications</h1>
        <button
          onClick={onReadAll}
          disabled={!items.length || busy}
          className="text-sm text-indigo-300 hover:text-indigo-200"
        >
          {busy ? "Marking..." : "Mark all read"}
        </button>
      </div>

      {loading ? (
        <div className="mt-4 space-y-3">
          <div className="h-14 bg-white/5 animate-pulse rounded-xl" />
          <div className="h-14 bg-white/5 animate-pulse rounded-xl" />
        </div>
      ) : error ? (
        <div className="mt-4 text-red-400">{error}</div>
      ) : !items.length ? (
        <div className="mt-4 text-white/60">
          No notifications yet.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {items.map((n) => (
            <div
              key={n._id}
              className={`flex items-center gap-3 p-3 rounded-xl border border-white/10 ${
                !n.read ? "bg-indigo-500/10" : "bg-white/5"
              }`}
            >
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                {n.from_username?.slice(0, 2).toUpperCase()}
              </div>

              <div className="flex-1 text-sm">
                <span className="font-semibold">
                  @{n.from_username}
                </span>{" "}
                {n.message}
              </div>

              {!n.read && (
                <div className="h-2 w-2 bg-indigo-400 rounded-full" />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}