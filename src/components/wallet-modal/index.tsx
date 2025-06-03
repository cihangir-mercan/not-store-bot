import type React from "react"
import { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import styles from "./styles/index.module.scss"
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react"
import clsx from "clsx"
import { handleSendTon } from "@components/product-actions/utils/handleSendNot.ts"

type WalletModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [tonConnectUI] = useTonConnectUI()
  const userAddress = useTonAddress()
  const [isSending, setIsSending] = useState(false)
  const [showDisconnectOption, setShowDisconnectOption] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.pointerEvents = "auto"
    }
    return () => {
      document.body.style.pointerEvents = ""
    }
  }, [isOpen])

  const handleOpenModal = () => {
    tonConnectUI.openModal().catch((err: unknown) => {
      console.error(err)
    })
  }

  const handleDisconnect = async () => {
    try {
      await tonConnectUI.disconnect()
      setShowDisconnectOption(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleBuy = async () => {
    if (!userAddress) return

    setIsSending(true)

    try {
      await handleSendTon(tonConnectUI)
    } catch (err) {
      setIsSending(false)
      console.warn("TonConnect işlemi iptal edildi veya hata oluştu:", err)
    } finally {
      setIsSending(false)
    }
  }

  if (!isOpen) return null

  const shortenAddress = (addr: string) => {
    if (addr.length <= 10) return addr
    return addr.slice(0, 6) + "…" + addr.slice(-4)
  }

  return ReactDOM.createPortal(
    <div
      className={styles.backdrop}
      onClick={e => {
        e.stopPropagation()
      }}
    >
      <div
        className={styles.modal}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Kapat"
        >
          ×
        </button>

        {!userAddress ? (
          <h2 className={styles.title}>Lütfen önce cüzdanınızı bağlayın</h2>
        ) : (
          <div className={styles.addressContainer}>
            <button
              className={styles.addressLink}
              onClick={() => {
                setShowDisconnectOption(prev => !prev)
              }}
              aria-label="Adres seçenekleri"
            >
              Cüzdanınız: {shortenAddress(userAddress)} ▾
            </button>
            {showDisconnectOption && (
              <button
                className={clsx(styles.disconnectDropdown, styles.visible)}
                onClick={() => {
                  void handleDisconnect()
                }}
                aria-label="Cüzdan bağlantısını kes"
              >
                Disconnect Wallet
              </button>
            )}
          </div>
        )}

        {!userAddress && (
          <button
            className={styles.connectButton}
            aria-label="Cüzdanı bağla"
            onClick={handleOpenModal}
          >
            Cüzdanı Bağla
          </button>
        )}

        {userAddress && (
          <div className={styles.sendWrapper}>
            <button
              className={styles.send}
              aria-label="Satın Al"
              onClick={() => {
                void handleBuy()
              }}
              disabled={isSending}
            >
              {isSending ? "İşlem Gönderiliyor…" : "Satın Al"}
            </button>
          </div>
        )}

        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <div className={styles.footerIcon}>
              <span style={{ fontSize: "14px", color: "#007AFF" }}>T</span>
            </div>
            <span className={styles.footerText}>TON Connect</span>
          </div>
          <button className={styles.footerHelp} aria-label="Yardım">
            ?
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
