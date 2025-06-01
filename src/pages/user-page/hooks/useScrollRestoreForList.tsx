import type { RefObject } from "react"
import { useEffect } from "react"
import type { ListOnScrollProps } from "react-window"

const scrollPositions = new Map<string, number>()

export function useScrollRestoreForList(
  key: string,
  isActive: boolean,
  listRef: RefObject<{ scrollTo: (offset: number) => void } | null>,
) {
  // Restore scroll when tab becomes active
  useEffect(() => {
    if (!isActive) return

    const savedOffset = scrollPositions.get(key) ?? 0
    if (listRef.current) {
      listRef.current.scrollTo(savedOffset)
    }
  }, [key, isActive, listRef])

  // Save scroll position on react-window onScroll
  return (props: ListOnScrollProps) => {
    if (!isActive) return

    scrollPositions.set(key, props.scrollOffset)
  }
}
