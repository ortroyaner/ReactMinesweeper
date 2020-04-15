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
import {
  getTotalRowsFromDS,
  getTotalColsFromDS,
  getTotalMinesFromDS,
  getBoardTimestampFromDS,
  getIsRevealModeFromDS,
  setTotalRowsToDS,
  setTotalColsToDS,
  setTotalMinesToDS,
  setBoardTimestampToDS,
  setIsRevealModeToDS,
} from "../../components/Utils/DataStorage";
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
    const totalRows = getTotalRowsFromDS();
    return totalRows ? totalRows : state.totalRows;
  };

  const getTotalCols = () => {
    const totalCols = getTotalColsFromDS();
    return totalCols ? totalCols : state.totalCols;
  };

  const getTotalMines = () => {
    const totalMines = getTotalMinesFromDS();
    return totalMines ? totalMines : state.totalMines;
  };

  const getBoardTimestamp = () => {
    const boardTimestamp = getBoardTimestampFromDS();
    return boardTimestamp ? boardTimestamp : state.boardTimestamp;
  };

  const getIsRevealMode = () => {
    const isRevealMode = getIsRevealModeFromDS();
    return isRevealMode ? isRevealMode : state.isRevealMode;
  };

  const setTotalRows = (newTotalRows) => {
    setTotalRowsToDS(newTotalRows);
    dispatch({ type: SET_TOTAL_ROWS, payload: newTotalRows });
  };
  const setTotalCols = (newTotalCols) => {
    setTotalColsToDS(newTotalCols);
    dispatch({ type: SET_TOTAL_COLS, payload: newTotalCols });
  };
  const setTotalMines = (newTotalMines) => {
    setTotalMinesToDS(newTotalMines);
    dispatch({ type: SET_TOTAL_MINES, payload: newTotalMines });
  };
  const setBoardTimestamp = (newTimestamp) => {
    setBoardTimestampToDS(newTimestamp);
    dispatch({ type: SET_BOARD_TIMESTAMP, payload: newTimestamp });
  };
  const setIsRevealMode = (newIsRevealMode) => {
    setIsRevealModeToDS(newIsRevealMode);
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
