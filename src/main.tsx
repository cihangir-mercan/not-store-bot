import "./index.scss"
import "swiper/scss"
import "swiper/scss/pagination"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import { Provider } from "react-redux"
import { App } from "./App"
import { store } from "./app/store"
import "./i18n"
import type { Telegram } from "@twa-dev/types"
import { TonConnectUIProvider } from "@tonconnect/ui-react"
import { Toaster } from "react-hot-toast"

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    Telegram: Telegram
  }
}

const manifestUrl = "https://not-store-bot.vercel.app/tonconnect-manifest.json"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <TonConnectUIProvider manifestUrl={manifestUrl}>
            <App />
            <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
          </TonConnectUIProvider>
        </Provider>
      </BrowserRouter>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
