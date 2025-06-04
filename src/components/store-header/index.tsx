import type React from "react"
import { useRef } from "react"
import type { Dispatch, SetStateAction } from "react"
import styles from "./styles/index.module.scss"
import Cart from "@icons/cart.svg?react"
import Search from "@icons/search.svg?react"
import Px from "@icons/px.svg?react"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "@app/hooks.ts"
import { selectTotalCount } from "@app/slices/cartSlice.ts"
import Delete from "@icons/delete.svg?react"
import { setSearchInputFocused } from "@app/slices/uiSlice.ts"

type StoreHeaderProps = {
  setCartOpen: Dispatch<SetStateAction<boolean>>
  searchMode: boolean
  setSearchMode: Dispatch<SetStateAction<boolean>>
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
}

export const StoreHeader: React.FC<StoreHeaderProps> = ({
  setCartOpen,
  searchMode,
  setSearchMode,
  searchValue,
  setSearchValue,
}) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const totalCount = useAppSelector(selectTotalCount)
  const dispatch = useAppDispatch()

  return (
    <header className={styles.header}>
      {searchMode ? (
        <div className={styles.searchBar}>
          <div className={styles.inputWrapper}>
            <div className={styles.inputIconWrapper}>
              <Search />
            </div>
            <input
              ref={inputRef}
              autoFocus
              className={styles.searchInput}
              placeholder="Search"
              value={searchValue}
              onChange={e => {
                setSearchValue(e.target.value)
              }}
              onFocus={() => dispatch(setSearchInputFocused(true))}
              onBlur={() => dispatch(setSearchInputFocused(false))}
            />
            {searchValue && (
              <button
                className={styles.clearInput}
                onClick={() => {
                  setSearchValue("")
                }}
                aria-label="Clear search"
              >
                <Delete />
              </button>
            )}
          </div>
          <button
            className={styles.cancelSearch}
            onClick={() => {
              setSearchMode(false)
              setSearchValue("")
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className={styles.mainWrapper}>
          <h1 className={styles.logo}>{t("storePage.title")}</h1>
          <div className={styles.headerButtons}>
            <button
              className={styles.searchButton}
              onClick={() => {
                setSearchMode(true)
              }}
              aria-label={"Search"}
            >
              <Search />
            </button>
            <button
              className={styles.cartButton}
              aria-label={"Cart"}
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
        </div>
      )}
    </header>
  )
}
