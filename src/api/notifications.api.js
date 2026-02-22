import { request } from "./http";

export function getNotifications(token) {
  return request("/notifications", {
    method: "GET",
    token,
  });
}

export function markAllRead(token) {
  return request("/notifications/read-all", {
    method: "POST",
    token,
  });
}