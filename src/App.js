import React from "react";
import "./App.css";
import Die from "./components/Die";
import Tracker from "./components/Tracker";
import dieData from "./components/DieData";
import Confetti from "react-confetti"; // Confetti effects dependency.
const { v4: uuidv4 } = require("uuid"); // Unique id generator.

function App() {
  // Best score for local storage.
  const [bestTime, setBestTime] = React.useState(
    JSON.parse(localStorage.getItem("bestTime") || 0)
  );
  const [dice, setDice] = React.useState(createDiceSet());
  const [rolls, setRolls] = React.useState(0);
  const [tenzies, setTenzies] = React.useState(false); // Track game win.
  const [timer, setTimer] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const countRef = React.useRef(null);

  // Check every time the dice state has been changed for a win.
  // Game is won when the isHeld property is all set to true and value is all equal to each other.
  React.useEffect(() => {
    const allHold = dice.every((die) => die.isHeld);
    const compareDieValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === compareDieValue);
    allHold && allSameValue ? setTenzies(true) : setTenzies(false);
  }, [dice]);

  React.useEffect(() => {
    console.log("logged");
    displayWinText();
    utilGetBestTime();
    clearInterval(countRef.current);
    setIsPaused(false);
  }, [tenzies]);

  React.useEffect(() => {
    localStorage.setItem("bestTime", JSON.stringify(bestTime));
  }, [bestTime]);

  // ? BUG => best time and current time are always going to equal b/c the change in value is currently dependent to each other :
  function displayWinText() {
    let message =
      "Roll until all dice are the same. Click each die to freeze it at its current value between rolls.";

    const currentTime = document.querySelector(
      ".tracker--timer > .tracker--props"
    );

    if (tenzies && currentTime.textContent) {
      if (parseInt(currentTime.textContent) < parseInt(bestTime)) {
        message = "Awesome! You've set a new best time!";
      } else {
        message = "You Win!";
      }
    }
    console.log(parseInt(currentTime) === parseInt(bestTime));
    return message;
  }

  function createDiceSet() {
    // get a random object from dieData and push that 10 times into a new array.
    let result = [];
    for (let i = 0; i < 10; i++) {
      result.push(generateNewDie());
    }
    return result;
  }

  function generateNewDie() {
    const randomGenerator = Math.floor(Math.random() * 6);
    // Adding objects from dieData.js and adding 'id' property to each object with unique id :
    const newDie = { ...dieData[randomGenerator], id: uuidv4() };
    return newDie;
  }

  function handleClick(id) {
    utilGameTimer();
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function utilGameTimer() {
    const firstDieClicked = dice.every((die) => !die.isHeld);
    if (firstDieClicked) {
      setIsActive(true);
      setIsPaused(true);
      countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
  }

  function utilGetBestTime() {
    const currentTime = document.querySelector(
      ".tracker--timer > .tracker--props"
    ).innerHTML;

    // Logic for setting best time :
    if (bestTime === 0 || parseInt(currentTime) < parseInt(bestTime)) {
      setBestTime((prevTime) => (currentTime === "0" ? prevTime : currentTime));
    }
  }

  function rollDice() {
    if (!tenzies) {
      setDice((prevDie) =>
        prevDie.map((die) => {
          return die.isHeld ? { ...die } : generateNewDie();
        })
      );
      setRolls((prev) => prev + 1);
    } else {
      setDice(createDiceSet());
      setRolls(0);
      setTimer(0);
    }
    // foo();
  }

  function getDieUrl(value) {
    if (value === 1) {
      return dieData[0].url;
    } else if (value === 2) {
      return dieData[1].url;
    } else if (value === 3) {
      return dieData[2].url;
    } else if (value === 4) {
      return dieData[3].url;
    } else if (value === 5) {
      return dieData[4].url;
    } else if (value === 6) {
      return dieData[5].url;
    }
  }

  function foo() {
    setDice((prevDie) =>
      prevDie.map((die) => {
        return die.isHeld === false && die.value === 1
          ? (die.isHeld = true)
          : { ...die };
      })
    );
  }

  // Create new Die.js component with props passed through :
  const diceElements = dice.map((die) => (
    <Die
      key={Math.floor(Math.random() * 9999) * Date.now().toString()}
      id={die.id}
      isHeld={die.isHeld}
      img={getDieUrl(die.value)}
      clickDice={() => handleClick(die.id)}
    />
  ));

  return (
    <div className="app--container">
      {tenzies && <Confetti />}
      <div className="app--header">
        <h1>TENZIES</h1>
        <p>{displayWinText()}</p>
      </div>
      <Tracker diceRoll={rolls} bestTime={bestTime} timer={timer} />
      <div className="die--container">{diceElements}</div>
      <button className="app--button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  );
}

export default App;
