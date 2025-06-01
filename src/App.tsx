import "./App.scss"
import { Routes, Route, useNavigate } from "react-router"
import { LayoutWithBottomTabs } from "@components/layout-with-bottom-tabs"
import { ProductPage } from "@pages/product-page"
import { useEffect, useRef } from "react"

export const App = () => {
  const navigate = useNavigate()
  const didNavigateRef = useRef(false)

  useEffect(() => {
    const tg = window.Telegram.WebApp
    const param = tg.initDataUnsafe.start_param

    if (param?.startsWith("product_") && !didNavigateRef.current) {
      didNavigateRef.current = true

      const trimmed = param.split("_")[1]

      void navigate(`/product/${trimmed}`)

    }
    return
  }, [navigate])

  return (
    <Routes>
      <Route path="/" element={<LayoutWithBottomTabs />} />
      <Route path="/user" element={<LayoutWithBottomTabs />} />
      <Route path="product/:productId" element={<ProductPage />} />
    </Routes>
  )
}
