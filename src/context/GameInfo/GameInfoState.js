import React, { useReducer } from "react";
import GameInfoContext from "./GameInfoContext";
import GameInfoReducer from "./GameInfoReducer";
import {
  SET_TOTAL_ROWS,
  SET_TOTAL_COLS,
  SET_TOTAL_MINES,
  SET_BOARD_TIMESTAMP,
  SET_IS_REVEAL_MODE,
} from "../types";
import {
  DEFAULT_TOTAL_ROWS,
  DEFAULT_TOTAL_COLS,
  DEFAULT_TOTAL_MINES,
} from "../../components/Utils/GameConstans";
// import GameInfoForm from "../../components/GameInfoForm";

const GameInfoState = (props) => {
  // Default Values
  const initialState = {
    totalRows: DEFAULT_TOTAL_ROWS,
    totalCols: DEFAULT_TOTAL_COLS,
    totalMines: DEFAULT_TOTAL_MINES,
    boardTimestamp: new Date().getTime(),
    isRevealMode: false,
  };
  const [state, dispatch] = useReducer(GameInfoReducer, initialState);

  const getTotalRows = () => {
    let localStorageInfo = parseInt(localStorage.getItem("totalRows"));
    return localStorageInfo ? localStorageInfo : state.totalRows;
  };

  const getTotalCols = () => {
    let localStorageInfo = parseInt(localStorage.getItem("totalCols"));
    return localStorageInfo ? localStorageInfo : state.totalCols;
  };

  const getTotalMines = () => {
    let localStorageInfo = parseInt(localStorage.getItem("totalMines"));
    return localStorageInfo ? localStorageInfo : state.totalMines;
  };

  const getBoardTimestamp = () => {
    let localStorageInfo = localStorage.getItem("boardTimestamp");
    return localStorageInfo ? localStorageInfo : state.boardTimestamp;
  };
  const getIsRevealMode = () => {
    let localStorageInfo = localStorage.getItem("isRevealMode") === "true";
    return localStorageInfo ? localStorageInfo : state.isRevealMode;
  };

  const setTotalRows = (newTotalRows) => {
    localStorage.setItem("totalRows", newTotalRows);
    dispatch({ type: SET_TOTAL_ROWS, payload: newTotalRows });
  };
  const setTotalCols = (newTotalCols) => {
    localStorage.setItem("totalCols", newTotalCols);
    dispatch({ type: SET_TOTAL_COLS, payload: newTotalCols });
  };
  const setTotalMines = (newTotalMines) => {
    localStorage.setItem("totalMines", newTotalMines);
    dispatch({ type: SET_TOTAL_MINES, payload: newTotalMines });
  };
  const setBoardTimestamp = (newTimestamp) => {
    localStorage.setItem("boardTimestamp", newTimestamp);
    dispatch({ type: SET_BOARD_TIMESTAMP, payload: newTimestamp });
  };
  const setIsRevealMode = (newIsRevealMode) => {
    localStorage.setItem("isRevealMode", newIsRevealMode);
    dispatch({ type: SET_IS_REVEAL_MODE, payload: newIsRevealMode });
  };

  return (
    <GameInfoContext.Provider
      value={{
        getTotalRows,
        getTotalCols,
        getTotalMines,
        getBoardTimestamp,
        getIsRevealMode,
        setTotalRows,
        setTotalCols,
        setTotalMines,
        setBoardTimestamp,
        setIsRevealMode,
      }}
    >
      {props.children}
    </GameInfoContext.Provider>
  );
};

export default GameInfoState;
