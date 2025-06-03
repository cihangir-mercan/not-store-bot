import type { CSSProperties, JSX, RefObject } from "react"
import type { ListOnScrollProps } from "react-window"
import { VariableSizeList as List } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import styles from "./styles/index.module.scss"
import dayjs from "dayjs"
import type { ProductItem } from "@app/slices/itemsApiSlice"
import type { VirtualHistoryItem } from "@pages/user-page"
import { useTranslation } from "react-i18next"
import Shimmer from "@icons/shimmer.svg?react"

type Props = {
  history: VirtualHistoryItem[]
  itemMap: Map<number, ProductItem>
  onScroll: (props: ListOnScrollProps) => void
  listRef: RefObject<List | null>
  isLoading: boolean
  isError: boolean
}

export const UserHistoryList = ({
                                  history,
                                  itemMap,
                                  onScroll,
                                  listRef,
  isLoading, isError
                                }: Props): JSX.Element => {
  const { t } = useTranslation()
  const tgWebApp = window.Telegram.WebApp
  const user = tgWebApp.initDataUnsafe.user
  const userPp = user?.photo_url
  const firstName = user?.first_name

  const renderHeader = () => {
    return <div className={styles.listHeader}>
      <div className={styles.centered}>
        <img
          src={userPp}
          alt={firstName}
          className={styles.headerImage}
          loading="lazy"
        />
        <span className={styles.name}>{firstName ?? "User"}</span>
      </div>
      <h2 className={styles.title}>History</h2>
    </div>
  }

  if (isLoading)
    return (
      <>
        {renderHeader()}
        <div className={styles.status}>
          <Shimmer />
        </div>
      </>
    )

  if (isError)
    return (
      <>
        {renderHeader()}
        <div className={styles.status}>
          <div className={styles.status}>{t("storePage.error")}</div>
        </div>
      </>
    )

  const Row = ({
                 index,
                 style,
               }: {
    index: number
    style: CSSProperties
  }): JSX.Element | null => {
    const item = history[index]

    if ("type" in item && item.type === "header") {
      return renderHeader()
    }

    const purchase = item
    const product = itemMap.get(purchase.id)
    if (!product) return null

    return (
      <div
        className={styles.item}
        key={`${String(purchase.id)}-${String(purchase.timestamp)}`}
        style={style}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className={styles.itemImage}
          loading="lazy"
        />
        <div className={styles.itemDetails}>
          <div className={styles.category}>{product.category}</div>
          <div className={styles.name}>{product.name}</div>
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
          itemCount={history.length}
          itemSize={index => index === 0 ? 280 : 76}
          onScroll={onScroll}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  )
}
