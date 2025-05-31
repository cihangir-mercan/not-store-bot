import type { JSX } from "react"
import styles from './index.module.scss';

export const StorePage = (): JSX.Element => {

  return (
    <div>
      <div>Hello Store</div>
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
