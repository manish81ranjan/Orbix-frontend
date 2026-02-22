/**
 * feed.store.js
 * - Lightweight feed state holder
 * - Useful for pagination & caching later
 */

export const feedStore = {
  posts: [],
  page: 1,
  hasMore: true
};

export function setFeed(posts) {
  feedStore.posts = posts;
}

export function appendFeed(posts) {
  feedStore.posts = [...feedStore.posts, ...posts];
}

export function resetFeed() {
  feedStore.posts = [];
  feedStore.page = 1;
  feedStore.hasMore = true;
}
