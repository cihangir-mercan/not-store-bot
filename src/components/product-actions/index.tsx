import type React from "react";
import { useAppDispatch, useAppSelector } from "@app/hooks"
import {
  addToCart,
  decrementQuantity,
  incrementQuantity, selectQuantityById
} from "@app/slices/cartSlice"
import { useTranslation } from "react-i18next";
import Plus from "@icons/plus.svg?react";
import Minus from "@icons/minus.svg?react";
import styles from "./styles/index.module.scss";

type ProductActionsProps = {
  productId: number;
  maxAllowed: number; // typically `product.left`
  onBuy?: () => void;
};

export const ProductActions: React.FC<ProductActionsProps> = ({
                                                                productId,
                                                                maxAllowed,
                                                                onBuy,
                                                              }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const qtyInCart = useAppSelector((state) =>
    selectQuantityById(state)(productId)
  );

  const canAddMore = qtyInCart < maxAllowed;
  const hasMoreThanZero = maxAllowed > 0;

  return (
    <div className={styles.actions}>
      {qtyInCart > 0 ? (
        <div className={styles.quantityControls}>
          <button
            className={styles.decrementButton}
            onClick={() => dispatch(decrementQuantity({ id: productId }))}
          >
            <Minus />
          </button>

          <span className={styles.quantityLabel}>{qtyInCart}</span>

          <button
            className={styles.incrementButton}
            onClick={() => canAddMore && dispatch(incrementQuantity({ id: productId }))}
            disabled={!canAddMore}
          >
            <Plus />
          </button>
        </div>
      ) : (
        <button
          className={styles.addToCart}
          onClick={() => canAddMore && dispatch(addToCart({ id: productId }))}
          disabled={!canAddMore}
        >
          {canAddMore
            ? t("productPage.addToCart")
            : t("productPage.outOfStock")}
        </button>
      )}

      {
        hasMoreThanZero &&
        <button className={styles.buyNow} onClick={onBuy}>
          {t("productPage.buyNow")}
        </button>
      }
    </div>
  );
};
