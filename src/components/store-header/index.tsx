import type React from "react"
import type { Dispatch, SetStateAction } from "react"
import styles from "./styles/index.module.scss"
import Cart from "@icons/cart.svg?react";
import {useTranslation} from "react-i18next";

type StoreHeaderProps = {
  setCartOpen: Dispatch<SetStateAction<boolean>>
}

export const StoreHeader: React.FC<StoreHeaderProps> = ({ setCartOpen }) => {
  const { t } = useTranslation()

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>{t('storePage.title')}</h1>
      <div className={styles.headerButtons}>
        <button className={styles.searchButton}>🔍</button>
        <button
          className={styles.cartButton}
          onClick={() => { setCartOpen(true); }}
        >
          <Cart />
        </button>
      </div>
    </header>
  )
}
