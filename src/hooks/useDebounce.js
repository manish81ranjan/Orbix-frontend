import { useEffect, useState } from "react";

/**
 * useDebounce
 * - Delays value updates
 * - Perfect for search inputs & API calls
 */
export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}
