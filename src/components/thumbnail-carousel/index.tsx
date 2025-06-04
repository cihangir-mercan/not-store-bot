import type React from "react"
import { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import clsx from "clsx"
import styles from "./index.module.scss"
import type { Swiper as SwiperClass } from "swiper"

type ThumbnailCarouselProps = {
  images: string[]
  selectedIndex: number
  onSelect: (index: number) => void
  swiperRef?: React.RefObject<SwiperClass | null>
}

export const ThumbnailCarousel: React.FC<ThumbnailCarouselProps> = ({
  images,
  selectedIndex,
  onSelect,
  swiperRef,
}) => {
  const thumbSwiperRef = useRef<SwiperClass | null>(null)

  useEffect(() => {
    const swiper = thumbSwiperRef.current
    if (!swiper) return

    const visibleCount =
      swiper.params.slidesPerView === "auto"
        ? Math.floor(swiper.width / swiper.slides[0].clientWidth)
        : (swiper.params.slidesPerView ?? 1)

    const scrollIndex = Math.max(0, selectedIndex - visibleCount + 1)
    swiper.slideTo(scrollIndex)
  }, [selectedIndex])

  return (
    <Swiper
      spaceBetween={8}
      slidesPerView="auto"
      className={styles.thumbnailSwiper}
      onSwiper={swiper => {
        thumbSwiperRef.current = swiper
      }}
    >
      {images.map((img, i) => (
        <SwiperSlide key={i} className={styles.thumbnailSlide}>
          <img
            src={img}
            alt={`thumb-${i.toString()}`}
            onClick={() => {
              onSelect(i)
              swiperRef?.current?.slideTo(i)
              thumbSwiperRef.current?.slideTo(i)
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
