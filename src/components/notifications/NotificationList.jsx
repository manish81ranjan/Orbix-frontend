import React from "react";
import NotificationItem from "./NotificationItem";

/**
 * NotificationList
 * - Renders a list of notifications
 * - Reusable for future pagination / infinite scroll
 */
export default function NotificationList({ notifications = [] }) {
  if (!notifications.length) {
    return (
      <div className="text-sm text-white/60">
        You have no notifications yet.
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {notifications.map((n) => (
        <NotificationItem key={n._id || n.id} notification={n} />
      ))}
    </ul>
  );
}
