import "./App.scss"
import { Routes, Route } from "react-router"
import { StorePage } from "@pages/store-page"
import { UserPage } from "@pages/user-page"
import { LayoutWithBottomTabs } from "@components/layout-with-bottom-tabs"

export const App = () => {

  return (
    <Routes>
      <Route path="/" element={<LayoutWithBottomTabs />}>
        <Route index element={<StorePage />} />
        <Route path="user" element={<UserPage />} />
      </Route>
    </Routes>
  )
}
