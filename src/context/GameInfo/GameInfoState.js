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

  const setTotalRows = (newTotalRows) =>
    dispatch({ type: SET_TOTAL_ROWS, payload: newTotalRows });
  const setTotalCols = (newTotalCols) =>
    dispatch({ type: SET_TOTAL_COLS, payload: newTotalCols });
  const setTotalMines = (newTotalMines) =>
    dispatch({ type: SET_TOTAL_MINES, payload: newTotalMines });
  const setBoardTimestamp = (newTimestamp) =>
    dispatch({ type: SET_BOARD_TIMESTAMP, payload: newTimestamp });
  const setIsRevealMode = (newIsRevealMode) =>
    dispatch({ type: SET_IS_REVEAL_MODE, payload: newIsRevealMode });

  return (
    <GameInfoContext.Provider
      value={{
        totalRows: state.totalRows,
        totalCols: state.totalCols,
        totalMines: state.totalMines,
        boardTimestamp: state.boardTimestamp,
        isRevealMode: state.isRevealMode,
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
