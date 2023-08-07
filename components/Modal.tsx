import styles from './Modal.module.scss'
import { useEffect } from 'react'

export default function Modal({ active, setModalActive, children }) {
  return (
    <div
      className={active ? `${styles.modalBlock} ${styles.active}` : styles.modalBlock}
      onClick={() => {
        setModalActive(false)
      }}
    >
      <div
        className={styles.contentBlock}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className={styles.close}>
          <button
            onClick={() => {
              setModalActive(false)
            }}
          ></button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
