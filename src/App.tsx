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

    if (param?.startsWith("product_")) {
      const trimmed = param.split("_")[1];

      // 2 saniye sonra navigasyonu gerçekleştir
      const timeoutId = setTimeout(() => {
        void navigate(`/product/${trimmed}`, { replace: true, state: { fromStart: true } });
      }, 200);

      // Cleanup: component unmount olduğunda timeout'ı temizle
      return () => { clearTimeout(timeoutId); };
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
