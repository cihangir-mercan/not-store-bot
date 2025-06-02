import type React from "react"
import styles from "./styles/index.module.scss"
import { TonConnectButton } from "@tonconnect/ui-react"

type WalletModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close"
        >
          ×
        </button>

        <h2 className={styles.title}>Connect your wallet</h2>

        <TonConnectButton />

        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <div className={styles.footerIcon}>
              <span style={{ fontSize: "14px", color: "#007AFF" }}>T</span>
            </div>
            <span className={styles.footerText}>TON Connect</span>
          </div>
          <button className={styles.footerHelp} aria-label="Help">
            ?
          </button>
        </div>
      </div>
    </div>
  )
}
