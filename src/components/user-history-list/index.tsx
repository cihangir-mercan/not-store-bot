import React, { useState } from "react"
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react"
import type { CSSProperties, JSX, RefObject } from "react"
import type { ListOnScrollProps } from "react-window"
import { VariableSizeList as List } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import dayjs from "dayjs"
import styles from "./styles/index.module.scss"
import type { ProductItem } from "@app/slices/itemsApiSlice"
import type { VirtualHistoryItem } from "@pages/user-page"
import { ShimmerLoading } from "@components/shimmer-loading"
import { ErrorText } from "@components/error-text"
import { UserHistoryHeader } from "@components/user-history-reader"

type Props = {
  history: VirtualHistoryItem[]
  itemMap: Map<number, ProductItem>
  onScroll: (props: ListOnScrollProps) => void
  listRef: RefObject<List | null>
  isLoading: boolean
  isError: boolean
}

type ItemData = {
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

const getItemSize = (index: number) => (index === 0 ? 280 : 76)

const Row = React.memo(
  ({
    index,
    style,
    data,
  }: {
    index: number
    style: CSSProperties
    data: ItemData
  }): JSX.Element | null => {
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

export const UserHistoryList = ({
  history,
  itemMap,
  onScroll,
  listRef,
  isLoading,
  isError,
}: Props): JSX.Element => {
  const tgWebApp = window.Telegram.WebApp
  const user = tgWebApp.initDataUnsafe.user
  const userPp = user?.photo_url
  const firstName = user?.first_name

  const [tonConnectUI] = useTonConnectUI()
  const userAddress = useTonAddress()
  const [showDisconnectOption, setShowDisconnectOption] = useState(false)

  const handleOpenModal = () => {
    tonConnectUI.openModal().catch((err: unknown) => {
      console.error("TonConnect açılırken hata:", err)
    })
  }

  const handleDisconnect = () => {
    tonConnectUI
      .disconnect()
      .then(() => {
        setShowDisconnectOption(false)
      })
      .catch((err: unknown) => {
        console.error("Disconnect sırasında hata:", err)
      })
  }

  const handleToggleDisconnect = () => {
    setShowDisconnectOption(prev => !prev)
  }

  const itemData: ItemData = {
    history,
    itemMap,
    userPp,
    firstName,
    userAddress,
    showDisconnectOption,
    handleOpenModal,
    handleToggleDisconnect,
    handleDisconnect,
  }

  if (isLoading) {
    return (
      <>
        <UserHistoryHeader
          userPp={userPp}
          firstName={firstName}
          userAddress={userAddress}
          showDisconnectOption={showDisconnectOption}
          handleOpenModal={handleOpenModal}
          handleToggleDisconnect={handleToggleDisconnect}
          handleDisconnect={handleDisconnect}
        />
        <ShimmerLoading />
      </>
    )
  }

  if (isError) {
    return (
      <>
        <UserHistoryHeader
          userPp={userPp}
          firstName={firstName}
          userAddress={userAddress}
          showDisconnectOption={showDisconnectOption}
          handleOpenModal={handleOpenModal}
          handleToggleDisconnect={handleToggleDisconnect}
          handleDisconnect={handleDisconnect}
        />
        <ErrorText />
      </>
    )
  }

  if (history.length === 0) {
    return (
      <>
        <UserHistoryHeader
          userPp={userPp}
          firstName={firstName}
          userAddress={userAddress}
          showDisconnectOption={showDisconnectOption}
          handleOpenModal={handleOpenModal}
          handleToggleDisconnect={handleToggleDisconnect}
          handleDisconnect={handleDisconnect}
        />
        <div className={styles.noResult}>
          <h2 className={styles.noResultTitle}>No history yet</h2>
          <p className={styles.noResultSubtitle}>Let’s change that</p>
        </div>
      </>
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
          itemSize={getItemSize}
          itemData={itemData}
          onScroll={onScroll}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  )
}
