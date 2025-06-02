import type React from "react"
import styles from "./styles/index.module.scss"
import Minus from "@icons/minus.svg?react"
import { useAppDispatch } from "@app/hooks"
import { decrementQuantity } from "@app/slices/cartSlice"
import type { ProductItem } from "@app/slices/itemsApiSlice"
import type { CartItem } from "@app/slices/cartSlice"

type CartItemRowProps = {
  product: ProductItem
  cartItem: CartItem
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ product, cartItem }) => {
  const dispatch = useAppDispatch()

  return (
    <div className={styles.cartItemRow}>
      <img
        src={product.images[0]}
        alt={product.name}
        className={styles.cartItemImage}
      />

      <div className={styles.cartItemDetails}>
        <div className={styles.cartItemText}>
          <span className={styles.cartItemCategory}>
            {product.category}
          </span>
          <span className={styles.cartItemName}>
            {product.name}
          </span>
        </div>

        <div className={styles.cartItemPricing}>
          <span className={styles.cartItemQuantity}>
            x{cartItem.quantity}
          </span>
          <span className={styles.cartItemUnitPrice}>
            {product.price} {product.currency} each
          </span>
        </div>
      </div>

      <div className={styles.rightWrapper}>
        <span className={styles.cartItemTotalPrice}>
          {product.price * cartItem.quantity} {product.currency}
        </span>
        <button
          className={styles.removeButton}
          onClick={() =>
            dispatch(decrementQuantity({ id: product.id }))
          }
        >
          <Minus />
        </button>
      </div>
    </div>
  )
}
