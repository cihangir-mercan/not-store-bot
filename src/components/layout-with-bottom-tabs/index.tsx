import type { JSX } from "react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import styles from "./index.module.scss"
import { BOTTOM_TABBAR_HEIGHT } from "@components/layout-with-bottom-tabs/constants"
import { StorePage } from "@pages/store-page"
import { UserPage } from "@pages/user-page"
import { BottomTabBar } from "@components/bottom-tab-bar"
import { useAppSelector } from "@app/hooks.ts"
import { selectSearchInputFocused } from "@app/slices/uiSlice.ts"
import { isMobile } from "../../constants"

const KEYBOARD_CLOSE_DELAY_MS = 300

export const LayoutWithBottomTabs = (): JSX.Element => {
  const location = useLocation()
  const [initialBottomInset, setInitialBottomInset] = useState(0)
  const offset = BOTTOM_TABBAR_HEIGHT + initialBottomInset

  const isStore = location.pathname === "/"
  const isUser = location.pathname === "/user"
  const keyboardVisible = useAppSelector(selectSearchInputFocused)

  const [delayedKeyboardVisible, setDelayedKeyboardVisible] =
    useState(keyboardVisible)

  useEffect(() => {
    const tgWebApp = window.Telegram.WebApp
    const bottomInset = tgWebApp.safeAreaInset.bottom
    setInitialBottomInset(bottomInset)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setDelayedKeyboardVisible(false)
      return
    }

    let timeout: NodeJS.Timeout

    if (keyboardVisible) {
      setDelayedKeyboardVisible(true)
    } else {
      timeout = setTimeout(() => {
        setDelayedKeyboardVisible(false)
      }, KEYBOARD_CLOSE_DELAY_MS)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [keyboardVisible])

  return (
    <div
      id="layout-root"
      className={styles.appContainer}
      style={{
        paddingBottom: delayedKeyboardVisible ? 0 : offset,
      }}
    >
      <div className={styles.content}>
        <div
          className={styles.tabContent}
          data-active={isStore}
          inert={!isStore}
        >
          <StorePage />
        </div>
        <div
          className={styles.tabContent}
          data-active={isUser}
          inert={!isUser}
        >
          <UserPage />
        </div>
      </div>

      {!delayedKeyboardVisible && (
        <BottomTabBar initialBottomInset={initialBottomInset} />
      )}
    </div>
  )
}
