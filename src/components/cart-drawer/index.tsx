import type React from "react"
import type { Dispatch, SetStateAction } from "react"
import { useAppSelector, useAppDispatch } from "@app/hooks"
import { selectCart, removeFromCart } from "@app/slices/cartSlice"
import { useGetItemsQuery } from "@app/slices/itemsApiSlice"
import { Drawer } from "vaul"
import styles from "./styles/index.module.scss"
import Minus from "@icons/minus.svg?react"

type CartDrawerProps = {
  cartOpen: boolean
  setCartOpen: Dispatch<SetStateAction<boolean>>
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  cartOpen,
  setCartOpen,
}) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setCartOpen(false)
    }
  }

  const cartItems = useAppSelector(selectCart)
  const dispatch = useAppDispatch()
  const { data: itemsData } = useGetItemsQuery(null)

  const idToItem = new Map(itemsData?.data.map(item => [item.id, item]))

  const totalPrice = cartItems.reduce((sum, cartItem) => {
    const product = idToItem.get(cartItem.id)
    return sum + (product?.price ?? 0) * cartItem.quantity
  }, 0)

  return (
    <Drawer.Root open={cartOpen} onOpenChange={handleOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className={styles.vaulOverlay} />
        <Drawer.Content
          className={styles.vaulContent}
          style={{ "--vaul-drawer-direction": "bottom" } as React.CSSProperties}
        >
          <Drawer.Handle className={styles.vaulHandle} />

          <header className={styles.header}>
            <h2>Cart</h2>
            <Drawer.Close asChild>
              <button className={styles.closeButton}>✕</button>
            </Drawer.Close>
          </header>

          <div className={styles.body}>
            {cartItems.length === 0 ? (
              <p>No items yet</p>
            ) : (
              cartItems.map(cartItem => {
                const product = idToItem.get(cartItem.id)
                if (!product) return null

                return (
                  <div key={cartItem.id} className={styles.cartItemRow}>
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
                          dispatch(removeFromCart({ id: product.id }))
                        }
                      >
                        <Minus />
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {cartItems.length > 0 && (
            <footer className={styles.footer}>
              <button className={styles.buyButton}>
                <div className={styles.buttonText}>Buy for {totalPrice} NOT</div>
              </button>
            </footer>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
