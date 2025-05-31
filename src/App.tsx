import "./App.scss"
import { Routes, Route } from "react-router"
import { LayoutWithBottomTabs } from "@components/layout-with-bottom-tabs"
import { StorePage } from "@pages/store-page"
import { UserPage } from "@pages/user-page"
import { ProductPage } from "@pages/product-page"

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWithBottomTabs />}>
        <Route index element={<StorePage />} />
        <Route path="user" element={<UserPage />} />
      </Route>

      <Route path="product/:productId" element={<ProductPage />} />

      {/*<Route path="*" element={<NoMatch />} />*/}
    </Routes>
  )
}
