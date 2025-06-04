import type React from "react"
import { useState } from "react"
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
import styles from "./index.module.scss"
import { SuccessModal } from "@components/success-modal"
import { useBuyWithNot } from "../../hooks/useBuyWithNot.ts"

type ProductActionsProps = {
  productId: number
  maxAllowed: number
  notPrice: number
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  productId,
  maxAllowed,
  notPrice,
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const qtyInCart = useAppSelector(state =>
    selectQuantityById(state)(productId),
  )
  const canAddMore = qtyInCart < maxAllowed
  const hasMoreThanZero = maxAllowed > 0
  const { sendPayment } = useBuyWithNot()

  const handlePaymentSuccess = () => {
    setIsSuccessModalOpen(true)
  }

  const handleBuyNow = async () => {
    const success = await sendPayment(notPrice)
    if (success) handlePaymentSuccess()
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
            void handleBuyNow()
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
