import { useEffect } from "react"

const scrollPositions = new Map<string, number>()

/**
 * Preserves scroll for tab-based layouts where elements are always mounted.
 *
 * @param id - DOM id of scrollable container (e.g., "store-scroll")
 * @param isActive - Whether the tab is currently active
 * @param key - Unique key to track scroll (e.g., location.pathname)
 */
export function useScrollRestoreOnActive(id: string, isActive: boolean, key: string) {
  // Restore scroll when it becomes active
  useEffect(() => {
    const el = document.getElementById(id)
    if (!el || !isActive) return

    requestAnimationFrame(() => {
      const saved = scrollPositions.get(key) ?? 0
      el.scrollTo(0, saved)
    })
  }, [id, isActive, key])

  // Save scroll on scroll
  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return

    const onScroll = () => {
      scrollPositions.set(key, el.scrollTop)
    }

    el.addEventListener("scroll", onScroll)
    return () => el.removeEventListener("scroll", onScroll)
  }, [id, key])
}
