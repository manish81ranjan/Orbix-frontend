/**
 * post.store.js
 * - Post-level helpers & cache
 * - Keeps things simple and framework-agnostic
 */

export const postStore = {
  byId: new Map()
};

export function cachePost(post) {
  if (!post || !post._id) return;
  postStore.byId.set(post._id, post);
}

export function getCachedPost(id) {
  return postStore.byId.get(id) || null;
}

export function clearPostCache() {
  postStore.byId.clear();
}
