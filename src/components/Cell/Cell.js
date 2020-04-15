import React, { useContext, Fragment } from "react";
import "./Cell.css";
import { CELL_SIZE } from "../Utils/GameConstans";
import GameInfoContext from "../../context/GameInfo/GameInfoContext";
import PropTypes from "prop-types";

const Cell = ({
  cellRow,
  cellCol,
  isMine,
  mineNeighbours,
  isRevealed,
  isFlagged,
  isLostTrigger,
  missedMark,
  clickHandler,
}) => {
  const renderCell = () => {
    if (isMine) {
      return <i className='fa fa-bomb fa-md' />;
    } else if (isFlagged) {
      return <i className='fa fa-times' style={{ color: "#ffb000" }}></i>;
    } else if (mineNeighbours > 0) {
      return <Fragment>{mineNeighbours}</Fragment>;
    }
    return null;
  };

  const getType = () => {
    if (isLostTrigger) {
      return "danger";
    }
    if (missedMark) {
      return "secondary";
    }
    return "primary";
  };

  const gameInfoContext = useContext(GameInfoContext);
  const isRevealMode = gameInfoContext.isRevealMode;

  return (
    <div
      className={`game-cell alert alert-${getType()}`}
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
      }}
    >
      <span>{renderCell()}</span>
      <button
        className='btn btn-warning game-btn'
        onClick={(e) => clickHandler(e, cellRow, cellCol)}
        style={{
          opacity: isRevealed ? 0 : isRevealMode ? 0.5 : 1,
          cursor: isRevealed ? "auto" : "pointer",
          display: "block",
        }}
      >
        {isFlagged ? <i className='fa fa-flag' /> : null}
      </button>
    </div>
  );
};

Cell.propTypes = {
  cellRow: PropTypes.number,
  cellCol: PropTypes.number,
  isMine: PropTypes.bool,
  mineNeighbours: PropTypes.number,
  isRevealed: PropTypes.bool,
  isFlagged: PropTypes.bool,
  isLostTrigger: PropTypes.bool,
  missedMark: PropTypes.bool,
  clickHandler: PropTypes.func,
};

export default Cell;
