import { useRef, type PropsWithChildren } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  open: boolean
}

export const Modal = ({ children, open = false }: PropsWithChildren<ModalProps>): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const modal = dialogRef.current

  if (modal != null) {
    if (open) {
      if (!modal.open) modal.showModal()
    } else {
      modal.close()
    }
  }
  return (
    <dialog className={styles.modal} ref={dialogRef}>
        {children}
    </dialog>
  )
}
