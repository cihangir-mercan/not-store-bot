import { useRef, useState, type CSSProperties, type JSX } from "react"
import styles from "./styles/index.module.scss"
import { useGetHistoryQuery } from "@app/slices/historyApiSlice"
import { useGetItemsQuery } from "@app/slices/itemsApiSlice"
import dayjs from "dayjs"
import { FixedSizeList as List, type ListOnScrollProps } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import ScrollUp from "@icons/scrollUp.svg?react"

type UserPageProps = {
  isActiveTab: boolean
}

export const UserPage = ({ isActiveTab }: UserPageProps): JSX.Element => {
  const { data: historyData, isLoading: isHistoryLoading } =
    useGetHistoryQuery(null)
  const { data: itemsData, isLoading: isItemsLoading } = useGetItemsQuery(null)

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

  const Row = ({
    index,
    style,
  }: {
    index: number
    style: CSSProperties
  }): JSX.Element | null => {
    const purchase = history[index]
    const item = itemMap.get(purchase.id)

    if (!item) return null

    return (
      <div
        className={styles.item}
        key={[purchase.id, purchase.timestamp, index].join("-")}
        style={style}
      >
        {isActiveTab ? (
          <img
            src={item.images[0]}
            alt={item.name}
            className={styles.itemImage}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholderImage} />
        )}
        <div className={styles.itemDetails}>
          <div className={styles.category}>{item.category}</div>
          <div className={styles.name}>{item.name}</div>
        </div>
        <div className={styles.itemMeta}>
          <div className={styles.date}>
            {dayjs(purchase.timestamp * 1000).format("DD MMM ’YY")}
          </div>
          <div className={styles.price}>
            {purchase.total} {purchase.currency}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.userPage}>
      <h2 className={styles.title}>History</h2>

      <div className={styles.listContainer}>
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <List
              ref={listRef}
              height={height}
              width={width}
              itemCount={history.length}
              itemSize={72}
              onScroll={handleScroll}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>

      {showScrollToTop && (
        <button
          className={styles.scrollToTop}
          onClick={() => listRef.current?.scrollToItem(0, "start")}
        >
          <ScrollUp />
        </button>
      )}
    </div>
  )
}
