import type React from "react";
import { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import clsx from "clsx"
import styles from "./styles/index.module.scss"
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
  swiperRef
}) => {
  const thumbSwiperRef = useRef<SwiperClass | null>(null)

  useEffect(() => {
    if (thumbSwiperRef.current) {
      thumbSwiperRef.current.slideTo(selectedIndex)
    }
  }, [selectedIndex])

  return (
    <Swiper
      spaceBetween={8}
      slidesPerView="auto"
      className={styles.thumbnailSwiper}
      onSwiper={(swiper) => { thumbSwiperRef.current = swiper }}
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
