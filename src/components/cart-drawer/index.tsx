import type React from "react"
import type { Dispatch, SetStateAction } from "react"
import { useAppSelector } from "@app/hooks"
import { selectCart } from "@app/slices/cartSlice"
import { useGetItemsQuery } from "@app/slices/itemsApiSlice"
import { Drawer } from "vaul"
import styles from "./styles/index.module.scss"
import Close from "@icons/close.svg?react"
import { CartItemRow } from "@components/cart-item-row"

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
  const hasZeroLength = cartItems.length === 0
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

          <footer className={styles.footer}>
            {cartItems.length > 0 ? (
              <button className={styles.buyButton}>
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
  )
}
