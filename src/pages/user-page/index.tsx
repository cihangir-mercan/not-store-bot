import { useRef, type JSX, useState } from "react"
import { type HistoryItem, useGetHistoryQuery } from "@app/slices/historyApiSlice"
import { useGetItemsQuery } from "@app/slices/itemsApiSlice"
import { UserHistoryList } from "@components/user-history-list"
import { useScrollRestoreForList } from "./hooks/useScrollRestoreForList.tsx"
import styles from "./styles/index.module.scss"
import {
  BOTTOM_TABBAR_HEIGHT,
  SCROLL_TO_TOP_MARGIN,
} from "@components/layout-with-bottom-tabs/constants"
import ScrollUp from "@icons/scrollUp.svg?react"
import type { VariableSizeList as List } from "react-window"
import Shimmer from "@icons/shimmer.svg?react"
import { useTranslation } from "react-i18next"

export type VirtualHistoryItem =
  | { type: "header" }
  | (HistoryItem & { type?: undefined })

export const UserPage = (): JSX.Element => {
  const { t } = useTranslation()
  const { data: historyData, isLoading: isHistoryLoading, isError: isHistoryError } = useGetHistoryQuery(null)
    useGetHistoryQuery(null)
  const { data: itemsData, isLoading: isItemsLoading, isError: isItemsError } = useGetItemsQuery(null)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const listRef = useRef<List>(null)
  const history = [...(historyData?.data ?? [])]
  const virtualizedHistory: VirtualHistoryItem[] = [{ type: "header" }, ...history]
  const items = itemsData?.data ?? []
  const itemMap = new Map(items.map(item => [item.id, item]))
  const tgWebApp = window.Telegram.WebApp
  const bottomInset = tgWebApp.safeAreaInset.bottom
  const offset = BOTTOM_TABBAR_HEIGHT + bottomInset + SCROLL_TO_TOP_MARGIN

  // Hook returns onScroll handler bound to react-window list and scroll storage
  const onScroll = useScrollRestoreForList(listRef, setShowScrollToTop)

  if (isHistoryLoading || isItemsLoading)
    return (
      <div className={styles.status}>
        <Shimmer />
      </div>
    )

  if (isHistoryError || isItemsError)
    return (
      <div className={styles.status}>
        <div className={styles.status}>{t("storePage.error")}</div>
      </div>
    )

  return (
    <div className={styles.userPage}>
      <div className={styles.listContainer}>
        <UserHistoryList
          history={virtualizedHistory}
          itemMap={itemMap}
          onScroll={onScroll}
          listRef={listRef}
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
