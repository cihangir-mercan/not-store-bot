import type { JSX } from "react"
import { NavLink, Outlet } from "react-router"
import styles from "./styles/index.module.scss"
import clsx from "clsx"
import { BOTTOM_TABBAR_HEIGHT } from "@components/layout-with-bottom-tabs/constants"

const getTabClasses = (isActive: boolean): string =>
  clsx(styles.tab, isActive && styles.tabActive)

export const LayoutWithBottomTabs = (): JSX.Element => {
  const tgWebApp = window.Telegram.WebApp
  const bottomInset = tgWebApp.safeAreaInset.bottom
  const offset = BOTTOM_TABBAR_HEIGHT + bottomInset

  return (
    <div className={styles.appContainer} style={{ paddingBottom: offset }}>
      {/* this is where the active page will render */}
      <div className={styles.content}>
        <Outlet />
      </div>

      {/* bottom tab bar: always visible */}
      <nav className={styles.bottomTabbar} style={{ height: offset }}>
        <NavLink
          to="/"
          className={({ isActive }) => getTabClasses(isActive)}
          end
        >
          {/* replace with an icon if you like */}
          <span>🏬</span>
          <span className="label">Store</span>
        </NavLink>

        <NavLink
          to="/user"
          className={({ isActive }) => getTabClasses(isActive)}
        >
          <span>👤</span>
          <span className={styles.label}>User</span>
        </NavLink>
      </nav>
    </div>
  )
}
