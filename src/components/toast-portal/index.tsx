import { createPortal } from "react-dom"
import { Toaster } from "react-hot-toast"

export const ToastPortal = () => {
  return createPortal(
    <Toaster
      position="top-center"
      toastOptions={{ duration: 2000 }}
      containerStyle={{ zIndex: 3001 }}
    />,
    document.body,
  )
}
