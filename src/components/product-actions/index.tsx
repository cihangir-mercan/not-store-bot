// src/components/product-actions/index.tsx

import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  selectQuantityById,
} from "@app/slices/cartSlice"
import { useTranslation } from "react-i18next"
import Plus from "@icons/plus.svg?react"
import Minus from "@icons/minus.svg?react"
import styles from "./styles/index.module.scss"

import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react"
import { handleSendTon } from "@components/wallet-modal/utils"
import { SuccessModal } from "@components/success-modal"

type ProductActionsProps = {
  productId: number
  maxAllowed: number // genelde product.left
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  productId,
  maxAllowed,
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [tonConnectUI] = useTonConnectUI()
  const userAddress = useTonAddress()
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const qtyInCart = useAppSelector(state =>
    selectQuantityById(state)(productId),
  )
  const canAddMore = qtyInCart < maxAllowed
  const hasMoreThanZero = maxAllowed > 0

  const handleConnectWallet = () => {
    tonConnectUI.openModal().catch((err: unknown) => {
      console.error("TON Connect açılırken hata:", err)
    })
  }

  const handlePaymentSuccess = () => {
    setIsSuccessModalOpen(true)
  }

  const handleBuyNow = async () => {
    if (!userAddress) return
    try {
      await handleSendTon(tonConnectUI)
      handlePaymentSuccess()
    } catch (err) {
      console.warn("TonConnect işlemi iptal edildi veya hata oluştu:", err)
    }
  }

  const addButtonText = canAddMore
    ? t("productPage.addToCart")
    : t("productPage.outOfStock")

  return (
    <div className={styles.actions}>
      {qtyInCart > 0 ? (
        <div className={styles.quantityControls}>
          <button
            className={styles.decrementButton}
            onClick={() => dispatch(decrementQuantity({ id: productId }))}
            aria-label={t("productPage.decrementQuantity")}
          >
            <Minus />
          </button>

          <span
            className={styles.quantityLabel}
            aria-live="polite"
            aria-atomic="true"
          >
            {qtyInCart}
          </span>

          <button
            className={styles.incrementButton}
            onClick={() =>
              canAddMore && dispatch(incrementQuantity({ id: productId }))
            }
            disabled={!canAddMore}
            aria-label={t("productPage.incrementQuantity")}
            aria-disabled={!canAddMore}
          >
            <Plus />
          </button>
        </div>
      ) : (
        <button
          className={styles.addToCart}
          onClick={() => canAddMore && dispatch(addToCart({ id: productId }))}
          disabled={!canAddMore}
          aria-label={addButtonText}
          aria-disabled={!canAddMore}
        >
          {addButtonText}
        </button>
      )}

      {hasMoreThanZero && (
        <button
          className={styles.buyNow}
          onClick={() => {
            if (!userAddress) {
              handleConnectWallet()
            } else {
              void handleBuyNow()
            }
          }}
          aria-label={t("productPage.buyNow")}
        >
          {t("productPage.buyNow")}
        </button>
      )}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false)
        }}
      />
    </div>
  )
}
