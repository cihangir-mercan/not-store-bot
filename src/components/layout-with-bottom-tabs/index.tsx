import type { JSX } from "react"
import { useRef } from "react"
import { NavLink, useLocation } from "react-router"
import styles from "./styles/index.module.scss"
import clsx from "clsx"
import { BOTTOM_TABBAR_HEIGHT } from "@components/layout-with-bottom-tabs/constants"
// import { useScrollRestoration } from "@components/layout-with-bottom-tabs/hooks/useScrollRestoration"
import { StorePage } from "@pages/store-page"
import { UserPage } from "@pages/user-page"

const getTabClasses = (isActive: boolean): string =>
  clsx(styles.tab, isActive && styles.tabActive)

export const LayoutWithBottomTabs = (): JSX.Element => {
  const location = useLocation()
  const tgWebApp = window.Telegram.WebApp
  const bottomInset = tgWebApp?.safeAreaInset?.bottom ?? 0
  const offset = BOTTOM_TABBAR_HEIGHT + bottomInset

  return (
    <div className={styles.appContainer} style={{ paddingBottom: offset }}>
      <div className={styles.content} >
        <div className={styles.tabContent} data-active={location.pathname === "/"} >
          <StorePage />
        </div>
        <div className={styles.tabContent} data-active={location.pathname === "/user"}>
          <UserPage />
        </div>
      </div>


      <nav className={styles.bottomTabbar} style={{ height: offset }}>
        <NavLink
          to="/"
          className={({ isActive }) => getTabClasses(isActive)}
          end
        >
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
