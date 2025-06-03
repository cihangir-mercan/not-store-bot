import type { JSX } from "react"
import styles from "./styles/index.module.scss"
import { useTranslation } from "react-i18next"

export const ErrorText = (): JSX.Element => {
  const { t } = useTranslation()

  return <div className={styles.status}>{t("storePage.error")}</div>
}
