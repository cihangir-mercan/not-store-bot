import { useEffect, useState } from "react"
import type { JSX } from "react"
import styles from "./index.module.scss"
import { useTranslation } from "react-i18next"
import type { WebApp } from "@twa-dev/types"

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
    setTg(tg);
  }, [])

  return (
    <div>
      <div>{t("storePage.title")}</div>
      <div>
        Current Theme : <strong>{JSON.stringify(theme)}</strong>
      </div>
      <div>
        Current Telegram : <strong>{JSON.stringify(tg)}</strong>
      </div>
      <div className={styles.links}>
        <span>Learn </span>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </a>
        <span>, </span>
        <a
          className="App-link"
          href="https://redux.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Redux
        </a>
        <span>, </span>
        <a
          className="App-link"
          href="https://redux-toolkit.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Redux Toolkit
        </a>
        <span>, </span>
        <a
          className="App-link"
          href="https://react-redux.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React Redux
        </a>
        ,<span> and </span>
        <a
          className="App-link"
          href="https://reselect.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reselect
        </a>
      </div>
    </div>
  )
}
