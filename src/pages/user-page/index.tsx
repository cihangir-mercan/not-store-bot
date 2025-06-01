import { useRef, type JSX, useState } from "react"
import { useGetHistoryQuery } from "@app/slices/historyApiSlice"
import { useGetItemsQuery } from "@app/slices/itemsApiSlice"
import { UserHistoryList } from "@components/user-history-list"
import { useScrollRestoreForList } from "./hooks/useScrollRestoreForList.tsx"
import styles from "./styles/index.module.scss"
import {
  BOTTOM_TABBAR_HEIGHT,
  SCROLL_TO_TOP_MARGIN,
} from "@components/layout-with-bottom-tabs/constants"
import ScrollUp from "@icons/scrollUp.svg?react"
import type { FixedSizeList as List } from "react-window"

type UserPageProps = {
  isActiveTab: boolean
}

export const UserPage = ({ isActiveTab }: UserPageProps): JSX.Element => {
  const { data: historyData, isLoading: isHistoryLoading } =
    useGetHistoryQuery(null)
  const { data: itemsData, isLoading: isItemsLoading } = useGetItemsQuery(null)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const listRef = useRef<List>(null)
  const history = [...(historyData?.data ?? [])]
  const items = itemsData?.data ?? []
  const itemMap = new Map(items.map(item => [item.id, item]))
  const tgWebApp = window.Telegram.WebApp
  const bottomInset = tgWebApp.safeAreaInset.bottom
  const offset = BOTTOM_TABBAR_HEIGHT + bottomInset + SCROLL_TO_TOP_MARGIN

  // Hook returns onScroll handler bound to react-window list and scroll storage
  const onScroll = useScrollRestoreForList(
    "user-history",
    isActiveTab,
    listRef,
    setShowScrollToTop,
  )

  if (isHistoryLoading || isItemsLoading) return <div>Loading…</div>

  return (
    <div className={styles.userPage}>
      <h2 className={styles.title}>History</h2>

      <div className={styles.listContainer}>
        <UserHistoryList
          history={history}
          itemMap={itemMap}
          isActiveTab={isActiveTab}
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
