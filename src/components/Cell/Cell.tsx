import { type CatGamePiece } from '../../game/catGame'
import styles from './Cell.module.css'

export interface CellProps {
  value: CatGamePiece | undefined
  onPlay: () => void
}

export const Cell = ({ value, onPlay }: CellProps): JSX.Element => {
  const disabled = value !== undefined

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
