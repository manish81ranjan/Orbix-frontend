// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// /**
//  * HTTP helper
//  * - Uses fetch
//  * - Adds JSON headers
//  * - Adds Authorization header when token exists
//  * - Throws readable error messages
//  */
// export async function request(path, { method = "GET", token, body } = {}) {
//   const headers = {
//     "Content-Type": "application/json"
//   };

//   if (token) headers.Authorization = `Bearer ${token}`;

//   const res = await fetch(`${API_BASE_URL}${path}`, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined
//   });

//   const isJson = res.headers.get("content-type")?.includes("application/json");
//   const data = isJson ? await res.json() : null;

//   if (!res.ok) {
//     const msg = data?.message || `Request failed (${res.status})`;
//     throw new Error(msg);
//   }

//   return data;
// }

// // export { API_BASE_URL };
// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// export async function request(path, { method = "GET", body } = {}) {
//   const token = localStorage.getItem("token"); // must match login storage key

//   const headers = { "Content-Type": "application/json" };
//   if (token) headers.Authorization = `Bearer ${token}`;

//   const res = await fetch(`${API_BASE_URL}${path}`, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   const isJson = res.headers.get("content-type")?.includes("application/json");
//   const data = isJson ? await res.json() : null;

//   if (!res.ok) {
//     const msg = data?.error || data?.message || `Request failed (${res.status})`;
//     throw new Error(msg);
//   }

//   return data;
// }

// // export { API_BASE_URL };
// const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// // Always hit backend under /api
// const API_PREFIX = "/api";

// export async function request(path, { method = "GET", body, token } = {}) {
//   const headers = {};

//   // Only set JSON header when body exists
//   if (body !== undefined) headers["Content-Type"] = "application/json";

//   // ✅ token from argument OR from localStorage fallback
//   const t = token || localStorage.getItem("orbix_token") || "";
//   if (t) headers.Authorization = `Bearer ${t}`;

//   const res = await fetch(`${BASE_URL}${API_PREFIX}${path}`, {
//     method,
//     headers,
//     body: body !== undefined ? JSON.stringify(body) : undefined,
//   });

//   let data = null;
//   try {
//     data = await res.json();
//   } catch {
//     // ignore
//   }

//   if (!res.ok) {
//     const msg = data?.message || `Request failed (${res.status})`;
//     const err = new Error(msg);
//     err.status = res.status;
//     err.data = data;
//     throw err;
//   }

//   return data;
// }
// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// export async function request(path, { method = "GET", body, token } = {}) {
//   const headers = {};
//   const isForm = body instanceof FormData;

//   if (!isForm) headers["Content-Type"] = "application/json";
//   if (token) headers["Authorization"] = `Bearer ${token}`;

//   const res = await fetch(`${API_BASE}${path}`, {
//     method,
//     headers,
//     body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
//   });

//   const isJson = (res.headers.get("content-type") || "").includes("application/json");
//   const data = isJson ? await res.json().catch(() => null) : null;

//   if (!res.ok) {
//     const msg =
//       (data && (data.error || data.message)) ||
//       `${res.status} ${res.statusText}`;
//     throw new Error(msg);
//   }

//   return data ?? {};
// }
// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// export async function request(path, { method = "GET", body, token } = {}) {
//   const headers = { "Content-Type": "application/json" };

//   // ✅ IMPORTANT
//   if (token) headers.Authorization = `Bearer ${token}`;

//   const res = await fetch(`${API_BASE}${path}`, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   const text = await res.text();
//   let data = null;
//   try { data = text ? JSON.parse(text) : null; } catch { data = null; }

//   if (!res.ok) {
//     const msg = data?.error || data?.message || `Request failed (${res.status})`;
//     throw new Error(msg);
//   }
//   return data;
// }
// src/api/http.js


// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// export async function request(
//     path,
//     { method = "GET", body, token, headers: extraHeaders } = {}
// ) {
//     const finalToken = token || localStorage.getItem("orbix_token") || "";
//     const isForm = body instanceof FormData;

//     const headers = {
//         ...(isForm ? {} : { "Content-Type": "application/json" }),
//         ...(extraHeaders || {}),
//     };

//     if (finalToken) headers.Authorization = `Bearer ${finalToken}`;

//     const res = await fetch(`${API_BASE}${path}`, {
//         method,
//         headers,
//         body: isForm ? body : body ? JSON.stringify(body) : undefined,
//     });

//     const text = await res.text();
//     let data = null;
//     try {
//         data = text ? JSON.parse(text) : null;
//     } catch {
//         data = null;
//     }

//     if (!res.ok) {
//         const msg = data?.error || data?.message || `Request failed (${res.status})`;
//         throw new Error(msg);
//     }
//     return data;
// }

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// function isFormData(x) {
//   return typeof FormData !== "undefined" && x instanceof FormData;
// }

// export async function request(
//   path,
//   { method = "GET", body, token, headers: extraHeaders } = {}
// ) {
//   const finalToken = token || localStorage.getItem("orbix_token") || "";

//   const headers = {
//     ...(extraHeaders || {}),
//   };

//   // ✅ IMPORTANT:
//   // - If body is FormData -> do NOT set Content-Type (browser sets boundary)
//   // - If JSON -> set Content-Type
//   if (!isFormData(body)) {
//     headers["Content-Type"] = "application/json";
//   }

//   if (finalToken) headers.Authorization = `Bearer ${finalToken}`;

//   const res = await fetch(`${API_BASE}${path}`, {
//     method,
//     headers,
//     body: body
//       ? isFormData(body)
//         ? body
//         : JSON.stringify(body)
//       : undefined,
//   });

//   const text = await res.text();
//   let data = null;
//   try {
//     data = text ? JSON.parse(text) : null;
//   } catch {
//     data = null;
//   }

//   if (!res.ok) {
//     const msg = data?.error || data?.message || `Request failed (${res.status})`;
//     throw new Error(msg);
//   }

//   return data;
// }
// frontend/src/api/http.js

// export const BACKEND_ORIGIN =
//   import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5000";

// export const API_BASE =
//   import.meta.env.VITE_API_BASE || `${BACKEND_ORIGIN}/api`;

// function isFormData(x) {
//   return typeof FormData !== "undefined" && x instanceof FormData;
// }

// export async function request(
//   path,
//   { method = "GET", body, token, headers: extraHeaders } = {}
// ) {
//   const finalToken = token || localStorage.getItem("orbix_token") || "";

//   const headers = {
//     ...(extraHeaders || {}),
//   };

//   // If body is FormData -> do NOT set Content-Type
//   if (!isFormData(body)) {
//     headers["Content-Type"] = "application/json";
//   }

//   if (finalToken) headers.Authorization = `Bearer ${finalToken}`;

//   const res = await fetch(`${API_BASE}${path}`, {
//     method,
//     headers,
//     body: body
//       ? isFormData(body)
//         ? body
//         : JSON.stringify(body)
//       : undefined,
//   });

//   const text = await res.text();
//   let data = null;

//   try {
//     data = text ? JSON.parse(text) : null;
//   } catch {
//     data = null;
//   }

//   if (!res.ok) {
//     const msg = data?.error || data?.message || `Request failed (${res.status})`;
//     throw new Error(msg);


// frontend/src/api/http.js

// ✅ Vercel must set: VITE_BACKEND_ORIGIN=https://orbix-backend-1.onrender.com
// (Fallback is only for local dev)
export const BACKEND_ORIGIN = (
  import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5000"
).replace(/\/$/, ""); // remove trailing slash if any

export const API_BASE = (
  import.meta.env.VITE_API_BASE || `${BACKEND_ORIGIN}/api`
).replace(/\/$/, ""); // ensure no trailing slash

function isFormData(x) {
  return typeof FormData !== "undefined" && x instanceof FormData;
}

export async function request(
  path,
  { method = "GET", body, token, headers: extraHeaders } = {}
) {
  const finalToken = token || localStorage.getItem("orbix_token") || "";

  const headers = {
    ...(extraHeaders || {}),
  };

  // If body is FormData -> do NOT set Content-Type
  if (!isFormData(body)) {
    headers["Content-Type"] = "application/json";
  }

  if (finalToken) headers.Authorization = `Bearer ${finalToken}`;

  // ensure path begins with "/"
  const safePath = path.startsWith("/") ? path : `/${path}`;

  const res = await fetch(`${API_BASE}${safePath}`, {
    method,
    headers,
    body: body
      ? isFormData(body)
        ? body
        : JSON.stringify(body)
      : undefined,
  });

  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    const msg = data?.error || data?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}

//   }

//   return data;

}
