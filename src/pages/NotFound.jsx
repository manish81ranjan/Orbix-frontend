import React from "react";
import { Link } from "react-router-dom";

/**
 * NotFound
 * - 404 page
 */
export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center space-y-3">
        <div className="text-4xl font-semibold">404</div>
        <p className="text-white/70">Page not found.</p>

        <Link
          to="/"
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-border bg-white/5 hover:bg-white/10"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
