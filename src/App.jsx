import React from "react";
import AppRoutes from "./routes";
import { AuthProvider } from "./store/auth.store";

/**
 * Root App Component
 * - Wraps the entire app with global providers
 * - Keeps App.jsx clean and minimal
 */
export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
