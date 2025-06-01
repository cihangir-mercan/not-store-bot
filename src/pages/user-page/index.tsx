import { useRef, type JSX } from "react";
import { useGetHistoryQuery } from "@app/slices/historyApiSlice";
import { useGetItemsQuery } from "@app/slices/itemsApiSlice";
import { UserHistoryList } from "@components/user-history-list"
import { useScrollRestoreForList } from "./hooks/useScrollRestoreForList.tsx"

type UserPageProps = {
  isActiveTab: boolean;
};

export const UserPage = ({ isActiveTab }: UserPageProps): JSX.Element => {
  const { data: historyData, isLoading: isHistoryLoading } = useGetHistoryQuery(null);
  const { data: itemsData, isLoading: isItemsLoading } = useGetItemsQuery(null);

  const listRef = useRef(null);
  const history = [...(historyData?.data ?? [])];
  const items = itemsData?.data ?? [];
  const itemMap = new Map(items.map(item => [item.id, item]));

  // Hook returns onScroll handler bound to react-window list and scroll storage
  const onScroll = useScrollRestoreForList(
    "user-history",
    isActiveTab,
    listRef,
  );

  if (isHistoryLoading || isItemsLoading) return <div>Loading…</div>;

  return (
    <UserHistoryList
      history={history}
      itemMap={itemMap}
      isActiveTab={isActiveTab}
      onScroll={onScroll}
      listRef={listRef}
    />
  );
};
