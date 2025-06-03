import type { JSX } from "react"
import styles from "./styles/index.module.scss"
import Recharge from "@icons/recharge.svg?react"

export const RechargeLoading = (): JSX.Element => {
  return (
    <div className={styles.status}>
      <Recharge />
    </div>
  )
}
