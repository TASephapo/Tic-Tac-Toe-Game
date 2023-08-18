import React from "react";

import "./ScoreBoard.css";

export const ScoreBoard = ({ scores, xPlaying }) => {
  //Keeping track of current player
  const { xScore, oScore } = scores;

  return (
    //checking if the player is active
    <div className="scoreboard">
      <span className={`score  o-score ${!xPlaying ? "active" : "inactive"}`}>
        {" "}
        O - {oScore}
      </span>
      <span className={`score  x-score ${xPlaying ? "active" : "inactive"}`}>
        {" "}
        X- {xScore}
      </span>
    </div>
  );
};
