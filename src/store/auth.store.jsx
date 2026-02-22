// import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
// import { loginApi, registerApi, meApi } from "@/api/auth.api";

// /**
//  * Auth Store (Context)
//  * - Holds token + user
//  * - Persists token in localStorage
//  */
// const AuthCtx = createContext(null);

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(() => localStorage.getItem("orbix_token") || "");
//   const [user, setUser] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem("orbix_user") || "null");
//     } catch {
//       return null;
//     }
//   });
//   const [loading, setLoading] = useState(true);

//   const isAuthenticated = Boolean(token);

//   // Load current user if token exists
//   useEffect(() => {
//     let mounted = true;

//     const loadMe = async () => {
//       if (!token) {
//         setLoading(false);
//         return;
//       }
//       try {
//         setLoading(true);
//         const data = await meApi(token);
//         if (!mounted) return;
//         setUser(data.user);
//         localStorage.setItem("orbix_user", JSON.stringify(data.user));
//       } catch {
//         // token invalid -> logout
//         if (!mounted) return;
//         setToken("");
//         setUser(null);
//         localStorage.removeItem("orbix_token");
//         localStorage.removeItem("orbix_user");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     loadMe();
//     return () => {
//       mounted = false;
//     };
//   }, [token]);

//   const login = async (email, password) => {
//     const data = await loginApi({ email, password });
//     setToken(data.token);
//     setUser(data.user);
//     localStorage.setItem("orbix_token", data.token);
//     localStorage.setItem("orbix_user", JSON.stringify(data.user));
//   };

//   const register = async (username, email, password) => {
//     const data = await registerApi({ username, email, password });
//     setToken(data.token);
//     setUser(data.user);
//     localStorage.setItem("orbix_token", data.token);
//     localStorage.setItem("orbix_user", JSON.stringify(data.user));
//   };

//   const logout = () => {
//     setToken("");
//     setUser(null);
//     localStorage.removeItem("orbix_token");
//     localStorage.removeItem("orbix_user");
//   };

//   const value = useMemo(
//     () => ({
//       token,
//       user,
//       loading,
//       isAuthenticated,
//       login,
//       register,
//       logout
//     }),
//     [token, user, loading, isAuthenticated]
//   );

//   return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
// }

// export function useAuth() {
//   const ctx = useContext(AuthCtx);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// }
// import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
// import { loginApi, registerApi, meApi } from "@/api/auth.api";

// /**
//  * Auth Store (Context)
//  * - Holds token + user
//  * - Persists token in localStorage
//  */
// const AuthCtx = createContext(null);

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(() => localStorage.getItem("orbix_token") || "");
//   const [user, setUser] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem("orbix_user") || "null");
//     } catch {
//       return null;
//     }
//   });

//   const [loading, setLoading] = useState(false);
//   const isAuthenticated = Boolean(token);

//   // ✅ Load current user only if token exists
//     useEffect(() => {
//     let mounted = true;

//     const loadMe = async () => {
//       if (!token) {
//         if (mounted) setLoading(false);
//         return;
//       }

//       try {
//         if (mounted) setLoading(true);
//         const data = await meApi(); // ✅ no token param needed now
//         if (!mounted) return;

//         setUser(data.user);
//         localStorage.setItem("orbix_user", JSON.stringify(data.user));
//       } catch (err) {
//         // ✅ ONLY logout if backend says token is invalid (401)
//         if (!mounted) return;

//         if (err?.status === 401) {
//           setToken("");
//           setUser(null);
//           localStorage.removeItem("orbix_token");
//           localStorage.removeItem("orbix_user");
//         }
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     loadMe();
//     return () => {
//       mounted = false;
//     };
//   }, [token]);


//   const login = async (email, password) => {
//     const data = await loginApi({ email, password });
//     setToken(data.token);
//     setUser(data.user);
//     localStorage.setItem("orbix_token", data.token);
//     localStorage.setItem("orbix_user", JSON.stringify(data.user));
//   };

//   const register = async (username, email, password) => {
//     const data = await registerApi({ username, email, password });
//     setToken(data.token);
//     setUser(data.user);
//     localStorage.setItem("orbix_token", data.token);
//     localStorage.setItem("orbix_user", JSON.stringify(data.user));
//   };

//   const logout = () => {
//     setToken("");
//     setUser(null);
//     localStorage.removeItem("orbix_token");
//     localStorage.removeItem("orbix_user");
//   };

//   const value = useMemo(
//     () => ({
//       token,
//       user,
//       loading,
//       isAuthenticated,
//       login,
//       register,
//       logout,
//     }),
//     [token, user, loading, isAuthenticated]
//   );

//   return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
// }

// export function useAuth() {
//   const ctx = useContext(AuthCtx);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// }
// import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
// import { loginApi, registerApi, meApi } from "@/api/auth.api";

// const AuthCtx = createContext(null);

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(() => localStorage.getItem("orbix_token") || "");
//   const [user, setUser] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem("orbix_user") || "null");
//     } catch {
//       return null;
//     }
//   });
//   const [loading, setLoading] = useState(true);

//   const isAuthenticated = Boolean(token);

//   useEffect(() => {
//     let mounted = true;

//     const loadMe = async () => {
//       if (!token) {
//         setLoading(false);
//         return;
//       }
//       try {
//         setLoading(true);
//         const data = await meApi();
//         if (!mounted) return;
//         setUser(data.user);
//         localStorage.setItem("orbix_user", JSON.stringify(data.user));
//       } catch {
//         if (!mounted) return;
//         setToken("");
//         setUser(null);
//         localStorage.removeItem("orbix_token");
//         localStorage.removeItem("orbix_user");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     loadMe();
//     return () => {
//       mounted = false;
//     };
//   }, [token]);

//   const login = async (email, password) => {
//     const data = await loginApi({ email, password });
//     setToken(data.token);
//     setUser(data.user);
//     localStorage.setItem("orbix_token", data.token);
//     localStorage.setItem("orbix_user", JSON.stringify(data.user));
//   };

//   const register = async (username, email, password) => {
//     const data = await registerApi({ username, email, password });
//     setToken(data.token);
//     setUser(data.user);
//     localStorage.setItem("orbix_token", data.token);
//     localStorage.setItem("orbix_user", JSON.stringify(data.user));
//   };

//   const logout = () => {
//     setToken("");
//     setUser(null);
//     localStorage.removeItem("orbix_token");
//     localStorage.removeItem("orbix_user");
//   };

//   const value = useMemo(
//     () => ({ token, user, loading, isAuthenticated, login, register, logout }),
//     [token, user, loading, isAuthenticated]
//   );

//   return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
// }

// export function useAuth() {
//   const ctx = useContext(AuthCtx);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// }
// src/store/auth.store.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { loginApi, registerApi } from "@/api/auth.api";
import { getMe } from "@/api/users.api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("orbix_token") || "";
  });

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("orbix_user") || "null");
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const isAuthenticated = Boolean(token);

  // ---------------------------------------
  // Load current user on refresh
  // ---------------------------------------
  useEffect(() => {
    let mounted = true;

    const loadMe = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // ✅ uses your users.api.js
        const data = await getMe(token);

        if (!mounted) return;

        setUser(data.user);
        localStorage.setItem("orbix_user", JSON.stringify(data.user));
      } catch (err) {
        if (!mounted) return;

        // Token invalid → force logout
        setToken("");
        setUser(null);
        localStorage.removeItem("orbix_token");
        localStorage.removeItem("orbix_user");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadMe();

    return () => {
      mounted = false;
    };
  }, [token]);

  // ---------------------------------------
  // Login
  // ---------------------------------------
  const login = async (email, password) => {
    const data = await loginApi({ email, password });

    setToken(data.token);
    setUser(data.user);

    localStorage.setItem("orbix_token", data.token);
    localStorage.setItem("orbix_user", JSON.stringify(data.user));
  };

  // ---------------------------------------
  // Register
  // ---------------------------------------
  const register = async (username, email, password) => {
    const data = await registerApi({ username, email, password });

    setToken(data.token);
    setUser(data.user);

    localStorage.setItem("orbix_token", data.token);
    localStorage.setItem("orbix_user", JSON.stringify(data.user));
  };

  // ---------------------------------------
  // Manual setUser (VERY IMPORTANT)
  // Used by Settings page after profile update
  // ---------------------------------------
  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("orbix_user", JSON.stringify(newUser));
  };

  // ---------------------------------------
  // Logout
  // ---------------------------------------
  const logout = () => {
    setToken("");
    setUser(null);

    localStorage.removeItem("orbix_token");
    localStorage.removeItem("orbix_user");
  };

  // ---------------------------------------
  // Context value
  // ---------------------------------------
  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated,
      login,
      register,
      logout,
      setUser: updateUser, // ✅ expose setter
    }),
    [token, user, loading, isAuthenticated]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}