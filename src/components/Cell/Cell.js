import React, { useState, Fragment } from "react";
import "./Cell.css";
import { CELL_SIZE } from "../Utils/GameConstans";

const Cell = ({
  cellRow,
  cellCol,
  isMine,
  mineNeighbours,
  isRevealed,
  isFlagged,
  isLostTrigger,
  clickHandler,
}) => {
  const renderCell = () => {
    if (isMine) {
      return <i className='fa fa-bomb fa-md' style={{ color: "#000" }} />;
    } else if (isFlagged) {
      return <i className='fa fa-times' style={{ color: "#ffb000" }}></i>;
    } else if (mineNeighbours > 0) {
      return <Fragment>{mineNeighbours}</Fragment>;
    }
    return null;
  };

  const getBackground = () => {
    if (isLostTrigger) {
      return "#cc2f2f";
    }
    if (isMine) {
      return "#fff";
    }
    return null;
  };

  return (
    <div
      className='game-cell'
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
        background: getBackground(),
      }}
    >
      {renderCell()}
      <button
        className='btn btn-primary game-btn'
        onClick={(e) => clickHandler(e, cellRow, cellCol)}
        style={{
          opacity: isRevealed ? 0 : 1,
          cursor: isRevealed ? "auto" : "pointer",
        }}
      >
        {isFlagged ? <i className='fa fa-flag' /> : null}
      </button>
    </div>
  );
};

export default Cell;
