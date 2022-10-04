import { useState, useRef } from 'react'
import './Game.css'

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score
}) => {

  const [letter, setLetter] = useState('');
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);

    setLetter('')
    letterInputRef.current.focus();
  }

  return (
    <div className='game'>
      <p className='points'>
        Pontuação: <span>{score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className='tip'>
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <div className="word_container">
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (
            <span key={i} className='letter'>{letter}</span>
          ) : (
            <span key={i} className="blank_square"></span>
          )
        ))}
      </div>
      <p className='guesses'>Você ainda tem <span>{guesses}</span> tentativas</p>
      <div className='letter_container'>
        <p>Tente adivinhar a letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
          type="text"
          name="letter"
          maxLength="1"
          required
          onChange={(e) => setLetter(e.target.value)}
          value={letter}
          ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrong_letters_container">
        {wrongLetters.length > 0 ? (
          <p>Letras já utilizadas: </p>
        ) : (
          undefined
        )}
        {
          wrongLetters.map((letter, i) => (
            <span key={i}>{letter}</span>
          ))
        }
      </div>
    </div>
  )
}

export default Game