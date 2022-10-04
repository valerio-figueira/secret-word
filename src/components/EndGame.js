import './EndGame.css'

const EndGame = ({retry}) => {
  return (
    <div>
      <h1>ENDGAME</h1>
      <button onClick={retry}>Reiniciar Jogo</button>
    </div>
  )
}

export default EndGame