// import { request } from "./http";

// /**
//  * Posts APIs
//  * Backend base path: /api/posts
//  */

// // Get home feed
// export function getFeed(token) {
//   return request("/posts/feed", { method: "GET", token });
// }

// // Create a new post
// export function createPost(token, payload) {
//   return request("/posts", { method: "POST", token, body: payload });
// }

// // Get single post by id
// export function getPostById(token, postId) {
//   return request(`/posts/${postId}`, { method: "GET", token });
// }
// import { request } from "./http";

// // Get home feed
// export function getFeed() {
//   return request("/posts/feed", { method: "GET" });
// }

// // Create a new post
// export function createPost(payload) {
//   return request("/posts", { method: "POST", body: payload });
// }

// // Get single post by id
// export function getPostById(postId) {
//   return request(`/posts/${postId}`, { method: "GET" });
// }
// import { request } from "./http";

// // Get home feed
// export function getFeed() {
//   return request("/posts/feed", { method: "GET" });
// }

// // ✅ Create post (supports both backend keys)
// export function createPost(payload) {
//   const body = {
//     caption: payload.caption || "",
//     // send BOTH keys to be safe
//     mediaUrl: payload.mediaUrl || "",
//     media_url: payload.mediaUrl || "",
//   };

//   return request("/posts", { method: "POST", body });
// }

// // Get single post by id
// export function getPostById(postId) {
//   return request(`/posts/${postId}`, { method: "GET" });
// }
// import { request } from "./http";
// import { uploadMedia } from "./upload.api";

// export function getFeed(token) {
//   return request("/posts/feed", { method: "GET", token });
// }

// export function getPostById(token, postId) {
//   return request(`/posts/${postId}`, { method: "GET", token });
// }

// // Upload + create post
// export async function createPost(token, { caption, file }) {
//   // 1) upload
//   const up = await uploadMedia(token, file);

//   // 2) save post in DB
//   return request("/posts", {
//     method: "POST",
//     token,
//     body: {
//       caption: caption || "",
//       media_url: up.url,          // backend standard
//       media_type: up.media_type,  // image | video
//     },
//   });
// }


// // frontend/src/api/posts.api.js
// import { request } from "./http";

// // Upload media
// export async function uploadMedia(token, file) {
//     const fd = new FormData();
//     fd.append("file", file); // MUST be "file"
//     return request("/upload/media", { method: "POST", body: fd, token });
// }

// // Create post
// export async function createPost(token, { caption, file }) {
//     const uploaded = await uploadMedia(token, file); // { url, type } ABSOLUTE URL
//     return request("/posts", {
//         method: "POST",
//         token,
//         body: {
//             caption,
//             media_url: uploaded.url,
//             media_type: uploaded.type,
//         },
//     });
// }

// // Feed & single post
// export async function getFeed(token) {
//     return request("/posts/feed", { token });
// }

// export async function getPostById(token, id) {
//     return request(`/posts/${id}`, { token });
// }

// // Likes
// export async function likePost(token, postId) {
//     return request(`/posts/${postId}/like`, { method: "POST", token });
// }

// export async function unlikePost(token, postId) {
//     return request(`/posts/${postId}/unlike`, { method: "POST", token });
// }

// // Saves
// export async function savePost(token, postId) {
//     return request(`/posts/${postId}/save`, { method: "POST", token });
// }

// export async function unsavePost(token, postId) {
//     return request(`/posts/${postId}/unsave`, { method: "POST", token });
// }

// // Comments
// export async function getComments(token, postId) {
//     return request(`/posts/${postId}/comments`, { token });
// }

// export async function addComment(token, postId, text) {
//     return request(`/posts/${postId}/comments`, {
//         method: "POST",
//         token,
//         body: { text },
//     });
// }

// import { request } from "./http";

// // --- Upload ---
// export async function uploadMedia(token, file) {
//   const fd = new FormData();
//   fd.append("file", file); // ✅ key MUST be "file"
//   return request("/upload/media", { method: "POST", body: fd, token });
// }

// // --- Posts ---
// export async function createPost(token, { caption, file }) {
//   const uploaded = await uploadMedia(token, file); // { url, type }
//   return request("/posts", {
//     method: "POST",
//     token,
//     body: {
//       caption,
//       media_url: uploaded.url,
//       media_type: uploaded.type,
//     },
//   });
// }

// export async function getFeed(token) {
//   return request("/posts/feed", { method: "GET", token });
// }

// export async function getPostById(token, id) {
//   return request(`/posts/${id}`, { method: "GET", token });
// }

// // --- Likes ---
// export async function likePost(token, id) {
//   return request(`/posts/${id}/like`, { method: "POST", token });
// }

// export async function unlikePost(token, id) {
//   return request(`/posts/${id}/unlike`, { method: "POST", token });
// }

// // --- Saves ---
// export async function savePost(token, id) {
//   return request(`/posts/${id}/save`, { method: "POST", token });
// }

// export async function unsavePost(token, id) {
//   return request(`/posts/${id}/unsave`, { method: "POST", token });
// }

// // --- Comments ---
// export async function getComments(token, postId) {
//   return request(`/posts/${postId}/comments`, { method: "GET", token });
// }

// export async function addComment(token, postId, text) {
//   return request(`/posts/${postId}/comments`, {
//     method: "POST",
//     token,
//     body: { text },
//   });
// }

// export async function deletePost(token, id) {
//   return request(`/posts/${id}`, { method: "DELETE", token });
// }

import { request } from "./http";

/**
 * Orbix Posts API
 * Works with backend routes:
 * - POST   /api/upload/media
 * - POST   /api/posts
 * - GET    /api/posts/feed
 * - GET    /api/posts/:id
 * - DELETE /api/posts/:id
 * - POST   /api/posts/:id/like
 * - POST   /api/posts/:id/unlike
 * - POST   /api/posts/:id/save
 * - POST   /api/posts/:id/unsave
 * - GET    /api/posts/:id/comments
 * - POST   /api/posts/:id/comments
 */

// -------------------- Upload --------------------
export async function uploadMedia(token, file) {
  const fd = new FormData();
  fd.append("file", file); // ✅ key MUST be "file"

  // IMPORTANT:
  // request() must NOT force JSON headers when body is FormData.
  return request("/upload/media", { method: "POST", body: fd, token });
}

// -------------------- Posts --------------------
export async function createPost(token, { caption, file }) {
  // 1) upload media to get url + type
  const uploaded = await uploadMedia(token, file); // { url, type }

  // 2) create post with url
  return request("/posts", {
    method: "POST",
    token,
    body: {
      caption: caption || "",
      media_url: uploaded.url,
      media_type: uploaded.type, // "image" | "video"
    },
  });
}

export async function getFeed(token) {
  return request("/posts/feed", { method: "GET", token });
}

export async function getPostById(token, id) {
  return request(`/posts/${id}`, { method: "GET", token });
}

export async function deletePost(token, id) {
  return request(`/posts/${id}`, { method: "DELETE", token });
}

// -------------------- Likes --------------------
export async function likePost(token, id) {
  return request(`/posts/${id}/like`, { method: "POST", token });
}

export async function unlikePost(token, id) {
  return request(`/posts/${id}/unlike`, { method: "POST", token });
}

// -------------------- Saves --------------------
export async function savePost(token, id) {
  return request(`/posts/${id}/save`, { method: "POST", token });
}

export async function unsavePost(token, id) {
  return request(`/posts/${id}/unsave`, { method: "POST", token });
}

// -------------------- Comments --------------------
export async function getComments(token, postId) {
  return request(`/posts/${postId}/comments`, { method: "GET", token });
}

export async function addComment(token, postId, text) {
  return request(`/posts/${postId}/comments`, {
    method: "POST",
    token,
    body: { text },
  });
}

export async function explorePosts(token, q = "") {
  const qs = q ? `?q=${encodeURIComponent(q)}` : "";
  return request(`/posts/explore${qs}`, { method: "GET", token });
}