
export const CAT_GAME_PIECE = {
  X: 'X',
  O: 'O'
}

export type CatGamePiece = typeof CAT_GAME_PIECE[keyof typeof CAT_GAME_PIECE]

export const STATE_GAME = {
  PLAYING: 'PLAYING',
  FINISHED: 'FINISHED'
}

export type StateGame = typeof STATE_GAME[keyof typeof STATE_GAME]

export const PLAYERS = {
  A: 'A',
  B: 'B'
}

const WINNING_SCENARIOS = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]],
  [[2, 0], [1, 1], [0, 2]]
]

export type Player = typeof PLAYERS[keyof typeof PLAYERS]

export class CatGame {
  private matrix: Array<Array<CatGamePiece | undefined>> = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ]

  constructor (
    private readonly winningScenarios: number[][][] = WINNING_SCENARIOS
  ) {

  }

  private stateOfGame: StateGame = STATE_GAME.PLAYING

  private currentPlayer: Player = PLAYERS.A

  private winner: Player | undefined = undefined

  getMatrix (): (Array<Array<CatGamePiece | undefined>>) {
    return [...this.matrix.map(row => [...row])]
  }

  getStateOfGame (): StateGame {
    return this.stateOfGame
  }

  getCurrentPlayer (): Player {
    return this.currentPlayer
  }

  reset (): void {
    this.matrix = this.matrix.map(row => {
      return row.map(_ => undefined)
    })
    this.stateOfGame = STATE_GAME.PLAYING
    this.currentPlayer = PLAYERS.A
    this.winner = undefined
  }

  play (position: number[]): ({ stateOfGame: StateGame, nextPlayer: Player, winner: Player | undefined }) {
    if (this.stateOfGame === STATE_GAME.FINISHED) {
      return {
        stateOfGame: this.stateOfGame,
        nextPlayer: this.currentPlayer,
        winner: this.winner
      }
    }

    const positionX = position[0]
    const positionY = position[1]

    if (positionX > 2 || positionX < 0 || positionY > 2 || positionY < 0) throw new InvalidPosition(position)

    const positionValue = this.matrix[positionX][positionY]

    if (positionValue !== undefined) throw new PositionIsTaken(position)

    const piece = this.currentPlayer === PLAYERS.A ? CAT_GAME_PIECE.O : CAT_GAME_PIECE.X

    this.matrix[positionX][positionY] = piece

    if (this.validateWinner(piece)) {
      this.stateOfGame = STATE_GAME.FINISHED
      this.winner = this.currentPlayer
    }

    this.currentPlayer = this.currentPlayer === PLAYERS.A ? PLAYERS.B : PLAYERS.A
    return {
      stateOfGame: this.stateOfGame,
      nextPlayer: this.currentPlayer,
      winner: this.winner
    }
  }

  private validateWinner (piece: CatGamePiece): boolean {
    let areWinner = false
    this.winningScenarios.forEach(winningScenario => {
      if (
        this.matrix[winningScenario[0][0]][winningScenario[0][1]] === piece &&
            this.matrix[winningScenario[1][0]][winningScenario[1][1]] === piece &&
            this.matrix[winningScenario[2][0]][winningScenario[2][1]] === piece
      ) {
        areWinner = true
      }
    })
    return areWinner
  }
}

export class InvalidPosition extends Error {
  constructor (position: number[]) {
    super(`Invalid position in matrix [${position.join(',')}]`)
    this.name = 'InvalidPosition'
  }
}

export class PositionIsTaken extends Error {
  constructor (position: number[]) {
    super(`Position [${position.join(',')}]  is taken`)
    this.name = 'PositionIsTaken'
  }
}
