import React from "react";
import { Outlet, Link } from "react-router-dom";
import OrbixBackground from "@/components/three/OrbixBackground";

/**
 * AuthLayout
 * - Used for Login / Register / Forgot Password
 * - Shows Three.js background
 * - Centers auth card
 */
export default function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      {/* Three.js animated background */}
      <div className="absolute inset-0">
        <OrbixBackground />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/40 to-bg/90" />

      {/* Auth Card */}
      <div className="relative z-10 min-h-screen grid place-items-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card backdrop-blur-xl p-6 shadow-xl">
          {/* Brand */}
          <Link
            to="/"
            className="block text-center text-2xl font-semibold tracking-wide mb-1"
          >
            Orbix
          </Link>
          <p className="text-center text-sm text-white/60 mb-5">
            Connect. Share. Inspire.
          </p>

          {/* Auth Pages */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
