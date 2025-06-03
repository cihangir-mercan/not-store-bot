import type { CSSProperties, JSX } from "react"
import styles from "./styles/index.module.scss"

export type UserHistoryHeaderProps = {
  style?: CSSProperties
  userPp?: string
  firstName?: string
  userAddress?: string
  showDisconnectOption: boolean
  handleOpenModal: () => void
  handleToggleDisconnect: () => void
  handleDisconnect: () => void
}

export const UserHistoryHeader = ({
  style,
  userPp,
  firstName,
  userAddress,
  showDisconnectOption,
  handleOpenModal,
  handleToggleDisconnect,
  handleDisconnect,
}: UserHistoryHeaderProps): JSX.Element => {
  const shortenAddress = (addr: string) => {
    if (addr.length <= 4) return addr
    return addr[0] + "…" + addr.slice(-3)
  }

  return (
    <div className={styles.listHeader} style={style}>
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

      <div className={styles.walletControl}>
        {!userAddress ? (
          <button
            className={styles.connectLink}
            onClick={handleOpenModal}
            aria-label="Cüzdanı bağla"
          >
            Connect Wallet
          </button>
        ) : (
          <div className={styles.addressContainer}>
            <button
              className={styles.addressLink}
              onClick={handleToggleDisconnect}
              aria-label="Adres seçenekleri"
            >
              {shortenAddress(userAddress)} ▾
            </button>
            {showDisconnectOption && (
              <button
                className={`${styles.disconnectDropdown} ${styles.visible}`}
                onClick={handleDisconnect}
                aria-label="Cüzdan bağlantısını kes"
              >
                Disconnect Wallet
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
