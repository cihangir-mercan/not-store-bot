// src/pages/product-page/index.tsx
import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useGetItemsQuery } from "@app/slices/itemsApiSlice"
import styles from "./styles/index.module.scss"
import {
  BASE_URL_FOR_SHARE,
  DEFAULT_FIXED_HEIGHT,
  DEFAULT_PADDING_BOTTOM,
} from "@pages/product-page/constants"
import { ThumbnailCarousel } from "@components/thumbnail-carousel"
import { ProductActions } from "@components/product-actions"
import Share from "@icons/share.svg?react"
import { WalletModal } from "@components/wallet-modal"

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const { data } = useGetItemsQuery(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // 2) Modal’ın açık/kapalı durumunu tutan state
  const [isHelloPopupOpen, setIsHelloPopupOpen] = useState(false)

  // Telegram WebApp back button logic
  const tgWeb = window.Telegram.WebApp
  const bottomInset = tgWeb.safeAreaInset.bottom
  const paddingBottom = DEFAULT_PADDING_BOTTOM + bottomInset
  const fixedHeight = DEFAULT_FIXED_HEIGHT + bottomInset

  useEffect(() => {
    tgWeb.BackButton.show()
    const onBackButton = () => {
      void navigate(-1)
    }
    tgWeb.BackButton.onClick(onBackButton)
    return () => {
      tgWeb.BackButton.hide()
      tgWeb.BackButton.offClick(onBackButton)
    }
  }, [navigate, tgWeb.BackButton])

  const product = data?.data.find(p => p.id === Number(productId))
  if (!product) return <div className={styles.status}>Product not found.</div>

  const handleShare = () => {
    const link = `${BASE_URL_FOR_SHARE}${product.id.toString()}`
    const text = `Check this product ${product.name}`
    const telegramShareUrl =
      `https://t.me/share/url?` +
      `url=${encodeURIComponent(link)}` +
      `&text=${encodeURIComponent(text)}`

    tgWeb.openLink(telegramShareUrl)
  }

  const handleBuyNow = () => {
    setIsHelloPopupOpen(true)
  }

  const closeHelloPopup = () => {
    setIsHelloPopupOpen(false)
  }

  return (
    <div className={styles.pageWrapper}>
      <div
        className={styles.nonScrollable}
        style={{ paddingBottom: fixedHeight }}
      >
        <div className={styles.topSection}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{product.name}</h1>
            <button
              className={styles.shareButton}
              onClick={handleShare}
              aria-label="Share this product"
            >
              <Share />
            </button>
          </div>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.tags}>
            <span className={styles.tag}>
              {product.price} {product.currency}
            </span>
            <span className={styles.tag}>{product.left} LEFT</span>
            {product.tags.fabric && (
              <span className={styles.tag}>{product.tags.fabric}</span>
            )}
          </div>
        </div>

        <div className={styles.mainImageWrapper}>
          <img
            src={product.images[selectedIndex]}
            alt={`product-${selectedIndex.toString()}`}
            className={styles.mainImage}
          />
        </div>
      </div>

      <div className={styles.fixedBottom} style={{ paddingBottom }}>
        <ThumbnailCarousel
          images={product.images}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />

        {/* “Buy Now” butonuna tıklandığında handleBuyNow çalışacak */}
        <ProductActions
          productId={Number(productId)}
          maxAllowed={product.left}
          onBuy={handleBuyNow}
        />
      </div>

      {/* 5) WalletModal bileşeni: isOpen ve onClose props’larıyla */}
      <WalletModal isOpen={isHelloPopupOpen} onClose={closeHelloPopup} />
    </div>
  )
}
