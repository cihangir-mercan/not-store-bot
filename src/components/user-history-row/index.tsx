import React from "react"
import type { CSSProperties, JSX } from "react"
import dayjs from "dayjs"
import type { ProductItem } from "@app/slices/itemsApiSlice"
import type { VirtualHistoryItem } from "@pages/user-page"
import styles from "./styles/index.module.scss"
import { UserHistoryHeader } from "@components/user-history-reader"

export type ItemData = {
  history: VirtualHistoryItem[]
  itemMap: Map<number, ProductItem>
  userPp?: string
  firstName?: string
  userAddress?: string
  showDisconnectOption: boolean
  handleOpenModal: () => void
  handleToggleDisconnect: () => void
  handleDisconnect: () => void
}

type RowProps = {
  index: number
  style: CSSProperties
  data: ItemData
}

export const UserHistoryRow = React.memo(
  ({ index, style, data }: RowProps): JSX.Element | null => {
    const {
      history,
      itemMap,
      userPp,
      firstName,
      userAddress,
      showDisconnectOption,
      handleOpenModal,
      handleToggleDisconnect,
      handleDisconnect,
    } = data

    const item = history[index]

    if ("type" in item && item.type === "header") {
      return (
        <UserHistoryHeader
          style={style}
          userPp={userPp}
          firstName={firstName}
          userAddress={userAddress}
          showDisconnectOption={showDisconnectOption}
          handleOpenModal={handleOpenModal}
          handleToggleDisconnect={handleToggleDisconnect}
          handleDisconnect={handleDisconnect}
        />
      )
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
  },
)
