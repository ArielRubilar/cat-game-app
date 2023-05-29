import { Board } from './components/Board/Board'
import styles from './App.module.css'
import { useCatGame } from './hooks/useCatGame'
import { CAT_GAME_PIECE, PLAYERS, STATE_GAME } from './game/catGame'
import { Modal } from './components/Modal/Modal'

function App (): JSX.Element {
  const { matrix, play, stateOfGame, reset, player, winner } = useCatGame()

  return (
    <main>
      <div className={styles.container}>

        <Modal open={stateOfGame === STATE_GAME.FINISHED}>
          <h3>Player {winner} Win!!!</h3>
          <button className={styles['btn-reset']} type='button' onClick={() => {
            reset()
          } } >Reset Game</button>
        </Modal>

        <h1 className={styles.title}>Cat Game</h1>

        {
          stateOfGame === STATE_GAME.PLAYING
            ? (<p>Player { player } (  { player === PLAYERS.A ? CAT_GAME_PIECE.O : CAT_GAME_PIECE.X}  ) is playing!!! </p>)
            : null
        }

        <Board matrix={matrix} play={play}/>

        <button className={styles['btn-reset']} type='button' onClick={() => { reset() } } >Reset Game</button>
      </div>
    </main>
  )
}

export default App
