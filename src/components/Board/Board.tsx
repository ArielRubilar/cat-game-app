import { type CatGamePiece } from '../../game/catGame'
import { Cell } from '../Cell/Cell'

import styles from './Board.module.css'

export interface BoardProps {
  matrix: Array<Array<CatGamePiece | undefined>>
  onPlay: (position: number[]) => void
}

export const Board = ({ matrix, onPlay }: BoardProps): JSX.Element => {
  const handlePlay = (indexRow: number, indexColumn: number) => () => {
    onPlay([indexRow, indexColumn])
  }

  return (
        <div className={styles.container}>
            {matrix.map((row, indexRow) => (
              row.map((piece, indexColumn) => (
                <Cell key={`${indexRow} ${indexColumn}` } onPlay={ handlePlay(indexRow, indexColumn) } value={piece}/>
              ))
            ))}
        </div>
  )
}
