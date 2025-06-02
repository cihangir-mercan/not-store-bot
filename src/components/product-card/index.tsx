import type { FC } from "react"
import { Link } from "react-router"
import type { ProductItem } from "@app/slices/itemsApiSlice"
import styles from "./styles/index.module.scss"
import { ProductSwiper } from "@components/product-swiper"
import Check from "@icons/check.svg?react"
import { useAppSelector } from "@app/hooks.ts"
import { selectQuantityById } from "@app/slices/cartSlice.ts"

type ProductCardProps = {
  item: ProductItem
}

export const ProductCard: FC<ProductCardProps> = ({ item }) => {
  const productUrl = `/product/${item.id.toString()}`
  const quantity = useAppSelector(state => selectQuantityById(state)(item.id))

  return (
    <div className={styles.productCard}>
      <div className={styles.imageWrapper}>
        <ProductSwiper
          images={item.images}
          linkTo={productUrl}
          altText={item.name}
        />
        {quantity > 0 && (
          <div className={styles.tick}>
            <Check />
          </div>
        )}
      </div>

      <Link to={productUrl} className={styles.productLink}>
        {item.name}
      </Link>

      <div className={styles.priceWrapper}>
        <span className={styles.price}>
          {item.price}
        </span>
        <span className={styles.currency}>{item.currency}</span>
      </div>
    </div>
  )
}
