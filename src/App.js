// CSS
import './App.css';
// COMPONENTS
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import EndGame from './components/EndGame';
// DATA
import { wordsList } from './data/words.js';
// HOOKS
import { useCallback, useEffect, useState } from 'react';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

function App() {
  const [stage, setStage] = useState(stages[0].name);
  const [words] = useState(wordsList); 

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrontLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);


  const pickWordAndCategory = () => {    
    // PICK RANDOM CATEGORY
    const categories = Object.keys(words);
    const keysLength = Object.keys(categories).length;
    const category = categories[Math.floor(Math.random() * keysLength)];
    
    // PICK RANDOM WORD
    const randomIndex = Math.floor(Math.random() * words[category].length);
    const word = words[category][randomIndex];
    
    return {word, category};
  };
  
  // START SECRET WORD GAME
  const startGame = () => {
    // PICK WORD AND CATEGORY
    const {word, category} = pickWordAndCategory();

    // DESTRUCTURING WORD INTO LETTERS ARRAY
    let letters = word.split("")
    letters = letters.map(l => l.toLowerCase());

    // FILL STATES
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(letters);

    setStage(stages[1].name);
  }

  // PROCESS THE LETTER INPUT
  const verifyLetter = (letter) => {
    
    console.log(letter)
  }

  // RESTART THE GAME
  const retry = () => {
    setStage(stages[0].name);
  }

  return (
    <div className="App">
      {stage === 'start' && (<StartScreen startGame={startGame} />)}
      {stage === 'game' && (<Game
      verifyLetter={verifyLetter}
      pickedWord={pickedWord}
      pickedCategory={pickedCategory}
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
      />)}
      {stage === 'end' && (<EndGame retry={retry} />)}
    </div>
  );
}

export default App;