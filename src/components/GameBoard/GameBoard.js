import React, {
  useState,
  useEffect,
  useContext,
  Fragment,
  useCallback,
} from "react";
import GameInfoContext from "../../context/GameInfo/GameInfoContext";
import Cell from "../Cell/Cell";
import "./GameBoard.css";
import {
  CELL_SIZE,
  SUCCESS_MESSAGE,
  MINE_MESSAGE,
  FLAG_MESSAGE,
} from "../Utils/GameConstans";
import { createBoard } from "../Utils/UtilMethods";
import FlagCounter from "../FlagCounter/FlagCouner";
import Alert from "../Alert/Alert";
import {
  getGameFreezeFromDS,
  getRemainingFlagsFromDS,
  getNumberOfCorrectFlagsFromDS,
  setGameFreezeToDS,
  setRemainingFlagsToDS,
  setNumberOfCorrectFlagsToDS,
} from "../Utils/DataStorage";

const GameBoard = () => {
  const gameInfoContext = useContext(GameInfoContext);
  const totalRows = gameInfoContext.getTotalRows();
  const totalCols = gameInfoContext.getTotalCols();
  const totalMines = gameInfoContext.getTotalMines();
  const boardTimestamp = gameInfoContext.getBoardTimestamp();

  const getLocalStorageBoard = () => JSON.parse(localStorage.getItem("board"));

  const [board, setBoard] = useState(getLocalStorageBoard);
  const [gameFreeze, setGameFreeze] = useState(getGameFreezeFromDS() || false);
  const [remainingFlags, setRemainingFlags] = useState(
    getRemainingFlagsFromDS() || totalMines
  );
  const [numberOfCorrectFlags, setNumberOfCorrectFlags] = useState(
    getNumberOfCorrectFlagsFromDS() || 0
  );

  const storeAndSetGameFreeze = (newValue) => {
    setGameFreezeToDS(newValue);
    setGameFreeze(newValue);
  };

  const storeAndSetRemainingFlags = (newValue) => {
    setRemainingFlagsToDS(newValue);
    setRemainingFlags(newValue);
  };

  const storeAndSetNumberOfCorrectFlags = (newValue) => {
    setNumberOfCorrectFlagsToDS(newValue);
    setNumberOfCorrectFlags(newValue);
  };

  const [alert, setAlert] = useState(null);
  const triggerAlert = useCallback((alert) => {
    setAlert(alert);
    if (alert && alert.timeout > 0) {
      setTimeout(() => setAlert(null), alert.timeout);
    }
  }, []);

  useEffect(() => {
    (() => {
      //Reset board
      if (!getLocalStorageBoard()) {
        setBoard(createBoard(totalRows, totalCols, totalMines));
        storeAndSetNumberOfCorrectFlags(0);
        storeAndSetRemainingFlags(totalMines);
        storeAndSetGameFreeze(false);
        setAlert(null);
      }
    })();
  }, [totalRows, totalCols, totalMines, boardTimestamp]);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  }, [board]);

  const checkForWin = useCallback(
    (numberOfCorrectFlags, totalMines) => {
      if (numberOfCorrectFlags === totalMines) {
        triggerAlert(SUCCESS_MESSAGE);
        storeAndSetGameFreeze(true);
      } else {
        triggerAlert(null);
        storeAndSetGameFreeze(false);
      }
    },
    [triggerAlert]
  );

  useEffect(() => checkForWin(numberOfCorrectFlags, totalMines), [
    numberOfCorrectFlags,
    totalMines,
    triggerAlert,
    checkForWin,
  ]);

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
    updateBoardAfterInteraction(event.shiftKey, cellRow, cellCol);
  };

  const rightClickHandler = (event, cellRow, cellCol) => {
    event.preventDefault && event.preventDefault();
    event.stopPropagation && event.stopPropagation();
    updateBoardAfterInteraction(true, cellRow, cellCol);
    return false;
  };

  const longTouchHandler = (cellRow, cellCol) => {
    updateBoardAfterInteraction(true, cellRow, cellCol);
  };

  const updateBoardAfterInteraction = (isFlagChange, cellRow, cellCol) => {
    const currentCell = board[cellRow][cellCol];
    if (gameFreeze || currentCell.isRevealed) {
      return;
    }
    if (isFlagChange) {
      toggleFlag(cellRow, cellCol);
      return;
    }
    if (currentCell.isFlagged) {
      return;
    }
    if (currentCell.isMine) {
      triggerAlert(MINE_MESSAGE);
      currentCell.isLostTrigger = true;
      setBoard(revealAllMines());
      storeAndSetGameFreeze(true);
      return;
    }
    if (!currentCell.isFlagged) {
      revealCell(cellRow, cellCol);
    }
  };

  const toggleFlag = (row, col) => {
    const removeFlag = (remainingFlags, isMine, numberOfCorrectFlags) => {
      storeAndSetRemainingFlags(remainingFlags + 1);
      if (isMine) {
        storeAndSetNumberOfCorrectFlags(numberOfCorrectFlags - 1);
      }
    };
    const setNewFlag = (remainingFlags, isMine, numberOfCorrectFlags) => {
      storeAndSetRemainingFlags(remainingFlags - 1);
      if (currentCell.isMine) {
        storeAndSetNumberOfCorrectFlags(numberOfCorrectFlags + 1);
      }
    };
    let updatedBoard = [...board];
    const currentCell = updatedBoard[row][col];
    if (currentCell.isFlagged) {
      removeFlag(remainingFlags, currentCell.isMine, numberOfCorrectFlags);
    } else {
      if (remainingFlags > 0) {
        setNewFlag(remainingFlags, currentCell.isMine, numberOfCorrectFlags);
      } else {
        triggerAlert(FLAG_MESSAGE);
        return;
      }
    }
    updatedBoard[row][col].isFlagged = !updatedBoard[row][col].isFlagged;
    setBoard(updatedBoard);
  };

  const revealCell = (originCellRow, originCellCol) => {
    let updatedBoard = [...board];
    updatedBoard = revealCellAux(updatedBoard, originCellRow, originCellCol);
    setBoard(updatedBoard);
  };
  const revealCellAux = (updatedBoard, originCellRow, originCellCol) => {
    let currentCell = updatedBoard[originCellRow][originCellCol];
    currentCell.isRevealed = true;
    if (currentCell.mineNeighbours === 0) {
      updatedBoard = revealNeighbours(updatedBoard, currentCell);
    }
    return updatedBoard;
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
          revealCellAux(updatedBoard, cellToCheck.cellRow, cellToCheck.cellCol);
        }
      }
    }
    return updatedBoard;
  };

  const renderBoard = () =>
    board &&
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
            rightClickHandler={rightClickHandler}
            touchHandler={longTouchHandler}
          />
        </div>
      ))
    );

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
