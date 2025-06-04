import type React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperClass } from "swiper"
import styles from "./index.module.scss"

type ProductImageSwiperProps = {
  images: string[]
  setSelectedIndex: (index: number) => void
  swiperRef: React.RefObject<SwiperClass | null>
}

export const ProductImageSwiper: React.FC<ProductImageSwiperProps> = ({
  images,
  setSelectedIndex,
  swiperRef,
}) => {
  return (
    <div className={styles.mainImageWrapper}>
      <Swiper
        onSwiper={swiper => {
          swiperRef.current = swiper
        }}
        onSlideChange={swiper => {
          setSelectedIndex(swiper.activeIndex)
        }}
        slidesPerView={1}
        spaceBetween={0}
        className={styles.mainImageSwiper}
      >
        {images.map((url, i) => (
          <SwiperSlide key={i}>
            <img
              src={url}
              alt={`product-${i.toString()}`}
              className={styles.mainImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
