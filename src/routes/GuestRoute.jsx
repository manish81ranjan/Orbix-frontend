import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/store/auth.store";

/**
 * GuestRoute
 * - Only allows access if user is NOT authenticated
 * - Redirects authenticated users to home feed
 */
export default function GuestRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-white/70">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
