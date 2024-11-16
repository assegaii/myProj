import { useState } from 'react'
import Board from './Board.jsx'
import './Game.css'

function Game(params) {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0)
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXIsNext(!xIsNext);
    }
    function jumpTo(nextMove){
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    }

    const moves = history.map((squares, move) => {
        let descriprion;
        if (move > 0) {
            descriprion = 'Go to move #' + move;
        } else {
            descriprion = 'Go to game start';
        }
        return (
            <li key={move}>
                <div className='move-history-btn'
                onClick={() => jumpTo(move)}>
                    {descriprion}
                </div>
            </li>
        )
    })

    return (
        <>
        <div className='game'>
            <div className='game-board'>
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
        </div>
        <div className='game-info'>
            <a className='history-text'>History</a>
            <a>{moves}</a>
        </div>
        </>
    )
}

export default Game