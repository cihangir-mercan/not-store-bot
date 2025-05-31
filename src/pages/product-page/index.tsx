import type React from "react"
import { useEffect } from "react"
import { useParams, useNavigate } from "react-router"

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    const tgWeb = window.Telegram.WebApp

    tgWeb.BackButton.show()

    const onBackButton = () => {
      void navigate(-1)
    }

    tgWeb.BackButton.onClick(onBackButton)

    return () => {
      tgWeb.BackButton.hide()
      tgWeb.BackButton.offClick(onBackButton)
    }
  }, [navigate])

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Product: {productId}</h1>
      <p>Details about the {productId} go here.</p>
    </div>
  )
}
