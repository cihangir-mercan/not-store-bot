import type React from "react";
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useGetItemsQuery } from "@app/slices/itemsApiSlice"
import styles from "./styles/index.module.scss"
import { Swiper, SwiperSlide } from "swiper/react"
import { DEFAULT_FIXED_HEIGHT, DEFAULT_PADDING_BOTTOM } from "@pages/product-page/constants"

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const { data } = useGetItemsQuery(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const tgWeb = window.Telegram.WebApp
  const bottomInset = tgWeb.safeAreaInset.bottom
  const paddingBottom = DEFAULT_PADDING_BOTTOM + bottomInset;
  const fixedHeight = DEFAULT_FIXED_HEIGHT;

  useEffect(() => {
    tgWeb.BackButton.show()

    const onBackButton = () => { void navigate(-1) }

    tgWeb.BackButton.onClick(onBackButton)
    return () => {
      tgWeb.BackButton.hide()
      tgWeb.BackButton.offClick(onBackButton)
    }
  }, [navigate, tgWeb.BackButton])

  const product = data?.data.find(p => p.id === Number(productId))
  if (!product) return <div className={styles.status}>Product not found.</div>

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.nonScrollable}
           style={{paddingBottom: fixedHeight}}
      >
        <div className={styles.topSection}>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.tags}>
            <span className={styles.tag}>{product.price} {product.currency}</span>
            <span className={styles.tag}>{product.left} LEFT</span>
            {
              product.tags.fabric &&
              <span className={styles.tag}>{product.tags.fabric}</span>
            }

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

      <div className={styles.fixedBottom}
           style={{ paddingBottom }}
      >
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          className={styles.thumbnailSwiper}
        >
          {product.images.map((img, i) => (
            <SwiperSlide key={i} className={styles.thumbnailSlide}>
              <img
                src={img}
                alt={`thumb-${i.toString()}`}
                onClick={() => { setSelectedIndex(i); }}
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
