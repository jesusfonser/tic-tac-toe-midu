import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useState } from "react";

const TURNS = {
  X: "x",
  O: "o",
};


const Square = ({children,  updateBoard, index}) =>{
  return (
    <div className="square">
      {children}
    </div>
  )
}

function App() {


  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {
          board.map(( _,index) =>{
            return (
             <Square key={index}
             index={index}
             >
              
             </Square>
            )
          })
        }
      </section>
    </main>
  );
}

export default App;
