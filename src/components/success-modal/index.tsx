import type React from "react"
import ReactDOM from "react-dom"
import styles from "./index.module.scss"
import confettiGif from "./assets/confetti.gif"

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
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-desc"
    >
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
        <h2 id="success-modal-title" className={styles.title}>
          You Got It!
        </h2>
        <p id="success-modal-desc" className={styles.subtitle}>
          Your purchase is on the way
        </p>
        <button className={styles.closeButton} onClick={onClose}>
          Awesome
        </button>
      </div>
    </div>,
    document.body,
  )
}
