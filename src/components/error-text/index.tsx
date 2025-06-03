import type { JSX } from "react"
import styles from "./styles/index.module.scss"
import { useTranslation } from "react-i18next"

type ErrorTextProps = {
  fullHeight?: boolean
}

export const ErrorText = ({ fullHeight }: ErrorTextProps): JSX.Element => {
  const { t } = useTranslation()

  return (
    <div
      className={styles.status}
      style={fullHeight ? { height: "var(--tg-viewport-height)" } : undefined}
    >
      {t("storePage.error")}
    </div>
  )
}
