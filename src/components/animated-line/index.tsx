import type React from "react"
import styles from "./styles/index.module.scss"

export const AnimatedLine: React.FC = () => (
  <svg
    width="200"
    height="100"
    viewBox="0 0 184 106"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 98L58.7661 35.4064L123.193 69.0137L178 6"
      stroke="#e0e0e0"
      strokeWidth="12"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 98L58.7661 35.4064L123.193 69.0137L178 6"
      stroke="white"
      strokeWidth="12"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.5"
      className={styles.animatedStroke}
    />
  </svg>
)
