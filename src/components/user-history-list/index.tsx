import { useState } from "react"
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react"
import type { JSX, RefObject } from "react"
import type { ListOnScrollProps } from "react-window"
import { VariableSizeList as List } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

import styles from "./styles/index.module.scss"
import type { ProductItem } from "@app/slices/itemsApiSlice"
import type { VirtualHistoryItem } from "@pages/user-page"
import { RechargeLoading } from "@components/recharge-loading"
import { ErrorText } from "@components/error-text"
import type { ItemData } from "@components/user-history-row"
import { UserHistoryRow } from "@components/user-history-row"
import { UserHistoryHeader } from "@components/user-history-reader"

type Props = {
  history: VirtualHistoryItem[]
  itemMap: Map<number, ProductItem>
  onScroll: (props: ListOnScrollProps) => void
  listRef: RefObject<List | null>
  isLoading: boolean
  isError: boolean
}

const getItemSize = (index: number) => (index === 0 ? 280 : 76)

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

  const handleToggleDisconnect = (force?: boolean) => {
    setShowDisconnectOption(prev => force ?? !prev)
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
        <RechargeLoading />
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
          {UserHistoryRow}
        </List>
      )}
    </AutoSizer>
  )
}
