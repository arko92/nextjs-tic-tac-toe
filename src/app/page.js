"use client";

import { useState } from "react";

/*
Brainstorming:
1. What components do we need?
a) Square
b) Tic-tac-toe board

Additional task: 
a) Track the history of all the board games
b) Use the history to go back to any point in the history

*/

function Square({value, onClick}) {  // The square component takes a value X or O and an event onCLick which determines what value to display on clicking
  return (
    <button className="Square" onClick={onClick}>{value}</button>
  );
}

function Board({squares,isXNext,onPlay}) {

  // const [squares,setSquares] = useState(Array(9).fill(null));
  // const [isXNext,setisXNext] = useState(true);

  function onSquareClick(idx) {

    if (squares[idx]!==null || calculateWinner(squares)) return; // We dont want to allow users to update if there is a winner
       
    const newSquares = [...squares];

    newSquares[idx] = isXNext ? "X" : "O";

    // setisXNext(!isXNext); 

    // setSquares(newSquares);

    onPlay(newSquares);


  }

  const winner = calculateWinner(squares);

  function replay(){
    squares = Array(9).fill(null);
    onPlay(squares);
    isXNext = true;

  }

  return (
    <div className="Board">

      {winner?
      ( <div className="status">
          <div>
            <p>Winner is {winner}</p>
          </div>
          <div>
            <button className="btn" onClick={replay}>Replay</button>
          </div>
      </div>
      ): (
        <div className="status">
          <p>Next player: {isXNext?"X":"O"}</p>
          <button className="btn" onClick={replay}>restart</button>
        </div>
      )}



      <div className="Board-row">
        <Square value={squares[0]} onClick = {()=>onSquareClick(0)}/>
        <Square value={squares[1]} onClick = {()=>onSquareClick(1)}/>
        <Square value={squares[2]} onClick = {()=>onSquareClick(2)}/>
      </div>
      <div className="Board-row">
        <Square value={squares[3]} onClick = {()=>onSquareClick(3)}/>
        <Square value={squares[4]} onClick = {()=>onSquareClick(4)}/>
        <Square value={squares[5]} onClick = {()=>onSquareClick(5)}/>
      </div>
      <div className="Board-row">
        <Square value={squares[6]} onClick = {()=>onSquareClick(6)}/>
        <Square value={squares[7]} onClick = {()=>onSquareClick(7)}/>
        <Square value={squares[8]} onClick = {()=>onSquareClick(8)}/>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2], // Horizontal
    [3,4,5], // Horizontal
    [6,7,8], // Horizontal
    [0,3,6], // Vertical
    [1,4,7], // Vertical
    [2,5,8], // Vertical
    [2,4,6], // Diagonal
    [0,4,8]  // Diagonal
  ];

  for (const line of lines) {

    const [i,j,k] = line;
    if(squares[i] && squares[i] === squares[j] && squares[j] === squares[k]) {
      return squares[i]; // Winner
    }

  }
  return null;
}

export default function Game() {

  const [boardHistory, setBoardHistory] = useState([Array(9).fill(null)]); // To store the history of the board games. As currentMove increments, more arrays will be added

  const [currentMove, setCurrentMove] = useState(0); // A tic-tac-toe game can have a maximum of 9 moves because it has 9 squares

  const isXNext = currentMove % 2 === 0; // Check if in the current move X is to be appeared in the button. Since we decide to start with X i.e. at index 0, X will appear at even moves e.g. 0,2,4....

  const currentSquares = boardHistory[currentMove]; // Get the current squares based on board history and current move

  function handlePlay(newSquares) { // A function that is called everytime we make a move
    const nextHistory = [...boardHistory.slice(0,currentMove+1),newSquares]; // Board history from the previous move + board history from the current move
    setBoardHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // function to jump to any move in the history

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = boardHistory.map((squares,move) => {
    let description;
    if (move>0) {
      description = "Go to move # "+move;
    } else {
      description = "Go to game start ";

    }
    return (
      <li key={Math.random()+move}>
        <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    );
  })

  return (
    <div className="game">
      <div className="game-board">
        <h1>TIC TAC TOE</h1>
        <br />
        <Board squares={currentSquares} isXNext={isXNext} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
          <ol>{moves}</ol>
      </div>

    </div>
  );
}
