import React, { useState, useEffect, useContext, Fragment } from "react";
import GameInfoContext from "../../context/GameInfo/GameInfoContext";
import Cell from "../Cell/Cell";
import "./GameBoard.css";
import { CELL_SIZE } from "../Utils/GameConstans";
import { createBoard } from "../Utils/UtilMethods";
import FlagCounter from "../FlagCounter/FlagCouner";
import Alert from "../Alert/Alert";

const GameBoard = () => {
  const gameInfoContext = useContext(GameInfoContext);
  const { totalRows, totalCols, totalMines, boardTimestamp } = gameInfoContext;
  const [board, setBoard] = useState([]);
  const [gameFreeze, setGameFreeze] = useState(false);
  const [remainingFlags, setRemainingFlags] = useState(totalMines);
  const [numberOfCorrectFlags, setNumberOfCorrectFlags] = useState(0);

  useEffect(() => {
    // Reset Game
    (() => {
      setBoard(createBoard(totalRows, totalCols, totalMines));
      setRemainingFlags(totalMines);
      setNumberOfCorrectFlags(0);
      setGameFreeze(false);
      setAlert(null);
    })();
  }, [totalRows, totalCols, totalMines, boardTimestamp]);

  // Check if it's a win
  useEffect(() => {
    if (numberOfCorrectFlags === totalMines) {
      triggerAlert(
        "Well Done!",
        <span>
          You did it!
          <i className='fa fa-trophy ml-1' />
        </span>,
        "success"
      );
      setGameFreeze(true);
    }
  }, [numberOfCorrectFlags, totalMines]);

  const revealAllMines = () => {
    let updatedBoard = [...board];
    return updatedBoard.map((row) =>
      row.map((cell) => {
        if (
          (cell.isMine && !cell.isFlagged) ||
          (cell.isFlagged && !cell.isMine)
        ) {
          return {
            ...cell,
            isRevealed: true,
            missedMark: true,
          };
        } else {
          return cell;
        }
      })
    );
  };

  const clickHandler = (event, cellRow, cellCol) => {
    const currentCell = board[cellRow][cellCol];
    if (gameFreeze || currentCell.isRevealed) {
      return;
    }
    // Handle Shift + Click
    if (event.shiftKey) {
      toggleFlag(cellRow, cellCol);
      return;
    }
    // Handle Click Only
    if (currentCell.isFlagged) {
      return;
    }
    if (currentCell.isMine) {
      triggerAlert(
        "Oy Vey!",
        <span>
          It's a mine
          <i className='fa fa-bomb ml-1' />
        </span>,
        "danger"
      );
      currentCell.isLostTrigger = true;
      setBoard(revealAllMines());
      setGameFreeze(true);
      return;
    }
    if (!currentCell.isFlagged) {
      revealCell(cellRow, cellCol);
    }
  };

  const toggleFlag = (row, col) => {
    let updatedBoard = [...board];
    const currentCell = updatedBoard[row][col];
    if (currentCell.isFlagged) {
      // Remove Flag
      setRemainingFlags(remainingFlags + 1);
      if (currentCell.isMine) {
        setNumberOfCorrectFlags(numberOfCorrectFlags - 1);
      }
    } else {
      // Set New Flag
      if (remainingFlags > 0) {
        setRemainingFlags(remainingFlags - 1);
        if (currentCell.isMine) {
          setNumberOfCorrectFlags(numberOfCorrectFlags + 1);
        }
      } else {
        triggerAlert(
          "Out Of Flags!",
          <span>
            Try to remove a flag before adding a new one
            <i className='fa fa-flag ml-1' />
          </span>,
          "secondary",
          5000
        );
        return;
      }
    }
    // Toggle flag indication
    updatedBoard[row][col].isFlagged = !updatedBoard[row][col].isFlagged;
    setBoard(updatedBoard);
  };

  const revealCell = (originCellRow, originCellCol) => {
    let updatedBoard = [...board];
    let currentCell = updatedBoard[originCellRow][originCellCol];
    currentCell.isRevealed = true;
    if (currentCell.mineNeighbours === 0) {
      updatedBoard = revealNeighbours(updatedBoard, currentCell);
    }
    setBoard(updatedBoard);
  };

  const revealNeighbours = (updatedBoard, originCell) => {
    const originRow = originCell.cellRow;
    const originCol = originCell.cellCol;
    for (let xOffSet = -1; xOffSet <= 1; xOffSet++) {
      let cellRow = originRow + xOffSet;
      if (cellRow < 0 || cellRow >= totalRows) continue;
      for (let yOffSet = -1; yOffSet <= 1; yOffSet++) {
        let cellCol = originCol + yOffSet;
        if (cellCol < 0 || cellCol >= totalCols) continue;
        let cellToCheck = updatedBoard[cellRow][cellCol];
        if (
          !cellToCheck.isRevealed &&
          !cellToCheck.isMine &&
          !cellToCheck.isFlagged
        ) {
          revealCell(cellToCheck.cellRow, cellToCheck.cellCol);
        }
      }
    }
    return updatedBoard;
  };

  const renderBoard = () =>
    board.map((row, i) =>
      row.map((cell, j) => (
        <div key={`${i},${j}`}>
          <Cell
            cellRow={i}
            cellCol={j}
            isMine={cell.isMine}
            mineNeighbours={cell.mineNeighbours}
            isRevealed={cell.isRevealed}
            isFlagged={cell.isFlagged}
            isLostTrigger={cell.isLostTrigger}
            missedMark={cell.missedMark}
            clickHandler={clickHandler}
          />
        </div>
      ))
    );

  const [alert, setAlert] = useState(null);
  const triggerAlert = (header, msg, type, timeout) => {
    setAlert({
      header,
      msg,
      type,
    });
    if (timeout > 0) {
      setTimeout(() => setAlert(null), timeout);
    }
  };

  return (
    <Fragment>
      <Alert alert={alert} />
      <div className='container'>
        <FlagCounter remainingFlags={remainingFlags} />
      </div>
      <div
        className='game-board'
        style={{
          gridTemplateColumns: `repeat(${totalCols}, ${CELL_SIZE}px)`,
        }}
      >
        {renderBoard()}
      </div>
    </Fragment>
  );
};

export default GameBoard;
