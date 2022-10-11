// STYLES
import './App.css';

//COMPONENTS
import { wordsList } from './data/words';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import EndGame from './components/EndGame';

//HOOKS
import { useState, useEffect } from 'react';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
]

const guessesIndex = 3;

function App() {
  const [stage, setStage] = useState(stages[0]);
  const words = wordsList;

  const [category, setCategory] = useState();
  const [word, setWord] = useState();
  const [letters, setLetters] = useState();
  const [guesses, setGuesses] = useState(guessesIndex);
  const [rightGuesses, setRightGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [scores, setScores] = useState(0);
  const [winner, setWinner] = useState();
  

  function selectStage(){
    selectCategoryAndWord()
    if(stage.name === stages[0].name){
      setStage(stages[1]);
    } else if(stage.name === stages[1].name){
      setStage(stages[2]);
    } else if(stage.name === stages[2].name){
      setStage(stages[0]);
    }
  };

  function checkLetter(guess){
    const checkRightGuess = rightGuesses.includes(guess);
    const checkWrongGuess = wrongGuesses.includes(guess);

    guess = guess.toLowerCase();

    // CHECK IF LETTER HAS BEEN ALREADY USED
    if(checkRightGuess || checkWrongGuess){
      return;
    }

    if(letters.includes(guess)){
      setRightGuesses(actualRightGuesses => [
        ...actualRightGuesses, guess
      ])
      checkScores(guess);      
    } else{
      setWrongGuesses(actualWrongGuesses => [
        ...actualWrongGuesses, guess
      ]);
      setGuesses(index => (--index));
      setScores(scores => scores -= 100);
    };
  };

  function checkScores(guess){
    let duplicateLetters = 0;
    letters.forEach(letter => {
      if(letter.includes(guess)){
        duplicateLetters += 1;
      }
    });

    let mult = duplicateLetters * 100;    
    setScores((points) => (
      points += mult
    ));
    
  }

  function retry(){
    setGuesses(guessesIndex);
    setScores(0);
    setRightGuesses([]);
    setWrongGuesses([]);
    selectStage();
  }
/*

*/
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    uniqueLetters.forEach((letter, i) => {
      if(rightGuesses.includes(letter)){
        if(i === uniqueLetters.length - 1){
          setStage(stages[2]);
          setWinner(true);
        };
      };
    });
  }, [rightGuesses]);

  useEffect(() => {
    if(guesses <= 0){
      setStage(stages[2]);
      setWinner(false);
    }
  }, [guesses]);

  function selectCategoryAndWord(){
    const categories = Object.keys(words); 
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);   
    const category = categories[randomCategoryIndex];

    const randomWordIndex = Math.floor(Math.random() * words[category].length);
    const word = words[category][randomWordIndex];

    splitWordIntoLetters({word});

    setWord(word);    
    setCategory(category);
  }

  function splitWordIntoLetters({word}){
    const letters = word.split("");
    const lettersInLowerCase = letters.map(l => (l.toLowerCase()))

    setLetters(lettersInLowerCase);
    console.log(lettersInLowerCase)
  }



  return (
    <div className="App">
      {stage.name === 'start' && <StartScreen selectStage={selectStage} />}
      {stage.name === 'game' && <Game
      selectStage={selectStage}
      checkLetter={checkLetter}
      scores={scores}
      category={category}
      word={word}
      letters={letters}
      guesses={guesses}
      rightGuesses={rightGuesses}
      wrongGuesses={wrongGuesses}
      />}
      {stage.name === 'end' && <EndGame
      retry={retry}
      scores={scores}
      word={word}
      rightGuesses={rightGuesses}
      wrongGuesses={wrongGuesses}
      letters={letters}
      winner={winner}
      />}
    </div>
  );
}

export default App;
