import type React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import clsx from "clsx"
import styles from "./styles/index.module.scss"

type ThumbnailCarouselProps = {
  images: string[]
  selectedIndex: number
  onSelect: (index: number) => void
}

export const ThumbnailCarousel: React.FC<ThumbnailCarouselProps> = ({
  images,
  selectedIndex,
  onSelect,
}) => {
  return (
    <Swiper
      spaceBetween={8}
      slidesPerView="auto"
      className={styles.thumbnailSwiper}
    >
      {images.map((img, i) => (
        <SwiperSlide key={i} className={styles.thumbnailSlide}>
          <img
            src={img}
            alt={`thumb-${i.toString()}`}
            onClick={() => {
              onSelect(i)
            }}
            className={clsx(
              styles.thumbnail,
              selectedIndex === i && styles.active,
            )}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
