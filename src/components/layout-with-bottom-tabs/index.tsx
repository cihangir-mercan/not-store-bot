import type { JSX } from "react"
import { useLocation } from "react-router"
import styles from "./styles/index.module.scss"
import { BOTTOM_TABBAR_HEIGHT } from "@components/layout-with-bottom-tabs/constants"
import { StorePage } from "@pages/store-page"
import { UserPage } from "@pages/user-page"
import { useScrollRestoreOnActive } from "@components/layout-with-bottom-tabs/hooks/useScrollRestoreOnActive.tsx"
import { BottomTabBar } from "@components/bottom-tab-bar"

export const LayoutWithBottomTabs = (): JSX.Element => {
  const location = useLocation()
  const tgWebApp = window.Telegram.WebApp
  const bottomInset = tgWebApp.safeAreaInset.bottom;
  const offset = BOTTOM_TABBAR_HEIGHT + bottomInset

  const isStore = location.pathname === "/"
  const isUser = location.pathname === "/user"

  useScrollRestoreOnActive("store-scroll", isStore, "/")
  useScrollRestoreOnActive("user-scroll", isUser, "/user")

  return (
    <div className={styles.appContainer} style={{ paddingBottom: offset }}>
      <div className={styles.content}>
        <div
          id="store-scroll"
          className={styles.tabContent}
          data-active={isStore}
        >
          <StorePage isStoreActive={isStore} />
        </div>
        <div
          id="user-scroll"
          className={styles.tabContent}
          data-active={isUser}
        >
          <UserPage />
        </div>
      </div>

      <BottomTabBar />
    </div>
  )
}
