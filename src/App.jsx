import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.tsx"
import { TURNS, WINNER_COMBOS } from "./constants.js";
import { checkWinner } from "./logic/board.js";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);



  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X)
    setWinner(null);
  }

  const updateBoard = (index) =>{
    const newboard = [...board];
    if(board[index] || winner ) return
    newboard[index] = turn
    setBoard(newboard);
    const newturn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newturn)

    const newWinner = checkWinner(newboard);
    if (newWinner){
      confetti()
      alert(`El ganador es ${newWinner}`);
      setWinner(newWinner);
    } else if(checkEndGame(newboard)) setWinner(false)
  } 

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false
                  ? "Empate"
                  : `Ganó ${winner}`
                }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>

          </section>
        )
      }
    </main>
  );
}

export default App;
