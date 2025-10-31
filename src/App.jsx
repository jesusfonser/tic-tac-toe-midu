import "./App.css";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.tsx"
import { TURNS, WINNER_COMBOS } from "./constants.js";
import { checkWinner } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";

function App() {
  const [board, setBoard] = useState(() =>{
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X
  });
  const [winner, setWinner] = useState(null);

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X)
    setWinner(null);

    window.localStorage.removeItem("turn");
    window.localStorage.removeItem("board");
  }

  const updateBoard = (index) =>{
    const newboard = [...board];
    if(board[index] || winner ) return
    newboard[index] = turn
    setBoard(newboard);
    const newturn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newturn)

    window.localStorage.setItem("board", JSON.stringify(newboard))
    window.localStorage.setItem("turn", newturn);

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

      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
    </main>
  );
}

export default App;
