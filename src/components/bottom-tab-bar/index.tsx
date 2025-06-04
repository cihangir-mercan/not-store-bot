import type { JSX } from "react"
import { useEffect, useState } from "react"
import { NavLink } from "react-router"
import styles from "./styles/index.module.scss"
import clsx from "clsx"
import { BOTTOM_TABBAR_HEIGHT } from "@components/layout-with-bottom-tabs/constants"
import Not from "@icons/not.svg?react"

const getTabClasses = (isActive: boolean): string =>
  clsx(styles.tab, isActive && styles.tabActive)

export const BottomTabBar = (): JSX.Element | null => {
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    const onResize = () => {
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight
      const isVisible =
        window.innerHeight > 0 && viewportHeight < window.innerHeight - 100
      setKeyboardVisible(isVisible)
    }

    window.visualViewport?.addEventListener("resize", onResize)
    return () => {
      window.visualViewport?.removeEventListener("resize", onResize)
    }
  }, [])

  const tgWebApp = window.Telegram.WebApp
  const bottomInset = tgWebApp.safeAreaInset.bottom
  const offset = BOTTOM_TABBAR_HEIGHT + bottomInset
  const user = tgWebApp.initDataUnsafe.user
  const userPp = user?.photo_url
  const firstName = user?.first_name

  if (keyboardVisible) return null // hide entire tab bar

  return (
    <nav className={styles.bottomTabbar} style={{ height: offset }}>
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
