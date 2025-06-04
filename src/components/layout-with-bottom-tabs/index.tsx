import { JSX, useEffect, useState } from "react"
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
  const [initialBottomInset, setInitialBottomInset] = useState(0);
  const offset = BOTTOM_TABBAR_HEIGHT + initialBottomInset

  const isStore = location.pathname === "/"
  const isUser = location.pathname === "/user"
  const keyboardVisible = useAppSelector(selectSearchInputFocused)

  useEffect(() => {
    const tgWebApp = window.Telegram.WebApp
    const bottomInset = tgWebApp.safeAreaInset.bottom
    setInitialBottomInset(bottomInset);
  }, [])

  return (
    <div className={styles.appContainer} style={{ paddingBottom: offset }}>
      <div className={styles.content}>
        <p>initialBottomInset: {initialBottomInset}</p>
        <p>keyboardVisible: {keyboardVisible}</p>
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
