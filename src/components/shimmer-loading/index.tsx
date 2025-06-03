import type { JSX } from "react"
import styles from "./styles/index.module.scss"
import Shimmer from "@icons/shimmer.svg?react"

export const ShimmerLoading = (): JSX.Element => {
  return (
    <div className={styles.status}>
      <Shimmer />
    </div>
  )
}
