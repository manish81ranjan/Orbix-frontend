import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/store/auth.store";

/**
 * ProtectedRoute
 * - Allows access only if user is authenticated
 * - Redirects to /login otherwise
 * - Preserves intended route via location.state
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-white/70">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
