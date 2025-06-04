import { useRef, type JSX, useState } from "react"
import {
  type HistoryItem,
  useGetHistoryQuery,
} from "@app/slices/historyApiSlice"
import { useGetItemsQuery } from "@app/slices/itemsApiSlice"
import { UserHistoryList } from "@components/user-history-list"
import { useScrollRestoreForList } from "./hooks/useScrollRestoreForList.tsx"
import styles from "./index.module.scss"
import {
  BOTTOM_TABBAR_HEIGHT,
  SCROLL_TO_TOP_MARGIN,
} from "@components/layout-with-bottom-tabs/constants"
import ScrollUp from "@icons/scrollUp.svg?react"
import type { VariableSizeList as List } from "react-window"

export type VirtualHistoryItem =
  | { type: "header" }
  | (HistoryItem & { type?: undefined })

export const UserPage = (): JSX.Element => {
  const {
    data: historyData,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
  } = useGetHistoryQuery(null)
  useGetHistoryQuery(null)
  const {
    data: itemsData,
    isLoading: isItemsLoading,
    isError: isItemsError,
  } = useGetItemsQuery(null)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const listRef = useRef<List>(null)
  const history = [...(historyData?.data ?? [])]
  const virtualizedHistory: VirtualHistoryItem[] = [
    { type: "header" },
    ...history,
  ]
  const items = itemsData?.data ?? []
  const itemMap = new Map(items.map(item => [item.id, item]))
  const tgWebApp = window.Telegram.WebApp
  const bottomInset = tgWebApp.safeAreaInset.bottom
  const offset = BOTTOM_TABBAR_HEIGHT + bottomInset + SCROLL_TO_TOP_MARGIN
  const isLoading = isHistoryLoading || isItemsLoading
  const isError = isHistoryError || isItemsError
  const onScroll = useScrollRestoreForList(listRef, setShowScrollToTop)

  return (
    <div className={styles.userPage}>
      <div className={styles.listContainer}>
        <UserHistoryList
          history={virtualizedHistory}
          itemMap={itemMap}
          onScroll={onScroll}
          listRef={listRef}
          isLoading={isLoading}
          isError={isError}
        />
      </div>

      {showScrollToTop && (
        <button
          className={styles.scrollToTop}
          style={{ bottom: offset }}
          onClick={() => listRef.current?.scrollToItem(0, "start")}
        >
          <ScrollUp />
        </button>
      )}
    </div>
  )
}
