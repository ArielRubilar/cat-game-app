import { CAT_GAME_PIECE, CatGame, InvalidPosition, PLAYERS, PositionIsTaken, STATE_GAME } from './catGame'

describe('CatGame', () => {
  describe('Init game', () => {
    it('CatGame should be created', () => {
      const Sut = CatGame

      const actual = new Sut()

      expect(actual).toBeTruthy()
    })
  })

  describe('GetMatrix', () => {
    it('should return a prices Matrix', () => {
      const sut = new CatGame()

      const actual = sut.getMatrix()

      expect(actual.length).toBe(3)
      expect(actual[0].length).toBe(3)
      expect(actual[1].length).toBe(3)
      expect(actual[2].length).toBe(3)
    })
  })

  describe('GetStateOfGame', () => {
    it('should return `PLAYING`', () => {
      const sut = new CatGame()

      const actual = sut.getStateOfGame()

      expect(actual).toBe(STATE_GAME.PLAYING)
    })
  })

  describe('play', () => {
    describe('play first move', () => {
      it('should return state of game `PLAYING` and next player', () => {
        const sut = new CatGame()
        const position = [0, 0]

        const actual = sut.play(position)

        expect(actual.stateOfGame).toBe(STATE_GAME.PLAYING)
        expect(actual.nextPlayer).toBe(PLAYERS.B)
      })
    })

    describe('put piece on matrix', () => {
      it.each([
        { position: [0, 0], piece: CAT_GAME_PIECE.O },
        { position: [2, 2], piece: CAT_GAME_PIECE.O },
        { position: [1, 2], piece: CAT_GAME_PIECE.O },
        { position: [0, 1], piece: CAT_GAME_PIECE.O },
        { position: [1, 1], piece: CAT_GAME_PIECE.O }
      ])('piece($piece)  should put in correct position in matrix $position', ({ position, piece }) => {
        const sut = new CatGame()
        sut.play(position)
        const actual = sut.getMatrix()
        expect(actual[position[0]][position[1]]).toBe(piece)
      })

      describe('Three move are made', () => {
        it('piece(O)  should put in correct position in matrix [1,0]', () => {
          const sut = new CatGame()
          sut.play([0, 0])
          sut.play([2, 2])
          sut.play([1, 0])
          const actual = sut.getMatrix()
          expect(actual[1][0]).toBe(CAT_GAME_PIECE.O)
        })
      })

      describe('two move are made', () => {
        it('piece(X)  should put in correct position in matrix [2,2]', () => {
          const sut = new CatGame()
          sut.play([0, 0])
          sut.play([2, 2])
          const actual = sut.getMatrix()
          expect(actual[2][2]).toBe(CAT_GAME_PIECE.X)
        })
      })

      describe('position don`t exit', () => {
        it('should throw a InvalidPosition error', () => {
          const sut = new CatGame()

          expect(
            () => sut.play([0, 9])
          ).toThrow(new InvalidPosition([0, 9]))
        })
      })

      describe('position is  taken', () => {
        it('should throw a PositionIsTaken error', () => {
          const sut = new CatGame()
          sut.play([0, 2])

          expect(
            () => sut.play([0, 2])
          ).toThrow(new PositionIsTaken([0, 2]))
        })
      })
    })

    describe('win the game', () => {
      it('player A win the game', () => {
        const sut = new CatGame()
        sut.play([0, 0])
        sut.play([1, 0])
        sut.play([0, 1])
        sut.play([1, 1])

        const actual = sut.play([0, 2])

        expect(actual.stateOfGame).toBe(STATE_GAME.FINISHED)
        expect(actual.winner).toBe(PLAYERS.A)
      })

      it('player B win the game', () => {
        const sut = new CatGame()
        sut.play([0, 0])
        sut.play([0, 2])
        sut.play([1, 2])
        sut.play([1, 1])
        sut.play([1, 0])

        const actual = sut.play([2, 0])

        expect(actual.stateOfGame).toBe(STATE_GAME.FINISHED)
        expect(actual.winner).toBe(PLAYERS.B)
      })

      it('player B win the game ', () => {
        const sut = new CatGame()
        sut.play([0, 0])
        sut.play([2, 2])
        sut.play([1, 2])
        sut.play([2, 1])
        sut.play([1, 0])

        const actual = sut.play([2, 0])

        expect(actual.stateOfGame).toBe(STATE_GAME.FINISHED)
        expect(actual.winner).toBe(PLAYERS.B)
      })
    })
  })
})
