import type { Dispatch, SetStateAction } from "react"
import type React from "react"
import { useState } from "react"
import { Sheet } from "react-modal-sheet"
import { useAppSelector } from "@app/hooks"
import { selectCart } from "@app/slices/cartSlice"
import { useGetItemsQuery } from "@app/slices/itemsApiSlice"
import styles from "./index.module.scss"
import Close from "@icons/close.svg?react"
import { CartItemRow } from "@components/cart-item-row"
import { MARGIN_BOTTOM } from "@components/cart-drawer/constants"
import { SuccessModal } from "@components/success-modal"
import { useAppDispatch } from "@app/hooks"
import { clearCart } from "@app/slices/cartSlice"
import { useBuyWithNot } from "../../hooks/useBuyWithNot.ts"

type CartDrawerProps = {
  cartOpen: boolean
  setCartOpen: Dispatch<SetStateAction<boolean>>
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  cartOpen,
  setCartOpen,
}) => {
  const dispatch = useAppDispatch()
  const tgWebApp = window.Telegram.WebApp
  const bottomInset = tgWebApp.safeAreaInset.bottom
  const marginBottom = MARGIN_BOTTOM + bottomInset
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const { sendPayment } = useBuyWithNot()

  const cartItems = useAppSelector(selectCart)
  const hasZeroLength = cartItems.length === 0
  const { data: itemsData } = useGetItemsQuery(null)
  const idToItem = new Map(itemsData?.data.map(item => [item.id, item]))
  const totalPrice = cartItems.reduce((sum, cartItem) => {
    const product = idToItem.get(cartItem.id)
    return sum + (product?.price ?? 0) * cartItem.quantity
  }, 0)

  const handlePaymentSuccess = () => {
    dispatch(clearCart())
    setIsSuccessModalOpen(true)
  }

  const handleBuyNow = async () => {
    const success = await sendPayment(totalPrice)
    if (success) handlePaymentSuccess()
  }

  return (
    <>
      {cartOpen && (
        <div
          className={styles.noClickBackdrop}
          onClick={e => {
            e.stopPropagation()
            setCartOpen(false)
          }}
        />
      )}

      <Sheet
        isOpen={cartOpen}
        disableDrag={true}
        onClose={() => {
          setCartOpen(false)
        }}
        detent="content-height"
        style={{ zIndex: 800 }}
      >
        <Sheet.Container className={styles.sheetContainer}>
          <Sheet.Content className={styles.sheetContent}>
            <header className={styles.header}>
              {!hasZeroLength && <h2 className={styles.headerTitle}>Cart</h2>}
              <button
                className={styles.closeButton}
                onClick={() => {
                  setCartOpen(false)
                }}
                aria-label="Close"
              >
                <Close />
              </button>
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
                    void handleBuyNow()
                  }}
                >
                  <div className={styles.buttonText}>
                    Buy for {totalPrice} NOT
                  </div>
                </button>
              ) : (
                <button
                  className={styles.okButton}
                  onClick={() => {
                    setCartOpen(false)
                  }}
                  aria-label="OK"
                >
                  <div className={styles.buttonText}>OK</div>
                </button>
              )}
            </footer>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop className={styles.customBackdrop} />
      </Sheet>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false)
        }}
      />
    </>
  )
}
