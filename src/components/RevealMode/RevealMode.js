import React, { useContext } from "react";
import GameInfoContext from "../../context/GameInfo/GameInfoContext";

const RevealMode = () => {
  const gameInfoContext = useContext(GameInfoContext);
  const isRevealMode = gameInfoContext.isRevealMode;
  const toggleRevealMode = () => {
    gameInfoContext.setIsRevealMode(!isRevealMode);
  };

  return (
    <button
      className={`btn btn-outline-success my-2 my-sm-0 ml-auto ${
        isRevealMode ? "active" : ""
      }`}
      onClick={toggleRevealMode}
    >
      <i className='fa fa-eye' /> Reveal All Cells
    </button>
  );
};

export default RevealMode;
