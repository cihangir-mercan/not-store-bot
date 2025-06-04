import type { JSX } from "react"
import { NavLink } from "react-router"
import styles from "./index.module.scss"
import clsx from "clsx"
import { BOTTOM_TABBAR_HEIGHT } from "@components/layout-with-bottom-tabs/constants"
import Not from "@icons/not.svg?react"

const getTabClasses = (isActive: boolean): string =>
  clsx(styles.tab, isActive && styles.tabActive)

type BottomTabBarProps = {
  initialBottomInset: number
}

export const BottomTabBar = ({
  initialBottomInset,
}: BottomTabBarProps): JSX.Element => {
  const tgWebApp = window.Telegram.WebApp
  const offset = BOTTOM_TABBAR_HEIGHT + initialBottomInset
  const user = tgWebApp.initDataUnsafe.user
  const userPp = user?.photo_url
  const firstName = user?.first_name

  return (
    <nav
      className={styles.bottomTabbar}
      aria-label="Main navigation"
      style={{ height: offset }}
    >
      <NavLink to="/" className={({ isActive }) => getTabClasses(isActive)} end>
        <Not />
        <span className={styles.label}>Store</span>
      </NavLink>

      <NavLink to="/user" className={({ isActive }) => getTabClasses(isActive)}>
        <img
          src={userPp}
          alt={firstName}
          className={styles.itemImage}
          loading="lazy"
        />
        <span className={styles.label}>{firstName ?? "User"}</span>
      </NavLink>
    </nav>
  )
}
