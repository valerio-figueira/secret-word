import './StartScreen.css';

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
        <h1 className="title">Secret Word</h1>
        <p>Clique no botão para começar.</p>
        <button className="start_btn" onClick={startGame}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen;