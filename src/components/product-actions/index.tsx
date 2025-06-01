import type React from "react"
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

type ProductActionsProps = {
  productId: number
  maxAllowed: number // typically `product.left`
  onBuy?: () => void
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  productId,
  maxAllowed,
  onBuy,
}) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const qtyInCart = useAppSelector(state =>
    selectQuantityById(state)(productId),
  )

  const canAddMore = qtyInCart < maxAllowed
  const hasMoreThanZero = maxAllowed > 0

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
          onClick={onBuy}
          aria-label={t("productPage.buyNow")}
        >
          {t("productPage.buyNow")}
        </button>
      )}
    </div>
  )
}
