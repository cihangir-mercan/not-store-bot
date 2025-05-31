import "./App.scss"
import { Routes, Route } from "react-router"
import { StorePage } from "@pages/store-page"
import { UserPage } from "@pages/user-page"
import { LayoutWithBottomTabs } from "@components/layout-with-bottom-tabs"
import { useEffect } from "react"

export const App = () => {
  const tgWebApp = window.Telegram.WebApp;

  useEffect(() => {
    tgWebApp.expand();
  }, [])

  return (
    <Routes>
      <Route path="/" element={<LayoutWithBottomTabs />}>
        <Route index element={<StorePage />} />
        <Route path="user" element={<UserPage />} />
      </Route>
    </Routes>
  )
}
