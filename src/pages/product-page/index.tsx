import type React from "react"
import { useRef, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useGetItemsQuery } from "@app/slices/itemsApiSlice"
import styles from "./styles/index.module.scss"
import {
  BASE_URL_FOR_SHARE,
  DEFAULT_FIXED_HEIGHT,
  DEFAULT_PADDING_BOTTOM,
} from "./constants"
import { ThumbnailCarousel } from "@components/thumbnail-carousel"
import { ProductActions } from "@components/product-actions"
import Share from "@icons/share.svg?react"
import type { Swiper as SwiperClass } from "swiper"
import { ProductImageSwiper } from "@components/product-image-swiper"
import { ShimmerLoading } from "@components/shimmer-loading"
import { ErrorText } from "@components/error-text"

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetItemsQuery(null)

  const [selectedIndex, setSelectedIndex] = useState(0)
  const swiperRef = useRef<SwiperClass | null>(null)

  const tgWeb = window.Telegram.WebApp
  useEffect(() => {
    tgWeb.BackButton.show()
    const onBackButton = () => void navigate(-1)
    tgWeb.BackButton.onClick(onBackButton)
    return () => {
      tgWeb.BackButton.hide()
      tgWeb.BackButton.offClick(onBackButton)
    }
  }, [navigate, tgWeb.BackButton])

  if (isLoading) return <ShimmerLoading />
  if (isError) return <ErrorText />

  const product = data?.data.find(p => p.id === Number(productId))
  if (!product) return <div className={styles.status}>Product not found.</div>

  const feature: string = product.tags.fabric.split(" ")[1] || ""

  const handleShare = () => {
    const link = `${BASE_URL_FOR_SHARE}${product.id.toString()}`
    const text = `Check this product ${product.name}`
    const telegramShareUrl =
      `https://t.me/share/url?` +
      `url=${encodeURIComponent(link)}` +
      `&text=${encodeURIComponent(text)}`
    tgWeb.openLink(telegramShareUrl)
  }

  const bottomInset = tgWeb.safeAreaInset.bottom
  const paddingBottom = DEFAULT_PADDING_BOTTOM + bottomInset
  const fixedHeight = DEFAULT_FIXED_HEIGHT + bottomInset

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
              <span className={styles.tagLeft}>{product.price}</span>
              <span className={styles.tagRight}>{product.currency}</span>
            </span>
            <span className={styles.tag}>
              <span className={styles.tagLeft}>{product.left}</span>
              <span className={styles.tagRight}>LEFT</span>
            </span>
            {!!feature && (
              <span className={styles.tag}>
                <span className={styles.tagLeft}>100%</span>
                <span className={styles.tagRight}>{feature.toUpperCase()}</span>
              </span>
            )}
          </div>
        </div>

        <ProductImageSwiper
          images={product.images}
          setSelectedIndex={setSelectedIndex}
          swiperRef={swiperRef}
        />
      </div>

      <div className={styles.fixedBottom} style={{ paddingBottom }}>
        <ThumbnailCarousel
          images={product.images}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          swiperRef={swiperRef}
        />

        <ProductActions
          productId={Number(productId)}
          maxAllowed={product.left}
        />
      </div>
    </div>
  )
}
