import type { JSX } from "react"
import styles from "./index.module.scss"
import Recharge from "@icons/recharge.svg?react"

type RechargeLoadingProps = {
  fullHeight?: boolean
}

export const RechargeLoading = ({
  fullHeight,
}: RechargeLoadingProps): JSX.Element => {
  return (
    <div
      className={styles.status}
      style={fullHeight ? { height: "var(--tg-viewport-height)" } : undefined}
    >
      <Recharge />
    </div>
  )
}
