import { useEffect, useRef } from "react"
import type { CSSProperties, JSX } from "react"
import styles from "./index.module.scss"

export type UserHistoryHeaderProps = {
  style?: CSSProperties
  userPp?: string
  firstName?: string
  userAddress?: string
  showDisconnectOption: boolean
  handleOpenModal: () => void
  handleToggleDisconnect: (force?: boolean) => void
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
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showDisconnectOption &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleToggleDisconnect(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showDisconnectOption, handleToggleDisconnect])

  const shortenAddress = (addr: string) => {
    if (addr.length <= 4) return addr
    return addr[0] + "…" + addr.slice(-3)
  }

  return (
    <div className={styles.listHeader} style={style} role="banner">
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
            aria-label="Connect Wallet"
          >
            Connect Wallet
          </button>
        ) : (
          <div ref={containerRef} className={styles.addressContainer}>
            <button
              className={styles.addressLink}
              onClick={() => {
                handleToggleDisconnect()
              }}
              aria-label="Address options"
            >
              {shortenAddress(userAddress)} ▾
            </button>
            {showDisconnectOption && (
              <button
                className={`${styles.disconnectDropdown} ${styles.visible}`}
                onClick={handleDisconnect}
                aria-label="Disconnect from wallet"
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
