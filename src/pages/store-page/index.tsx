// src/pages/StorePage.tsx
import type { JSX } from "react";
import { useState } from "react";
import styles from "./styles/index.module.scss";
import { Link } from "react-router";
import { StoreHeader } from "@components/store-header";
import { CartDrawer } from "@components/cart-drawer";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";

import { useGetItemsQuery } from "@app/slices/itemsApiSlice";
import type { ProductItem } from "@app/slices/itemsApiSlice";

export const StorePage = (): JSX.Element => {
  const [cartOpen, setCartOpen] = useState(false);
  const { data: apiResponse, isLoading, isError } = useGetItemsQuery(null);
  const items: ProductItem[] = apiResponse?.data ?? [];

  return (
    <div className={styles.storeContainer}>
      <StoreHeader setCartOpen={setCartOpen} />

      <div className={styles.links}>
        {isLoading && <div className={styles.status}>Loading…</div>}
        {isError && <div className={styles.status}>Error loading products.</div>}

        {!isLoading && !isError && (
          <div className={styles.productsGrid}>
            {items.length}
            {/*{items.map((item) => (*/}
            {/*  <div key={item.id} className={styles.productCard}>*/}
            {/*    <div className={styles.imageWrapper}>*/}
            {/*      <Swiper*/}
            {/*        modules={[Pagination]}*/}
            {/*        pagination={{ clickable: true }}*/}
            {/*        spaceBetween={0}*/}
            {/*        slidesPerView={1}*/}
            {/*        className={styles.swiper}*/}
            {/*      >*/}
            {/*        {item.images.map((url, idx) => (*/}
            {/*          <SwiperSlide key={idx}>*/}
            {/*            <img*/}
            {/*              src={url}*/}
            {/*              alt={item.name}*/}
            {/*              className={styles.productImage}*/}
            {/*            />*/}
            {/*          </SwiperSlide>*/}
            {/*        ))}*/}
            {/*      </Swiper>*/}
            {/*    </div>*/}

            {/*    <Link*/}
            {/*      to={`/product/${item.category}/${item.id.toString()}`}*/}
            {/*      className={styles.productLink}*/}
            {/*    >*/}
            {/*      {item.name}*/}
            {/*    </Link>*/}
            {/*    <p className={styles.price}>*/}
            {/*      {item.price} <span className={styles.currency}>{item.currency}</span>*/}
            {/*    </p>*/}
            {/*  </div>*/}
            {/*))}*/}
          </div>
        )}
      </div>

      <CartDrawer cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </div>
  );
};
