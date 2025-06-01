// src/pages/product-page/index.tsx
import type React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useGetItemsQuery } from "@app/slices/itemsApiSlice";
import styles from "./styles/index.module.scss";
import {
  BASE_URL_FOR_SHARE,
  DEFAULT_FIXED_HEIGHT,
  DEFAULT_PADDING_BOTTOM,
} from "@pages/product-page/constants";
import { ThumbnailCarousel } from "@components/thumbnail-carousel";
import { ProductActions } from "@components/product-actions";
import Share from "@icons/share.svg?react";
import { TonConnectButton } from "@tonconnect/ui-react"

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { data } = useGetItemsQuery(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // “Hello World” popup'ını kontrol eden state
  const [isHelloPopupOpen, setIsHelloPopupOpen] = useState(false);

  const tgWeb = window.Telegram.WebApp;
  const bottomInset = tgWeb.safeAreaInset.bottom;
  const paddingBottom = DEFAULT_PADDING_BOTTOM + bottomInset;
  const fixedHeight = DEFAULT_FIXED_HEIGHT + bottomInset;

  useEffect(() => {
    tgWeb.BackButton.show();
    const onBackButton = () => {
      void navigate(-1);
    };
    tgWeb.BackButton.onClick(onBackButton);
    return () => {
      tgWeb.BackButton.hide();
      tgWeb.BackButton.offClick(onBackButton);
    };
  }, [navigate, tgWeb.BackButton]);

  const product = data?.data.find((p) => p.id === Number(productId));
  if (!product) return <div className={styles.status}>Product not found.</div>;

  const handleShare = () => {
    const link = `${BASE_URL_FOR_SHARE}${product.id.toString()}`;
    const text = `Check this product ${product.name}`;
    const telegramShareUrl =
      `https://t.me/share/url?` +
      `url=${encodeURIComponent(link)}` +
      `&text=${encodeURIComponent(text)}`;

    tgWeb.openLink(telegramShareUrl);
  };

  // “Buy Now” butonuna tıklandığında popup'ı açacak handler
  const handleBuyNow = () => {
    setIsHelloPopupOpen(true);
  };

  // Popup'ı kapatacak handler
  const closeHelloPopup = () => {
    setIsHelloPopupOpen(false);
  };

  return (
    <div className={styles.pageWrapper}>
      <div
        className={styles.nonScrollable}
        style={{ paddingBottom: fixedHeight }}
      >
        <div className={styles.topSection}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{product.name}</h1>
            <button
              className={styles.shareButton}
              onClick={handleShare}
              aria-label="Share this product"
            >
              <Share />
            </button>
          </div>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.tags}>
            <span className={styles.tag}>
              {product.price} {product.currency}
            </span>
            <span className={styles.tag}>{product.left} LEFT</span>
            {product.tags.fabric && (
              <span className={styles.tag}>{product.tags.fabric}</span>
            )}
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

      <div className={styles.fixedBottom} style={{ paddingBottom }}>
        <ThumbnailCarousel
          images={product.images}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />

        {/* “Buy Now” butonuna tıklandığında handleBuyNow çalışacak */}
        <ProductActions
          productId={Number(productId)}
          maxAllowed={product.left}
          onBuy={handleBuyNow}
        />
      </div>

      {/*
        Eğer isHelloPopupOpen true ise, aşağıdaki div′ler görüntülenir.
        - Arka plan: bezel (bulanık) + yarı saydam bir katman.
        - Ekranın ortasında büyük bir modal kutu.
      */}
      {isHelloPopupOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            /* Arka planı beyazın şeffaf hali + bulanıklaştırma */
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)", // Safari uyumluluğu için
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: "400px",
              background: "#ffffff",
              borderRadius: "20px",
              padding: "24px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Kapatma butonu (sağ üst köşe) */}
            <button
              onClick={closeHelloPopup}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "transparent",
                border: "none",
                fontSize: "18px",
                lineHeight: 1,
                cursor: "pointer",
              }}
              aria-label="Close"
            >
              ×
            </button>

            {/* Başlık */}
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                color: "#111",
                marginBottom: "8px",
              }}
            >
              Connect your wallet
            </h2>

            <TonConnectButton />

            {/* Cüzdan ikonları satırı */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              {/* Aşağıda örnek ikonları “div” ile temsil ettim.
                  Gerçek projede bunları <img src="..."/> veya SVG <Icon/> olarak koyabilirsiniz. */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "12px", color: "#888" }}>Tonkeeper</span>
              </div>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "12px", color: "#888" }}>Tonhub</span>
              </div>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "12px", color: "#888" }}>Bitget</span>
              </div>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "12px", color: "#888" }}>MyWallet</span>
              </div>
            </div>

            {/* Alt bölümde “TON Connect” logosu ve küçük soru işareti */}
            <div
              style={{
                width: "100%",
                borderTop: "1px solid #eee",
                paddingTop: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {/* Buraya TON Connect logosunu koyabilirsiniz; şimdilik placeholder */}
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: "#e1f0ff",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#007AFF" }}>T</span>
                </div>
                <span style={{ fontSize: "14px", color: "#333" }}>
                  TON Connect
                </span>
              </div>

              <button
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "18px",
                  lineHeight: 1,
                  cursor: "pointer",
                  color: "#888",
                }}
                aria-label="Help"
              >
                ?
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
