import type { JSX } from "react"
import styles from "./styles/index.module.scss"
import { AnimatedLine } from "@components/animated-line"

export const ShimmerLoading = (): JSX.Element => {
  return (
    <div className={styles.status}>
      <AnimatedLine />
    </div>
  )
}
