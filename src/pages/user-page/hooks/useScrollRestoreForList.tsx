import type React from "react"
import { useEffect } from "react"
import { useLocation } from "react-router"
import type { ListOnScrollProps } from "react-window"
import type { VariableSizeList as List } from "react-window"
const scrollPositions = new Map<string, number>()

export function useScrollRestoreForList(
  listRef: React.RefObject<List | null>,
  setShowScrollToTop: (visible: boolean) => void,
) {
  const location = useLocation()
  const key = location.pathname // e.g. "/user"

  // Restore scroll when this component mounts (i.e. tab is active).
  useEffect(() => {
    const savedOffset = scrollPositions.get(key) ?? 0
    const list = listRef.current
    if (list) {
      list.scrollTo(savedOffset)
      setShowScrollToTop(savedOffset > 300)
    }
  }, [key, listRef, setShowScrollToTop])

  // Return an onScroll handler for react-window
  return ({ scrollOffset }: ListOnScrollProps) => {
    const list = listRef.current
    if (!list) return

    scrollPositions.set(key, scrollOffset)
    setShowScrollToTop(scrollOffset > 300)
  }
}
