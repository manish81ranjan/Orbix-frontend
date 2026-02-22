import { useEffect } from "react";

/**
 * useInfiniteScroll
 * - Triggers callback when user reaches bottom
 * - Used for feed / explore pagination
 */
export default function useInfiniteScroll(callback, offset = 300) {
  useEffect(() => {
    const onScroll = () => {
      const scrollPosition =
        window.innerHeight + window.scrollY;

      const threshold =
        document.body.offsetHeight - offset;

      if (scrollPosition >= threshold) {
        callback?.();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [callback, offset]);
}
