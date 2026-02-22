// import { request } from "./http";

// /**
//  * Auth APIs
//  * Backend base path: /api
//  */

// export function loginApi(payload) {
//   return request("/auth/login", { method: "POST", body: payload });
// }

// export function registerApi(payload) {
//   return request("/auth/register", { method: "POST", body: payload });
// }

// export function meApi(token) {
//   return request("/auth/me", { method: "GET", token });
// }
// import { request } from "./http";

// export function loginApi(payload) {
//   return request("/auth/login", { method: "POST", body: payload });
// }

// export function registerApi(payload) {
//   return request("/auth/register", { method: "POST", body: payload });
// }

// export function meApi() {
//   return request("/auth/me", { method: "GET" });
// }
// src/api/auth.api.js
import { request } from "./http";

export const loginApi = (payload) => request("/auth/login", { method: "POST", body: payload });

export const registerApi = (payload) =>
  request("/auth/register", { method: "POST", body: payload });

export const meApi = () => request("/auth/me"); // ✅ no token argument needed