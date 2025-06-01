import type { JSX } from "react"
import { useState } from "react"
import styles from "./styles/index.module.scss"
import { StoreHeader } from "@components/store-header"
import { CartDrawer } from "@components/cart-drawer"
import { useGetItemsQuery } from "@app/slices/itemsApiSlice"
import type { ProductItem } from "@app/slices/itemsApiSlice"
import { ProductCard } from "@components/product-card"
import { useScrollRestoreForStore } from "@components/layout-with-bottom-tabs/hooks/useScrollRestoreForStore.tsx"

export const StorePage = (): JSX.Element => {
  const [cartOpen, setCartOpen] = useState(false)
  const { data: apiResponse, isLoading, isError } = useGetItemsQuery(null)
  const items: ProductItem[] = apiResponse?.data ?? []
  useScrollRestoreForStore("store-scroll")

  return (
    <div id="store-scroll" className={styles.storeContainer}>
      <StoreHeader setCartOpen={setCartOpen} />

      {isLoading ? (
        <div className={styles.status}>Loading…</div>
      ) : isError ? (
        <div className={styles.status}>Error loading products.</div>
      ) : (
        <div className={styles.links}>
          {items.map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <CartDrawer cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </div>
  )
}
