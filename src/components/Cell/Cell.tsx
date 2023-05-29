import { type CatGamePiece } from '../../game/catGame'
import styles from './Cell.module.css'

export interface CellProps {
  value: CatGamePiece | undefined
  play: () => void
}

export const Cell = ({ value, play }: CellProps): JSX.Element => {
  return (
        <div tabIndex={0} className={styles.cell} onClick={play}>{value}</div>
  )
}
