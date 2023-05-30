import { type CatGamePiece } from '../../game/catGame'
import { Cell } from '../Cell/Cell'

import styles from './Board.module.css'

export interface BoardProps {
  matrix: Array<Array<CatGamePiece | undefined>>
  onPlay: (position: number[]) => void
  gameIsOver: boolean
}

export const Board = ({ matrix, onPlay, gameIsOver = false }: BoardProps): JSX.Element => {
  const handlePlay = (indexRow: number, indexColumn: number) => () => {
    onPlay([indexRow, indexColumn])
  }

  const isDisabledCell = (piece: CatGamePiece | undefined): boolean => {
    return piece !== undefined || gameIsOver
  }

  return (
        <div className={styles.container}>
            {matrix.map((row, indexRow) => (
              row.map((piece, indexColumn) => (
                <Cell
                  disabled={isDisabledCell(piece)}
                  key={`${indexRow} ${indexColumn}` }
                  onPlay={ handlePlay(indexRow, indexColumn) }
                  value={piece}
                />
              ))
            ))}
        </div>
  )
}
