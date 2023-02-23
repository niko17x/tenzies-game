import React from "react";

function Tracker(props) {
  return (
    <div className="tracker">
      <div className="tracker--dice_roll">
        <span>Rolls:</span>
        <div className="tracker--props">{props.diceRoll}</div>
      </div>

      <div className="tracker--best_time">
        <span>Best Time:</span>
        <div className="tracker--display_time">
          <img src="../star-outline.svg" alt="" />
          <div className="tracker--props">{props.bestTime}</div>
          <img src="../star-outline.svg" alt="" />
        </div>
      </div>

      <div className="tracker--timer">
        <span>Timer:</span>
        <div className="tracker--props">{props.timer}</div>
      </div>
    </div>
  );
}

export default Tracker;
