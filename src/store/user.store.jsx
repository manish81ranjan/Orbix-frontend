/**
 * user.store.js
 * - Simple user utilities/state placeholder
 * - Later you can convert to Zustand/Redux/Context if needed
 */

export const userStore = {
  profileCache: new Map()
};

export function cacheUserProfile(username, data) {
  userStore.profileCache.set(username, data);
}

export function getCachedUserProfile(username) {
  return userStore.profileCache.get(username) || null;
}
