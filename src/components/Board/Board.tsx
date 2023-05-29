import { type CatGamePiece } from '../../game/catGame'
import { Cell } from '../Cell/Cell'

import styles from './Board.module.css'

export interface BoardProps {
  matrix: Array<Array<CatGamePiece | undefined>>
  play: (position: number[]) => void
}

export const Board = ({ matrix, play }: BoardProps): JSX.Element => {
  return (

        <div className={styles.container}>
            {matrix.map((row, index) => (
              row.map((piece, indexCell) => (
                <Cell key={`${index} ${indexCell}` } play={ () => { play([index, indexCell]) } } value={piece}/>
              ))
            ))}
        </div>
  )
}
