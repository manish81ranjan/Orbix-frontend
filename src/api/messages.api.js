import http from "./http";

/**
 * Messages API
 * Assumes JWT token auth via Authorization: Bearer <token>
 *
 * Expected backend endpoints (recommended):
 *  GET    /api/messages/conversations?limit=3
 *  GET    /api/messages/conversations/:id/messages?cursor=&limit=30
 *  POST   /api/messages/conversations/:id/messages   { text }
 *  POST   /api/messages/conversations/:id/read
 *  POST   /api/messages/conversations               { username }  // optional: start chat
 *
 * If your backend uses different routes, tell me the exact routes and I’ll adjust.
 */

function authHeaders(token) {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
}

export async function getConversations(token, limit = 20) {
  const res = await http.get(`/messages/conversations?limit=${limit}`, authHeaders(token));
  return res.data;
}

export async function getConversationMessages(token, conversationId, { cursor = "", limit = 30 } = {}) {
  const qs = new URLSearchParams();
  if (cursor) qs.set("cursor", cursor);
  if (limit) qs.set("limit", String(limit));

  const res = await http.get(
    `/messages/conversations/${conversationId}/messages?${qs.toString()}`,
    authHeaders(token)
  );
  return res.data;
}

export async function sendMessage(token, conversationId, text) {
  const res = await http.post(
    `/messages/conversations/${conversationId}/messages`,
    { text },
    authHeaders(token)
  );
  return res.data;
}

export async function markConversationRead(token, conversationId) {
  const res = await http.post(
    `/messages/conversations/${conversationId}/read`,
    {},
    authHeaders(token)
  );
  return res.data;
}

/**
 * Optional: Start a new conversation by username
 * Backend should create or return existing conversation.
 */
export async function startConversation(token, username) {
  const res = await http.post(
    `/messages/conversations`,
    { username },
    authHeaders(token)
  );
  return res.data;
}