import "./App.scss"
import { Routes, Route, useNavigate } from "react-router"
import { LayoutWithBottomTabs } from "@components/layout-with-bottom-tabs"
import { ProductPage } from "@pages/product-page"
import { useEffect } from "react"

export const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const tg = window.Telegram.WebApp;

    const param = tg.initDataUnsafe.start_param;
    if (param) {
      void navigate(`/product/${param}`);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<LayoutWithBottomTabs />} />
      <Route path="/user" element={<LayoutWithBottomTabs />} />
      <Route path="product/:productId" element={<ProductPage />} />
    </Routes>
  )
}
