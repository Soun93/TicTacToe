
import { Square } from "./Square.jsx";

export function WinnerModal ({ winner, resetGame}) {
  if (winner == null) return;

  const winnerText = winner ?  'The winner is: ' : 'Draw'
  return (
    <section className='background-winner'>
      <div className='winner-card'>
      <h1>{winnerText}</h1>
        <Square>
          {winner}
        </Square>
        <span>Woud you like to try it Again?</span>
        <button className='reset-game' onClick={resetGame}>Reset Game</button>
      </div>
    </section>
  );
}
