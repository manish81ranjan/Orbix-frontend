import React from "react";
import { Link } from "react-router-dom";

/**
 * NotificationItem
 * - Single notification row
 * - Supports follow / like / comment (UI-ready)
 */
export default function NotificationItem({ notification }) {
  const { type, from, message } = notification;

  const icon =
    type === "follow" ? "➕" :
    type === "like" ? "♥" :
    type === "comment" ? "💬" : "🔔";

  return (
    <li className="flex items-start gap-3 rounded-xl border border-border bg-white/5 p-3">
      {/* Icon */}
      <div className="w-8 h-8 rounded-full bg-white/10 grid place-items-center text-sm">
        {icon}
      </div>

      {/* Content */}
      <div className="text-sm leading-snug">
        <Link
          to={`/u/${from}`}
          className="font-medium hover:underline mr-1"
        >
          @{from}
        </Link>
        <span className="text-white/80">{message}</span>
      </div>
    </li>
  );
}
