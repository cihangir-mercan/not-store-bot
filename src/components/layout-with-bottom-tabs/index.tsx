import type { JSX } from "react"
import { useLocation } from "react-router"
import styles from "./styles/index.module.scss"
import { BOTTOM_TABBAR_HEIGHT } from "@components/layout-with-bottom-tabs/constants"
import { StorePage } from "@pages/store-page"
import { UserPage } from "@pages/user-page"
import { BottomTabBar } from "@components/bottom-tab-bar"

export const LayoutWithBottomTabs = (): JSX.Element => {
  const location = useLocation()
  const tgWebApp = window.Telegram.WebApp
  const bottomInset = tgWebApp.safeAreaInset.bottom
  const offset = BOTTOM_TABBAR_HEIGHT + bottomInset

  const isStore = location.pathname === "/"
  const isUser = location.pathname === "/user"

  return (
    <div className={styles.appContainer} style={{ paddingBottom: offset }}>
      <div className={styles.content}>
        <p>offset: {offset}</p>
        <div className={styles.tabContent} data-active={isStore}>
          <StorePage />
        </div>
        <div className={styles.tabContent} data-active={isUser}>
          <UserPage />
        </div>
      </div>

      <BottomTabBar />
    </div>
  )
}
