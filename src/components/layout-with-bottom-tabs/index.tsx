import type { JSX } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styles from "./styles/index.module.scss";
import { BOTTOM_TABBAR_HEIGHT } from "@components/layout-with-bottom-tabs/constants";
import { StorePage } from "@pages/store-page";
import { UserPage } from "@pages/user-page";
import { BottomTabBar } from "@components/bottom-tab-bar";
import { useAppSelector } from "@app/hooks";
import { selectSearchInputFocused } from "@app/slices/uiSlice";

export const LayoutWithBottomTabs = (): JSX.Element => {
  const location = useLocation();
  const isStore = location.pathname === "/";
  const isUser = location.pathname === "/user";

  const keyboardVisible = useAppSelector(selectSearchInputFocused);

  const [bottomInset, setBottomInset] = useState(
    window.Telegram.WebApp.safeAreaInset.bottom
  );

  useEffect(() => {
    // Re-fetch bottom inset when keyboard visibility changes
    setBottomInset(window.Telegram.WebApp.safeAreaInset.bottom);
  }, [keyboardVisible]);

  const offset = BOTTOM_TABBAR_HEIGHT + bottomInset;

  return (
    <div
      className={styles.appContainer}
      style={{
        paddingBottom: keyboardVisible ? bottomInset : offset,
        transition: "padding-bottom 0.25s ease",
      }}
    >
      <p>bottom inset: {bottomInset}</p>
      <div className={styles.content}>
        <div className={styles.tabContent} data-active={isStore}>
          <StorePage />
        </div>
        <div className={styles.tabContent} data-active={isUser}>
          <UserPage />
        </div>
      </div>

      {!keyboardVisible && <BottomTabBar />}
    </div>
  );
};
