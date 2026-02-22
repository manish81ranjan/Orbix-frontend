// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import ProtectedRoute from "./ProtectedRoute";
// import GuestRoute from "./GuestRoute";

// import RootLayout from "@/layout/RootLayout";
// import AuthLayout from "@/layout/AuthLayout";

// import HomeFeed from "@/pages/HomeFeed";
// import Explore from "@/pages/Explore";
// import CreatePost from "@/pages/CreatePost";
// import PostDetails from "@/pages/PostDetails";
// import Profile from "@/pages/Profile";
// import EditProfile from "@/pages/EditProfile";
// import Notifications from "@/pages/Notifications";
// import Saved from "@/pages/Saved";
// import Settings from "@/pages/Settings";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";
// import ForgotPassword from "@/pages/ForgotPassword";
// import NotFound from "@/pages/NotFound";

// /**
//  * Central route configuration
//  * - Protected app routes under RootLayout
//  * - Guest-only auth routes under AuthLayout
//  */
// export default function AppRoutes() {
//   return (
//     <Routes>
//       {/* ===== Protected App Routes ===== */}
//       <Route element={<RootLayout />}>
//         <Route
//           index
//           element={
//             <ProtectedRoute>
//               <HomeFeed />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/explore"
//           element={
//             <ProtectedRoute>
//               <Explore />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/create"
//           element={
//             <ProtectedRoute>
//               <CreatePost />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/p/:id"
//           element={
//             <ProtectedRoute>
//               <PostDetails />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/u/:username"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/edit-profile"
//           element={
//             <ProtectedRoute>
//               <EditProfile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/notifications"
//           element={
//             <ProtectedRoute>
//               <Notifications />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/saved"
//           element={
//             <ProtectedRoute>
//               <Saved />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/settings"
//           element={
//             <ProtectedRoute>
//               <Settings />
//             </ProtectedRoute>
//           }
//         />
//       </Route>

//       {/* ===== Guest / Auth Routes ===== */}
//       <Route element={<AuthLayout />}>
//         <Route
//           path="/login"
//           element={
//             <GuestRoute>
//               <Login />
//             </GuestRoute>
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             <GuestRoute>
//               <Register />
//             </GuestRoute>
//           }
//         />
//         <Route
//           path="/forgot"
//           element={
//             <GuestRoute>
//               <ForgotPassword />
//             </GuestRoute>
//           }
//         />
//       </Route>

//       {/* ===== Fallback ===== */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }
import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

import RootLayout from "@/layout/RootLayout";
import AuthLayout from "@/layout/AuthLayout";

import HomeFeed from "@/pages/HomeFeed";
import Explore from "@/pages/Explore";
import CreatePost from "@/pages/CreatePost";
import PostDetails from "@/pages/PostDetails";
import Profile from "@/pages/Profile";
import EditProfile from "@/pages/EditProfile";
import Notifications from "@/pages/Notifications";
import Saved from "@/pages/Saved";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import NotFound from "@/pages/NotFound";

/* 🆕 ADD THIS PAGE */
import Messages from "@/pages/Messages";

/**
 * Central route configuration
 * - Protected app routes under RootLayout
 * - Guest-only auth routes under AuthLayout
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* ===== Protected App Routes ===== */}
      <Route element={<RootLayout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <HomeFeed />
            </ProtectedRoute>
          }
        />

        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/p/:id"
          element={
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/u/:username"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
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
      </Route>

      {/* ===== Guest / Auth Routes ===== */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />
      </Route>

      {/* ===== Fallback ===== */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}