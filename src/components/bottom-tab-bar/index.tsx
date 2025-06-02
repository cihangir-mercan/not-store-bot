import type { JSX } from "react"
import { NavLink } from "react-router"
import styles from "./styles/index.module.scss"
import clsx from "clsx"
import { BOTTOM_TABBAR_HEIGHT } from "@components/layout-with-bottom-tabs/constants"

const getTabClasses = (isActive: boolean): string =>
  clsx(styles.tab, isActive && styles.tabActive)

export const BottomTabBar = (): JSX.Element => {
  const tgWebApp = window.Telegram.WebApp
  const bottomInset = tgWebApp.safeAreaInset.bottom
  const offset = BOTTOM_TABBAR_HEIGHT + bottomInset
  const userPp = tgWebApp.initDataUnsafe.user?.photo_url;

  return (
    <nav className={styles.bottomTabbar} style={{ height: offset }}>
      <NavLink to="/" className={({ isActive }) => getTabClasses(isActive)} end>
        <span>🏬</span>
        <span className="label">Store</span>
      </NavLink>

      <NavLink to="/user" className={({ isActive }) => getTabClasses(isActive)}>
        <span>👤</span>
        <span className={styles.label}>{userPp}</span>
      </NavLink>
    </nav>
  )
}
