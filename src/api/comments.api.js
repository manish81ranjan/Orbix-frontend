import { request } from "./http";

export async function listComments(token, postId) {
  return request(`/posts/${postId}/comments`, { method: "GET", token });
}

export async function addComment(token, postId, text) {
  return request(`/posts/${postId}/comments`, {
    method: "POST",
    token,
    body: { text },
  });
}