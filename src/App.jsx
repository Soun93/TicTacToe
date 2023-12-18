import { useState } from "react";
import "./App.css"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { getLocalStorage, checkWinnerFrom, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx";

// NOTAS:
// Los useState JAMAS pueden estar dentro de un if, en el cuerpo de un componente
// Leer directamente el local storage ES LENTOO y sincrono!!!! No se debe llamar desde el cuerpo

function App() {
  const [winner, setWinner] = useState(null);

  const [board, setBoard] = useState(() => {
    return getLocalStorage('board', true) || Array(9).fill(null)
  });

  const [turn, setTurn] = useState(() => {
    return getLocalStorage('turn', false) || TURNS.X
  });

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    // Siempre se deben hacer nuevas variables de las property son INMUTABLES
    const newBoard = [...board];
    newBoard[index] = turn;
  
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    const newWinner = checkWinnerFrom(newBoard);
  
    setBoard(newBoard);
    setTurn(newTurn);

    // Guardamos partida en el local storage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    // Actualizamos valores 
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe </h1>
      <button className='reset-game' onClick={resetGame}>Reset Game</button>

      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square 
              key={index} 
              index={index}
              updateBoard={updateBoard}>
                {square}
              </Square>
            );
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={TURNS.X == turn}>{TURNS.X}</Square>
        <Square isSelected={TURNS.O == turn}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main> 
  )
}

export default App
