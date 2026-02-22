// import { request } from "./http";

// /**
//  * Upload APIs
//  * - Placeholder implementation
//  * - Later connect to Cloudinary / S3 signed uploads
//  */

// // Request upload signature / URL (future)
// export function getUploadSignature(token) {
//   return request("/upload/signature", {
//     method: "GET",
//     token
//   });
// }

// // Save uploaded media metadata (future)
// export function saveUpload(token, payload) {
//   return request("/upload", {
//     method: "POST",
//     token,
//     body: payload
//   });
// }
// const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export async function uploadMedia(file) {
//   const token = localStorage.getItem("orbix_token") || "";

//   const form = new FormData();
//   form.append("file", file);

//   const res = await fetch(`${BASE_URL}/api/upload`, {
//     method: "POST",
//     headers: token ? { Authorization: `Bearer ${token}` } : {},
//     body: form,
//   });

//   const data = await res.json().catch(() => null);

//   if (!res.ok) {
//     throw new Error(data?.message || `Upload failed (${res.status})`);
//   }
//   return data; // { url, media_type }
// }
import { request } from "./http";

export function uploadMedia(token, file) {
  const fd = new FormData();
  fd.append("file", file);
  return request("/upload/media", { method: "POST", token, body: fd });
}
