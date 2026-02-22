// import { request } from "./http";

// export function getMe(token) {
//   return request("/users/me", { method: "GET", token });
// }

// export function getUserProfile(token, username) {
//   return request(`/users/${encodeURIComponent(username)}`, { method: "GET", token });
// }

// export function getUserPosts(token, username) {
//   return request(`/users/${encodeURIComponent(username)}/posts`, { method: "GET", token });
// }

// export function getSuggestions(token, limit = 6) {
//   return request(`/users/suggestions?limit=${limit}`, { method: "GET", token });
// }

// export function followUser(token, username) {
//   return request(`/follows/${encodeURIComponent(username)}`, { method: "POST", token });
// }

// export function unfollowUser(token, username) {
//   return request(`/follows/${encodeURIComponent(username)}/unfollow`, { method: "POST", token });
// }
// import { request } from "./http";

// // -------------------- ME --------------------
// export function getMe(token) {
//   return request("/users/me", { method: "GET", token });
// }

// export function updateMe(token, payload) {
//   // payload: { name?, bio?, website?, avatar_url? }
//   return request("/users/me", { method: "PATCH", token, body: payload });
// }

// export function changePassword(token, currentPassword, newPassword) {
//   return request("/users/change-password", {
//     method: "POST",
//     token,
//     body: { currentPassword, newPassword },
//   });
// }

// // -------------------- PROFILE --------------------
// export function getUserProfile(token, username) {
//   return request(`/users/${encodeURIComponent(username)}`, { method: "GET", token });
// }

// export function getUserPosts(token, username) {
//   return request(`/users/${encodeURIComponent(username)}/posts`, { method: "GET", token });
// }

// // -------------------- FOLLOWERS / FOLLOWING LISTS --------------------
// export function getFollowers(token, username, { limit = 20, skip = 0 } = {}) {
//   return request(
//     `/users/${encodeURIComponent(username)}/followers?limit=${limit}&skip=${skip}`,
//     { method: "GET", token }
//   );
// }

// export function getFollowing(token, username, { limit = 20, skip = 0 } = {}) {
//   return request(
//     `/users/${encodeURIComponent(username)}/following?limit=${limit}&skip=${skip}`,
//     { method: "GET", token }
//   );
// }

// // -------------------- SUGGESTIONS --------------------
// export function getSuggestions(token, limit = 6) {
//   return request(`/users/suggestions?limit=${limit}`, { method: "GET", token });
// }

// // -------------------- FOLLOW / UNFOLLOW --------------------
// // NOTE: These match your current backend follow routes:
// // POST /api/follows/:username
// // POST /api/follows/:username/unfollow
// export function followUser(token, username) {
//   return request(`/follows/${encodeURIComponent(username)}`, { method: "POST", token });
// }

// export function unfollowUser(token, username) {
//   return request(`/follows/${encodeURIComponent(username)}/unfollow`, { method: "POST", token });
// }

// // -------------------- BLOCK SYSTEM --------------------
// export function getBlocked(token) {
//   return request(`/users/blocked`, { method: "GET", token });
// }

// export function blockUser(token, username) {
//   return request(`/users/block`, { method: "POST", token, body: { username } });
// }

// export function unblockUser(token, username) {
//   return request(`/users/unblock`, { method: "POST", token, body: { username } });
// }

// import { request } from "./http";

// export function getMe(token) {
//   return request("/users/me", { method: "GET", token });
// }

// export function getUserProfile(token, username) {
//   return request(`/users/${encodeURIComponent(username)}`, { method: "GET", token });
// }

// export function getUserPosts(token, username) {
//   return request(`/users/${encodeURIComponent(username)}/posts`, { method: "GET", token });
// }

// export function getSuggestions(token, limit = 6) {
//   return request(`/users/suggestions?limit=${limit}`, { method: "GET", token });
// }

// export function getFollowers(token, username) {
//   return request(`/users/${encodeURIComponent(username)}/followers`, { method: "GET", token });
// }

// export function getFollowing(token, username) {
//   return request(`/users/${encodeURIComponent(username)}/following`, { method: "GET", token });
// }

// export function followUser(token, username) {
//   return request(`/follows/${encodeURIComponent(username)}`, { method: "POST", token });
// }

// export function unfollowUser(token, username) {
//   return request(`/follows/${encodeURIComponent(username)}/unfollow`, { method: "POST", token });
// }

// import { request } from "./http";

// export function getMe(token) {
//   return request("/users/me", { method: "GET", token });
// }

// export function getUserProfile(token, username) {
//   return request(`/users/${encodeURIComponent(username)}`, { method: "GET", token });
// }

// export function getUserPosts(token, username) {
//   return request(`/users/${encodeURIComponent(username)}/posts`, { method: "GET", token });
// }

// export function getSuggestions(token, limit = 6) {
//   return request(`/users/suggestions?limit=${limit}`, { method: "GET", token });
// }

// export function getFollowers(token, username, { limit = 50, skip = 0 } = {}) {
//   return request(
//     `/users/${encodeURIComponent(username)}/followers?limit=${limit}&skip=${skip}`,
//     { method: "GET", token }
//   );
// }

// export function getFollowing(token, username, { limit = 50, skip = 0 } = {}) {
//   return request(
//     `/users/${encodeURIComponent(username)}/following?limit=${limit}&skip=${skip}`,
//     { method: "GET", token }
//   );
// }

// export function followUser(token, username) {
//   return request(`/follows/${encodeURIComponent(username)}`, { method: "POST", token });
// }

// export function unfollowUser(token, username) {
//   return request(`/follows/${encodeURIComponent(username)}/unfollow`, { method: "POST", token });
// }

// src/api/users.api.js
import { request } from "./http";

// ---------------- USER ----------------

export function getMe(token) {
  return request("/users/me", { method: "GET", token });
}

export function getUserProfile(token, username) {
  return request(`/users/${encodeURIComponent(username)}`, {
    method: "GET",
    token,
  });
}

export function getUserPosts(token, username) {
  return request(`/users/${encodeURIComponent(username)}/posts`, {
    method: "GET",
    token,
  });
}

export function getSuggestions(token, limit = 6) {
  return request(`/users/suggestions?limit=${limit}`, {
    method: "GET",
    token,
  });
}

// ---------------- FOLLOW ----------------

export function getFollowers(token, username, { limit = 20, skip = 0 } = {}) {
  return request(
    `/users/${encodeURIComponent(username)}/followers?limit=${limit}&skip=${skip}`,
    { method: "GET", token }
  );
}

export function getFollowing(token, username, { limit = 20, skip = 0 } = {}) {
  return request(
    `/users/${encodeURIComponent(username)}/following?limit=${limit}&skip=${skip}`,
    { method: "GET", token }
  );
}

export function followUser(token, username) {
  return request(`/follows/${encodeURIComponent(username)}`, {
    method: "POST",
    token,
  });
}

export function unfollowUser(token, username) {
  return request(`/follows/${encodeURIComponent(username)}/unfollow`, {
    method: "POST",
    token,
  });
}

// =====================================================
// ✅ ADD THESE (Required for Settings page)
// =====================================================

// Update current user profile
export function updateMe(token, payload) {
  return request("/users/me", {
    method: "PATCH",
    token,
    body: payload,
  });
}

// Change password
export function changePassword(token, payload) {
  return request("/users/change-password", {
    method: "POST",
    token,
    body: payload,
  });
}

// Get blocked users
export function getBlockedUsers(token) {
  return request("/users/blocked", {
    method: "GET",
    token,
  });
}

// Unblock user
export function unblockUser(token, username) {
  return request(`/users/unblock/${encodeURIComponent(username)}`, {
    method: "POST",
    token,
  });
}