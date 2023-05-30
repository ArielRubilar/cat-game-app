import { Board } from './components/Board/Board'
import styles from './App.module.css'
import { useCatGame } from './hooks/useCatGame'
import { CAT_GAME_PIECE, PLAYERS, STATE_GAME } from './game/catGame'
import { Modal } from './components/Modal/Modal'
import { Button } from './components/Button/Button'

function App (): JSX.Element {
  const { matrix, play, stateOfGame, reset, player, winner } = useCatGame()

  const areWinner = stateOfGame === STATE_GAME.FINISHED

  return (
    <main>
      <div className={styles.container}>

        <Modal open={areWinner} >
          <h3>Player {winner} Win!!!</h3>
          <Button onClick={reset}>Reset Game</Button>
        </Modal>

        <h1 className={styles.title}>Cat Game</h1>

        {
          !areWinner
            ? (<p>Player { player } (  { player === PLAYERS.A ? CAT_GAME_PIECE.O : CAT_GAME_PIECE.X}  ) is playing!!! </p>)
            : (<p>Player { winner } (  { winner === PLAYERS.A ? CAT_GAME_PIECE.O : CAT_GAME_PIECE.X}  ) Win!!! </p>)
        }

        <Board matrix={matrix} onPlay={play}/>
        <Button onClick={reset}>Reset Game</Button>
      </div>
    </main>
  )
}

export default App
