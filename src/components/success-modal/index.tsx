import type React from "react"
import ReactDOM from "react-dom"
import styles from "./styles/index.module.scss"
import confettiGif from "./confetti.gif" // <-- buraya ekledik

type SuccessModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <img
          className={styles.confetti}
          src={confettiGif}
          alt={"Confetti"}
        ></img>
        <h2 className={styles.title}>You Got It!</h2>
        <p className={styles.subtitle}>Your purchase is on the way</p>
        <button className={styles.closeButton} onClick={onClose}>
          Awesome
        </button>
      </div>
    </div>,
    document.body,
  )
}
