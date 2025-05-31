import { useEffect, useState } from "react";
import type { JSX } from "react";
import styles from "./index.module.scss";

type TelegramWebApp = {
  colorScheme: "light" | "dark";
  themeParams: Record<string, string>;
  onEvent: (eventType: "themeChanged", callback: () => void) => void;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export const StorePage = (): JSX.Element => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      setTheme(tg.colorScheme);
      tg.onEvent("themeChanged", () => {
        setTheme(tg.colorScheme);
      });
    }
  }, []);

  return (
    <div>
      <div>Hello Store</div>
      <div>Current Telegram Theme: <strong>{theme ?? "Unknown"}</strong></div>
      <div className={styles.links}>
        <span>Learn </span>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React</a>
        <span>, </span>
        <a className="App-link" href="https://redux.js.org" target="_blank" rel="noopener noreferrer">Redux</a>
        <span>, </span>
        <a className="App-link" href="https://redux-toolkit.js.org" target="_blank" rel="noopener noreferrer">Redux Toolkit</a>
        <span>, </span>
        <a className="App-link" href="https://react-redux.js.org" target="_blank" rel="noopener noreferrer">React Redux</a>
        ,<span> and </span>
        <a className="App-link" href="https://reselect.js.org" target="_blank" rel="noopener noreferrer">Reselect</a>
      </div>
    </div>
  );
};
