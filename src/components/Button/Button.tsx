import { type PropsWithChildren } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  onClick: () => void
}

export const Button = ({ onClick, children }: PropsWithChildren<ButtonProps>): JSX.Element => {
  return (
    <button className={styles.btn} type='button' onClick={onClick} >
        {children}
    </button>
  )
}
