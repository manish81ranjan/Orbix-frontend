import React from "react";
// import AppRoutes from "./routes";
import AppRoutes from "./routes/index.jsx";
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

