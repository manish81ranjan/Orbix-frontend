import { request } from "./http";

/**
 * Follows APIs
 * Backend base path: /api/follows
 */

// Follow a user
export function followUser(token, userId) {
  return request(`/follows/${userId}`, {
    method: "POST",
    token
  });
}

// Unfollow a user
export function unfollowUser(token, userId) {
  return request(`/follows/${userId}`, {
    method: "DELETE",
    token
  });
}
