import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router";
import type { RefObject } from "react";

const scrollPositions = new Map<string, number>();

export function useScrollRestoration(scrollRef: RefObject<HTMLElement | null>) {
  const location = useLocation();
  const navType = useNavigationType();
  const prevKey = useRef<string | null>(null);

  // Save scroll on scroll
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const key = location.key || location.pathname;

    const handleScroll = () => {
      scrollPositions.set(key, scrollEl.scrollTop);
    };

    scrollEl.addEventListener("scroll", handleScroll);
    return () => { scrollEl.removeEventListener("scroll", handleScroll); };
  }, [location, scrollRef]);

  // Restore scroll after navigation
  useEffect(() => {
    const currentKey = location.key || location.pathname;
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    requestAnimationFrame(() => {
      const saved = scrollPositions.get(currentKey) ?? 0;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      if (navType === "POP") {
        scrollEl.scrollTop = saved;
      } else {
        scrollEl.scrollTop = 0;
      }

      prevKey.current = currentKey;
    });
  }, [location, navType, scrollRef]);
}
