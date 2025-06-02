import type { JSX } from "react"
import { useState } from "react"
import styles from "./styles/index.module.scss"
import { StoreHeader } from "@components/store-header"
import { CartDrawer } from "@components/cart-drawer"
import { useGetItemsQuery } from "@app/slices/itemsApiSlice"
import type { ProductItem } from "@app/slices/itemsApiSlice"
import { ProductCard } from "@components/product-card"
import { useScrollRestoreForStore } from "@components/layout-with-bottom-tabs/hooks/useScrollRestoreForStore.tsx"
import Duck from "@icons/duck.svg?react"

export const StorePage = (): JSX.Element => {
  const [cartOpen, setCartOpen] = useState(false)
  const [searchMode, setSearchMode] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const { data: apiResponse, isLoading, isError } = useGetItemsQuery(null)
  const items: ProductItem[] = apiResponse?.data ?? []
  useScrollRestoreForStore("store-scroll")

  const query = searchValue.trim().toLowerCase()

  const filteredItems = items.filter(item => {
    return (
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.fabric.toLowerCase().includes(query)
    )
  })

  return (
    <div id="store-scroll" className={styles.storeContainer}>
      <StoreHeader
        setCartOpen={setCartOpen}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      {isLoading ? (
        <div className={styles.links}>
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCard
              key={i}
              loading
              item={{
                id: i,
                name: "",
                price: 0,
                currency: "",
                images: [],
                category: "",
                description: "",
                tags: { fabric: "" },
                left: 0
              }}
            />
          ))}
        </div>
      ) : isError ? (
        <div className={styles.status}>Error loading products.</div>
      ) : filteredItems.length === 0 ? (
        <div className={styles.noResult}>
          <Duck />
          <h2 className={styles.noResultTitle}>Not Found</h2>
          <p className={styles.noResultSubtitle}>This style doesn’t exist</p>
        </div>
      ) : (
        <div className={styles.links}>
          {filteredItems.map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}


      <CartDrawer cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </div>
  )
}
