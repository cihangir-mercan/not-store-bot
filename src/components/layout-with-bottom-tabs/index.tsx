import type { JSX } from "react"
import { useLocation } from "react-router"
import styles from "./styles/index.module.scss"
import { BOTTOM_TABBAR_HEIGHT } from "@components/layout-with-bottom-tabs/constants"
import { StorePage } from "@pages/store-page"
import { UserPage } from "@pages/user-page"
import { BottomTabBar } from "@components/bottom-tab-bar"
import { useAppSelector } from "@app/hooks.ts"
import { selectSearchInputFocused } from "@app/slices/uiSlice.ts"

export const LayoutWithBottomTabs = (): JSX.Element => {
  const location = useLocation()
  const tgWebApp = window.Telegram.WebApp
  const bottomInset = tgWebApp.safeAreaInset.bottom
  const offset = BOTTOM_TABBAR_HEIGHT + bottomInset
  const viewport = tgWebApp.viewportHeight

  const isStore = location.pathname === "/"
  const isUser = location.pathname === "/user"
  const keyboardVisible = useAppSelector(selectSearchInputFocused)

  return (
    <div className={styles.appContainer}
         style={{ paddingBottom: keyboardVisible ? 0 : offset }}
    >
      <div className={styles.content}>
        <div>bottomInset: {bottomInset}</div>
        <div>viewport: {viewport}</div>
        <div className={styles.tabContent} data-active={isStore}>
          <StorePage />
        </div>
        <div className={styles.tabContent} data-active={isUser}>
          <UserPage />
        </div>
      </div>

      <div
        style={{
          height: keyboardVisible ? 0 : offset,
          opacity: keyboardVisible ? 0 : 1,
          pointerEvents: keyboardVisible ? "none" : "auto",
          transition: "opacity 0.2s ease, height 0.2s ease"
        }}
      >
        <BottomTabBar />
      </div>
    </div>
  )
}
