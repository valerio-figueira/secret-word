import { useState, useRef } from 'react'
import './Game.css'

const Game = ({
  selectStage,
  checkLetter,
  scores,
  category,
  letters,
  guesses,
  rightGuesses,
  wrongGuesses
}) => {

  const [guess, setGuess] = useState('');
  const inputRef = useRef(null);

  function handleSubmit(e){
    e.preventDefault();

    inputRef.current.focus();
    setGuess('');
    checkLetter(guess);
  }

  function getScoreClass(){
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
    <div className='game'>
      <p className='points'>
        Pontuação:
        <span className={getScoreClass()}> {scores}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className='tip'>
        Dica sobre a palavra: <span>{category}</span>
      </h3>

      <div className="word_container">
       {letters.map((letter, i) => (
        rightGuesses.includes(letter) ? (
          <span key={i} className='letter'>{letter}</span>
        ) : (
          <span key={i} className='blank_square'></span>
        )
       ))}
      </div>

      {guesses === 3 && <p className='guesses'>Você tem <span className='maximum_value'>{guesses}</span> tentativas.</p>}

      {guesses === 2 && <p className='guesses'>Você ainda tem <span className='medium_value'>{guesses}</span> tentativas.</p>}

      {guesses === 1 && <p className='guesses'>Você tem apenas <span className='minimum_value'>{guesses}</span> tentativa.</p>}

      <div className='letter_container'>
        <p>Tente adivinhar a letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
          type="text"
          maxLength={1}
          required
          onChange={e => setGuess(e.target.value)}
          value={guess}
          ref={inputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrong_letters_container">
          <p>Suas jogadas anteriores:</p>
          {wrongGuesses && (
            wrongGuesses.map((wrongGuess, i) => (
              <span key={i}>{i > 0 && ", "}{wrongGuess}</span>
            ))
          )}
      </div>
    </div>
  )
}

export default Game