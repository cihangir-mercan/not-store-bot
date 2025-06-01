import "./App.scss"
import { Routes, Route } from "react-router"
import { LayoutWithBottomTabs } from "@components/layout-with-bottom-tabs"
import { ProductPage } from "@pages/product-page"

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWithBottomTabs />} />
      <Route path="/user" element={<LayoutWithBottomTabs />} />
      <Route path="product/:productId" element={<ProductPage />} />
    </Routes>
  )
}
