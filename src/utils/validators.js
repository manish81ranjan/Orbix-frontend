/**
 * validators
 * - Common validation helpers
 */

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function minLength(value, len) {
  return typeof value === "string" && value.trim().length >= len;
}

export function isUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}
