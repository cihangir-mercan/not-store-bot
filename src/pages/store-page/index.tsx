import { useEffect, useState } from "react"
import type { JSX } from "react"
import styles from "./styles/index.module.scss"
import { useTranslation } from "react-i18next"
import type { WebApp } from "@twa-dev/types"
import { Link } from "react-router"

export const StorePage = (): JSX.Element => {
  const { t } = useTranslation()
  const [tg, setTg] = useState<WebApp | null>(null)
  const [theme, setTheme] = useState<string | null>(null)

  useEffect(() => {
    const tg = window.Telegram.WebApp
    setTheme(tg.colorScheme)
    tg.onEvent("themeChanged", () => {
      setTheme(tg.colorScheme)
    })
    setTg(tg)
  }, [])

  return (
    <div>
      <div>{t("storePage.title")}</div>
      <div>
        Current Theme : <strong>{JSON.stringify(theme)}</strong>
      </div>
      <div className={styles.links}>
        <Link to="/product/hoodie" className={styles.productLink}>
          Hoodie
        </Link>

        <Link to="/product/tshirt" className={styles.productLink}>
          Tshirt
        </Link>

        <Link to="/product/cap" className={styles.productLink}>
          Cap
        </Link>
      </div>

      <div style={{ whiteSpace: "wrap", overflowWrap: "break-word" }}>
        Current Telegram : <strong>{JSON.stringify(tg)}</strong>
      </div>
    </div>
  )
}
