import { useEffect } from "react"

const scrollPositions = new Map<string, number>()

export function useScrollRestoreForStore(
  id: string,
  isActive: boolean,
  key: string,
) {
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
    return () => {
      el.removeEventListener("scroll", onScroll)
    }
  }, [id, key])
}
