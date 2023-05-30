import { type CatGamePiece } from '../../game/catGame'
import styles from './Cell.module.css'

export interface CellProps {
  value: CatGamePiece | undefined
  onPlay: () => void
  disabled?: boolean
}

export const Cell = ({ value, onPlay, disabled }: CellProps): JSX.Element => {
  const handleClick = (): void => {
    if (!disabled) onPlay()
  }

  return (
        <div
          aria-disabled={disabled}
          tabIndex={0}
          className={styles.cell}
          onClick={handleClick}>{value}</div>
  )
}
