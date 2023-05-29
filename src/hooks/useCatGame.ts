import { CatGame, type StateGame, type CatGamePiece, type Player } from '../game/catGame'
import { useState, useMemo } from 'react'

interface useCatGameReturn {
  matrix: Array<Array<CatGamePiece | undefined>>
  play: (position: number[]) => void
  stateOfGame: StateGame
  reset: () => void
  player: Player
  winner: Player | undefined
}

export const useCatGame = (): useCatGameReturn => {
  const catGame = useMemo(() => {
    return new CatGame()
  }, [])

  const [matrix, setMatrix] = useState(catGame.getMatrix())

  const [stateOfGame, setStateOfGame] = useState(catGame.getStateOfGame())

  const [player, setPlayer] = useState(catGame.getCurrentPlayer())
  const [winner, setWinner] = useState<Player | undefined>(undefined)

  const play = (position: number[]): void => {
    try {
      const result = catGame.play(position)
      setMatrix(catGame.getMatrix())
      setStateOfGame(result.stateOfGame)
      setPlayer(catGame.getCurrentPlayer())
      setWinner(result.winner)
    } catch (error) {
      console.log(error)
    }
  }

  const reset = (): void => {
    catGame.reset()
    setMatrix(catGame.getMatrix())
    setStateOfGame(catGame.getStateOfGame())
    setPlayer(catGame.getCurrentPlayer())
    setWinner(undefined)
  }

  return {
    matrix,
    stateOfGame,
    play,
    reset,
    player,
    winner
  }
}
