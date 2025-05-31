import type { JSX } from "react"
import styles from "./index.module.scss"
import { Counter } from "@components/counter"

export const UserPage = (): JSX.Element => {
  return (
    <div>
      <div className={styles.user}>Hello User</div>
      <Counter />
    </div>
  )
}
