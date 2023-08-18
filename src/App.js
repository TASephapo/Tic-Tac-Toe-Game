import React, { useState } from "react";
import "./App.css";

import { Board } from "./components/Board";
import { ScoreBoard } from "./components/ScoreBoard";
import { ResetButton } from "./components/ResetButton";

function App() {
  //Listing the win Combinations

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [2, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //Updating the Board

  const [board, setBoard] = useState(Array(9).fill(null));

  // Tracking the current player

  const [xplaying, setXplaying] = useState(true);

  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  const handleBoxClick = (boxIndex) => {
    const updatedBoard = board.map((value, index) => {
      if (index === boxIndex) {
        return xplaying === true ? "X" : "O";
      } else {
        return value;
      }
    });

    const winner = checkWinner(updatedBoard);

    // Checking the score for both X and O and assign the winnner

    if (winner) {
      setScores((prevScores) => {
        if (winner === "O") {
          return { ...prevScores, oScore: prevScores.oScore + 1 };
        } else {
          return { ...prevScores, xScore: prevScores.xScore + 1 };
        }
      });
    }

    setBoard(updatedBoard);
    setXplaying(!xplaying);
  };

  // Checking the winner

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      //finding the 1st, 2nd and 3rd index at which value should be present for the person to win

      const [x, y, z] = WIN_CONDITIONS[i];

      //setting the first winner to be x

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);

    setBoard(Array(9).fill(null));
  };

  return (
    //handling the board with onclick
    <div className="App">
      <span className="heading">Tic Tac Toe Game</span>
      <ScoreBoard scores={scores} xplaying={xplaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;
