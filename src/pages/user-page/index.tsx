import { type JSX, useRef, useState } from "react"
import styles from "./styles/index.module.scss"
import { useGetHistoryQuery } from "@app/slices/historyApiSlice"
import { useGetItemsQuery } from "@app/slices/itemsApiSlice"
import type { FixedSizeList as List } from "react-window"
import { type ListOnScrollProps } from "react-window"
import ScrollUp from "@icons/scrollUp.svg?react"
import {
  BOTTOM_TABBAR_HEIGHT,
  SCROLL_TO_TOP_MARGIN,
} from "@components/layout-with-bottom-tabs/constants"
import { UserHistoryList } from "@components/user-history-list"

type UserPageProps = {
  isActiveTab: boolean
}

export const UserPage = ({ isActiveTab }: UserPageProps): JSX.Element => {
  const { data: historyData, isLoading: isHistoryLoading } =
    useGetHistoryQuery(null)
  const { data: itemsData, isLoading: isItemsLoading } = useGetItemsQuery(null)
  const tgWebApp = window.Telegram.WebApp
  const bottomInset = tgWebApp.safeAreaInset.bottom
  const offset = BOTTOM_TABBAR_HEIGHT + bottomInset + SCROLL_TO_TOP_MARGIN

  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const listRef = useRef<List>(null)

  if (isHistoryLoading || isItemsLoading)
    return <div className={styles.status}>Loading…</div>

  const history = [...(historyData?.data ?? [])]
  const items = itemsData?.data ?? []

  const itemMap = new Map(items.map(item => [item.id, item]))

  const handleScroll = ({ scrollOffset }: ListOnScrollProps) => {
    setShowScrollToTop(scrollOffset > 300)
  }

  return (
    <div className={styles.userPage}>
      <h2 className={styles.title}>History</h2>

      <div className={styles.listContainer}>
        <UserHistoryList
          history={history}
          itemMap={itemMap}
          isActiveTab={isActiveTab}
          onScroll={handleScroll}
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
