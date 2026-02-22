import { useEffect } from "react";

/**
 * useThreeResize
 * - Utility hook for custom resize callbacks
 * - Useful when you want to update uniforms or layout on resize
 */
export default function useThreeResize(onResize) {
  useEffect(() => {
    const handler = () => {
      onResize?.({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [onResize]);
}
