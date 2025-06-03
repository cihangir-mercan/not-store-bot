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
import Shimmer from "@icons/shimmer.svg?react"
import { useTranslation } from "react-i18next"

export const StorePage = (): JSX.Element => {
  const { t } = useTranslation()
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
        <div className={styles.status}>
          <Shimmer />
        </div>
      ) : isError ? (
        <div className={styles.status}>{t("storePage.error")}</div>
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
