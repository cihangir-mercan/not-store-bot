import { useEffect } from "react"
import { useLocation } from "react-router"

const scrollPositions = new Map<string, number>()

export function useScrollRestoreForStore(id: string) {
  const location = useLocation()
  const key = location.pathname

  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return

    requestAnimationFrame(() => {
      const saved = scrollPositions.get(key) ?? 0
      el.scrollTo(0, saved)
    })
  }, [id, key])

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
