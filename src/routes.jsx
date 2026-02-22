import React from "react";
import { Routes, Route } from "react-router-dom";

// import Home from "@/pages/Home.jsx";
import HomeFeed from "@/pages/HomeFeed.jsx";
import Explore from "@/pages/Explore.jsx";
import Notifications from "@/pages/Notifications.jsx";
import Settings from "@/pages/Settings.jsx";
import Saved from "@/pages/Saved.jsx";
import Profile from "@/pages/Profile.jsx";
import NotFound from "@/pages/NotFound.jsx";

import ProtectedRoute from "@/layout/ProtectedRoute.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomeFeed />} />

      {/* Protected */}
      <Route
        path="/explore"
        element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/saved"
        element={
          <ProtectedRoute>
            <Saved />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/u/:username"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

}
