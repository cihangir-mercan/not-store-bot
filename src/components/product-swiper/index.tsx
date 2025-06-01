import type { FC } from "react"
import { Link } from "react-router"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import styles from "./styles/index.module.scss"

type ProductSwiperProps = {
  images: string[]
  linkTo: string
  altText?: string
}

export const ProductSwiper: FC<ProductSwiperProps> = ({
  images,
  linkTo,
  altText = "",
}) => (
  <Link to={linkTo} className={styles.imageLink}>
    <div className={styles.imageWrapper}>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        className={styles.swiper}
      >
        {images.map((url, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={url}
              alt={altText}
              className={styles.productImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </Link>
)
