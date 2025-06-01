import type React from "react";
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useGetItemsQuery } from "@app/slices/itemsApiSlice"
import styles from "./styles/index.module.scss"
import { Swiper, SwiperSlide } from "swiper/react"

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const { data } = useGetItemsQuery(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const tgWeb = window.Telegram.WebApp
    tgWeb.BackButton.show()

    const onBackButton = () => { void navigate(-1) }

    tgWeb.BackButton.onClick(onBackButton)
    return () => {
      tgWeb.BackButton.hide()
      tgWeb.BackButton.offClick(onBackButton)
    }
  }, [navigate])

  const product = data?.data.find(p => p.id === Number(productId))
  if (!product) return <div className={styles.status}>Product not found.</div>

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.scrollable}>
        <div className={styles.topSection}>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.tags}>
            <span>{product.price} {product.currency}</span>
            <span>{product.left} LEFT</span>
            <span>{product.tags?.material ?? "UNKNOWN"}</span>
          </div>
        </div>

        <div className={styles.mainImageWrapper}>
          <img
            src={product.images[selectedIndex]}
            alt={`product-${selectedIndex}`}
            className={styles.mainImage}
          />
        </div>
      </div>

      <div className={styles.fixedBottom}>
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          className={styles.thumbnailSwiper}
        >
          {product.images.map((img, i) => (
            <SwiperSlide key={i} className={styles.thumbnailSlide}>
              <img
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setSelectedIndex(i)}
                className={`${styles.thumbnail} ${selectedIndex === i ? styles.active : ""}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.actions}>
          <button className={styles.addToCart}>Add to cart</button>
          <button className={styles.buyNow}>Buy now</button>
        </div>
      </div>
    </div>
  )
}
