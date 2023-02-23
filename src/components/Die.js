import React from "react";

function Die(props) {
  const styles = { backgroundColor: props.isHeld ? "#03ff8e" : "white" };

  return (
    <div
      className="die--die"
      style={styles}
      value={props.value}
      id={props.id}
      onClick={props.clickDice}
    >
      <img className="die--svg" src={props.img} alt="" />
    </div>
  );
}

export default Die;
