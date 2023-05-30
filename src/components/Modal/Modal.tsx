import { useRef, type PropsWithChildren, useEffect } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  open: boolean
}

export const Modal = ({ children, open = false }: PropsWithChildren<ModalProps>): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const modal = dialogRef.current

  useEffect(() => {
    const handleClick = (e: Event): void => {
      if (e.target === dialogRef.current) {
        modal?.close()
      }
    }

    modal?.addEventListener('click', handleClick)

    return () => {
      modal?.removeEventListener('click', handleClick)
    }
  }, [modal])

  if (modal != null) {
    if (!open) {
      modal.close()
    } else {
      if (!modal.open) modal.showModal()
    }
  }

  return (
    <dialog className={styles.modal} ref={dialogRef}>
        {children}
    </dialog>
  )
}
