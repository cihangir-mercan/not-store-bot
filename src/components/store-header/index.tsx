import type React from "react"
import type { Dispatch, SetStateAction } from "react"
import styles from "./styles/index.module.scss"
import Cart from "@icons/cart.svg?react"
import Search from "@icons/search.svg?react"
import Px from "@icons/px.svg?react"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "@app/hooks.ts"
import { selectTotalCount } from "@app/slices/cartSlice.ts"

type StoreHeaderProps = {
  setCartOpen: Dispatch<SetStateAction<boolean>>
}

export const StoreHeader: React.FC<StoreHeaderProps> = ({ setCartOpen }) => {
  const { t } = useTranslation()
  const totalCount = useAppSelector(selectTotalCount)

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>{t("storePage.title")}</h1>
      <div className={styles.headerButtons}>
        <button className={styles.searchButton}>
          <Search />
        </button>
        <button
          className={styles.cartButton}
          onClick={() => {
            setCartOpen(true)
          }}
        >
          {totalCount >= 42 ? (
            <Px />
          ) : totalCount > 0 ? (
            <div className={styles.badgeWrapper}>
              <span className={styles.cartBadge}>{totalCount}</span>
            </div>
          ) : (
            <Cart />
          )}
        </button>
      </div>
    </header>
  )
}
