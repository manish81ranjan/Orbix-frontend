/**
 * ui.store.js
 * - UI state helpers (modals, toasts, loaders)
 * - Placeholder store
 */

export const uiStore = {
  modalOpen: false,
  toast: null
};

export function openModal() {
  uiStore.modalOpen = true;
}

export function closeModal() {
  uiStore.modalOpen = false;
}

export function showToast(toast) {
  uiStore.toast = toast;
}

export function clearToast() {
  uiStore.toast = null;
}
