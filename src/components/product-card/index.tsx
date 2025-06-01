import type { FC } from "react";
import { Link } from "react-router";
import type { ProductItem } from "@app/slices/itemsApiSlice";
import styles from "./styles/index.module.scss";
import { ProductSwiper } from "@components/product-swiper"

type ProductCardProps = {
  item: ProductItem;
}

export const ProductCard: FC<ProductCardProps> = ({ item }) => {
  const productUrl = `/product/${item.id.toString()}`;

  return (
    <div className={styles.productCard}>
      <ProductSwiper images={item.images} linkTo={productUrl} altText={item.name} />

      <Link to={productUrl} className={styles.productLink}>
        {item.name}
      </Link>

      <p className={styles.price}>
        {item.price} <span className={styles.currency}>{item.currency}</span>
      </p>
    </div>
  );
};
