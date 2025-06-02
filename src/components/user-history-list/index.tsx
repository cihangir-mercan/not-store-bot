import type { CSSProperties, JSX, RefObject } from "react"
import type { ListOnScrollProps } from "react-window"
import { FixedSizeList as List } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import styles from "./styles/index.module.scss"
import dayjs from "dayjs"
import type { ProductItem } from "@app/slices/itemsApiSlice"
import type { HistoryItem } from "@app/slices/historyApiSlice"

type Props = {
  history: HistoryItem[]
  itemMap: Map<number, ProductItem>
  onScroll: (props: ListOnScrollProps) => void
  listRef: RefObject<List | null>
  loading?: boolean
}

export const UserHistoryList = ({
                                  history,
                                  itemMap,
                                  onScroll,
                                  listRef,
                                  loading = false,
                                }: Props): JSX.Element => {
  const Row = ({
                 index,
                 style,
               }: {
    index: number
    style: CSSProperties
  }): React.JSX.Element | null => {
    if (loading) {
      return (
        <div className={styles.skeletonRow} style={style}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonTextBlock}>
            <div className={styles.skeletonCategory} />
            <div className={styles.skeletonName} />
          </div>
          <div className={styles.skeletonMeta}>
            <div className={styles.skeletonDate} />
            <div className={styles.skeletonPrice} />
          </div>
        </div>
      )
    }

    const purchase = history[index]
    const item = itemMap.get(purchase.id)
    if (!item) return <></>

    return (
      <div
        className={styles.item}
        key={[purchase.id, purchase.timestamp, index].join("-")}
        style={style}
      >
        <img
          src={item.images[0]}
          alt={item.name}
          className={styles.itemImage}
          loading="lazy"
        />
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
    <AutoSizer>
      {({ height, width }: { height: number; width: number }) => (
        <List
          ref={listRef}
          height={height}
          width={width}
          itemCount={loading ? 10 : history.length}
          itemSize={72}
          onScroll={onScroll}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  )
}
