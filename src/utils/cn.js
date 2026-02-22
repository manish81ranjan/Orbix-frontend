/**
 * cn
 * - Utility to join class names conditionally
 * - Similar to clsx / classnames (lightweight)
 */
export function cn(...args) {
  return args
    .flat()
    .filter(Boolean)
    .join(" ");
}
