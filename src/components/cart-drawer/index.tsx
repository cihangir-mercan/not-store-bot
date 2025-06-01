import type React from "react";
import { useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"
import styles from "./styles/index.module.scss"
import { Drawer } from "vaul"

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
      setCartOpen(false);
    }
  };

  useEffect(() => {
    console.log("cartOpen: ", cartOpen)
  }, [cartOpen])

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
            <h2>Cart’s cold</h2>
            <Drawer.Close asChild>
              <button className={styles.closeButton} aria-label="Close cart">
                ✕
              </button>
            </Drawer.Close>
          </header>

          <div className={styles.body}>
            <p>No items yet</p>
          </div>

          <footer className={styles.footer}>
            <Drawer.Close asChild>
              <button className={styles.okButton} aria-label="OK">
                OK
              </button>
            </Drawer.Close>
          </footer>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
