import type { JSX } from "react"
import { NavLink, Outlet } from "react-router"
import styles from "./index.module.scss";

const getTabClasses: (isActive: boolean) => string = (isActive) => {
  // If active, return both "tab" and "tabActive"; otherwise just "tab"
  return isActive
    ? `${styles.tab} ${styles.tabActive}`
    : styles.tab
}

export const LayoutWithBottomTabs = (): JSX.Element => {

  return (
    <div className={styles.appContainer}>
      {/* this is where the active page will render */}
      <div className={styles.content}>
        <Outlet />
      </div>

      {/* bottom tab bar: always visible */}
      <nav className={styles.bottomTabbar}>
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
