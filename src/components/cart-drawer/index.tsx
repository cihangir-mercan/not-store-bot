import type React from "react"
import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import { useAppSelector } from "@app/hooks"
import { selectCart } from "@app/slices/cartSlice"
import { useGetItemsQuery } from "@app/slices/itemsApiSlice"
import { Drawer } from "vaul"
import styles from "./styles/index.module.scss"
import Close from "@icons/close.svg?react"
import { CartItemRow } from "@components/cart-item-row"
import { MARGIN_BOTTOM } from "@components/cart-drawer/constants"
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react"
import toast from "react-hot-toast"
import {
  INSUFFICIENT_FUNDS,
  NO_JETTON_WALLET,
} from "@components/product-actions/constants"
import { handleSendNot } from "@components/product-actions/utils/handleSendNot.ts"
import { useTranslation } from "react-i18next"
import { SuccessModal } from "@components/success-modal"

type CartDrawerProps = {
  cartOpen: boolean
  setCartOpen: Dispatch<SetStateAction<boolean>>
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  cartOpen,
  setCartOpen,
}) => {
  const { t } = useTranslation()
  const tgWebApp = window.Telegram.WebApp
  const bottomInset = tgWebApp.safeAreaInset.bottom
  const marginBottom = MARGIN_BOTTOM + bottomInset
  const [tonConnectUI] = useTonConnectUI()
  const userAddress = useTonAddress()
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setCartOpen(false)
    }
  }

  const cartItems = useAppSelector(selectCart)
  const hasZeroLength = cartItems.length === 0
  const { data: itemsData } = useGetItemsQuery(null)

  const idToItem = new Map(itemsData?.data.map(item => [item.id, item]))

  const totalPrice = cartItems.reduce((sum, cartItem) => {
    const product = idToItem.get(cartItem.id)
    return sum + (product?.price ?? 0) * cartItem.quantity
  }, 0)

  const handlePaymentSuccess = () => {
    setIsSuccessModalOpen(true)
  }

  const showErrorToast = (msgKey: string) => {
    toast.dismiss()
    toast.error(t(`productPage.${msgKey}`))
  }

  const handleConnectWallet = () => {
    tonConnectUI.openModal().catch(() => {
      showErrorToast("walletOpenError")
    })
  }
  const handleBuyNow = async () => {
    if (!userAddress) {
      handleConnectWallet()
      return
    }

    try {
      await handleSendNot(tonConnectUI, userAddress, totalPrice)
      handlePaymentSuccess()
    } catch (err: unknown) {
      console.warn("handleSendNot threw:", err)
      if (err instanceof Error && err.message === INSUFFICIENT_FUNDS) {
        showErrorToast("insufficientFunds")
      } else if (err instanceof Error && err.message === NO_JETTON_WALLET) {
        showErrorToast("noJettonWallet")
      } else {
        showErrorToast("paymentCancelled")
      }
    }
  }

  return (
    <>
      <Drawer.Root
        open={cartOpen}
        onOpenChange={handleOpenChange}>
        <Drawer.Portal>
          <Drawer.Overlay
            className={styles.vaulOverlay}
            onClick={e => { e.stopPropagation(); }}
          />
          <Drawer.Content
            className={styles.vaulContent}
            style={
              { "--vaul-drawer-direction": "bottom" } as React.CSSProperties
            }
          >
            <Drawer.Handle className={styles.vaulHandle} />

            <header className={styles.header}>
              {!hasZeroLength && <h2 className={styles.headerTitle}>Cart</h2>}
              <Drawer.Close asChild>
                <button className={styles.closeButton}>
                  <Close />
                </button>
              </Drawer.Close>
            </header>

            <div className={hasZeroLength ? styles.noDataBody : styles.body}>
              {hasZeroLength ? (
                <div className={styles.noDataWrapper}>
                  <p className={styles.noItemTitle}>Cart’s cold</p>
                  <p className={styles.noItemContent}>No items yet</p>
                </div>
              ) : (
                cartItems.map(cartItem => {
                  const product = idToItem.get(cartItem.id)
                  if (!product) return null
                  return (
                    <CartItemRow
                      key={cartItem.id}
                      product={product}
                      cartItem={cartItem}
                    />
                  )
                })
              )}
            </div>

            <footer className={styles.footer} style={{ marginBottom }}>
              {cartItems.length > 0 ? (
                <button
                  className={styles.buyButton}
                  onClick={() => {
                    if (!userAddress) {
                      handleConnectWallet()
                    } else {
                      void handleBuyNow()
                    }
                  }}
                >
                  <div className={styles.buttonText}>
                    Buy for {totalPrice} NOT
                  </div>
                </button>
              ) : (
                <Drawer.Close asChild>
                  <button className={styles.okButton} aria-label="OK">
                    <div className={styles.buttonText}>OK</div>
                  </button>
                </Drawer.Close>
              )}
            </footer>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false)
        }}
      />
    </>
  )
}
