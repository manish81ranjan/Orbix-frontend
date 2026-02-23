// frontend/src/api/http.js

// ✅ In Vercel set:
// VITE_BACKEND_ORIGIN=https://orbix-backend-1.onrender.com

export const BACKEND_ORIGIN = (
  import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5000"
).replace(/\/$/, ""); // remove trailing slash

export const API_BASE = (
  import.meta.env.VITE_API_BASE || `${BACKEND_ORIGIN}/api`
).replace(/\/$/, ""); // remove trailing slash

function isFormData(x) {
  return typeof FormData !== "undefined" && x instanceof FormData;
}

export async function request(
  path,
  { method = "GET", body, token, headers: extraHeaders } = {}
) {
  const finalToken = token || localStorage.getItem("orbix_token") || "";

  const headers = { ...(extraHeaders || {}) };

  // If body is FormData -> do NOT set Content-Type
  if (!isFormData(body)) headers["Content-Type"] = "application/json";

  if (finalToken) headers.Authorization = `Bearer ${finalToken}`;

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
