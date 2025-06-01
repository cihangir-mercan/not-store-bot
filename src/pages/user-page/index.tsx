import type { JSX } from "react";
import styles from "./styles/index.module.scss";
import { useGetHistoryQuery } from "@app/slices/historyApiSlice";
import { useGetItemsQuery } from "@app/slices/itemsApiSlice";
import dayjs from "dayjs";

type UserPageProps = {
  isActiveTab: boolean; // ← pass this from layout based on pathname === "/user"
};

export const UserPage = ({ isActiveTab }: UserPageProps): JSX.Element => {
  const { data: historyData, isLoading: isHistoryLoading } = useGetHistoryQuery(null);
  const { data: itemsData, isLoading: isItemsLoading } = useGetItemsQuery(null);

  if (isHistoryLoading || isItemsLoading) return <div className={styles.status}>Loading…</div>;

  const history = [...(historyData?.data ?? [])];
  const items = itemsData?.data ?? [];

  const itemMap = new Map(items.map((item) => [item.id, item]));

  return (
    <div className={styles.userPage}>
      <h2 className={styles.title}>History</h2>

      {history.map((purchase, index) => {
        const item = itemMap.get(purchase.id);
        if (!item) return null;

        return (
          <div className={styles.item} key={[purchase.id, purchase.timestamp, index].join("-")}>
            {isActiveTab ? (
              <img
                src={item.images[0]}
                alt={item.name}
                className={styles.itemImage}
                loading="lazy"
              />
            ) : (
              <div className={styles.placeholderImage} />
            )}
            <div className={styles.itemDetails}>
              <div className={styles.category}>{item.category}</div>
              <div className={styles.name}>{item.name}</div>
            </div>
            <div className={styles.itemMeta}>
              <div className={styles.date}>
                {dayjs(purchase.timestamp * 1000).format("DD MMM ’YY")}
              </div>
              <div className={styles.price}>
                {purchase.total} {purchase.currency}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
