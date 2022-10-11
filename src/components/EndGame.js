import './EndGame.css'

const EndGame = ({
  retry,
  scores,
  word,
  rightGuesses,
  wrongGuesses,
  letters,
  winner
}) => {

  function checkRightGuesses(){
    if(rightGuesses.length > 0){
      const rightValues = rightGuesses.length - 1;
      console.log(letters.length)
      return String(Number((rightValues * 100) / (letters.length)).toFixed(2)).concat('%');
    }
  };

  function checkWrongGuesses(){       
    if(wrongGuesses.length > 0){
      const wrongValues = wrongGuesses.length;
      return String(Number((wrongValues * 100) / (letters.length)).toFixed(2)).concat('%');
    } else{
      return "0";
    }
  };

  function setColor(){
    console.log(scores)
    if((scores / 100) <= (letters.length * 30) / 100){
      return 'low-score';
    } else if((scores / 100) <= (letters.length * 60) / 100){
      return 'medium-score';
    } else if((scores / 100) <= letters.length){
      return 'high-score';
    } else{
      return '';
    }
  }

  return (
    <div>
      {
        winner ? (
          <h1>Parabéns! Você Ganhou!</h1>
        ) : (
          <h1>Game Over!</h1>
        )
      }
      <p>Palavra chave: <span className='word'>{word}</span></p>
      <p>Sua pontuação: <span className={setColor()}>{scores}</span></p>
      <p>Acertos: <span className={setColor()}>{checkRightGuesses()}</span></p>
      <p>Erros: <span className={setColor()}>{checkWrongGuesses()}</span></p>
      <button onClick={retry}>Reiniciar Jogo</button>
    </div>
  );
};

export default EndGame;