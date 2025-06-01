import type { RefObject } from "react"
import { useEffect } from "react"
import type { ListOnScrollProps } from "react-window"
import type { FixedSizeList as List } from "react-window"

const scrollPositions = new Map<string, number>()

export function useScrollRestoreForList(
  key: string,
  isActive: boolean,
  listRef: RefObject<List | null>,
  setShowScrollToTop: (visible: boolean) => void,
) {
  // Restore scroll when tab becomes active
  useEffect(() => {
    if (!isActive) return

    const savedOffset = scrollPositions.get(key) ?? 0
    if (listRef.current) {
      listRef.current.scrollTo(savedOffset)
      setShowScrollToTop(savedOffset > 300)
    }
  }, [key, isActive, listRef, setShowScrollToTop])

  // Save scroll position on react-window onScroll
  return ({ scrollOffset }: ListOnScrollProps) => {
    if (!isActive) return

    scrollPositions.set(key, scrollOffset)
    setShowScrollToTop(scrollOffset > 300)
  }
}
