import React, { useReducer } from "react";
import GameInfoContext from "./GameInfoContext";
import GameInfoReducer from "./GameInfoReducer";
import { SET_TOTAL_ROWS, SET_TOTAL_COLS, SET_TOTAL_MINES } from "../types";
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
  };
  const [state, dispatch] = useReducer(GameInfoReducer, initialState);

  const setTotalRows = (newTotalRows) =>
    dispatch({ type: SET_TOTAL_ROWS, payload: newTotalRows });
  const setTotalCols = (newTotalCols) =>
    dispatch({ type: SET_TOTAL_COLS, payload: newTotalCols });
  const setTotalMines = (newTotalMines) =>
    dispatch({ type: SET_TOTAL_MINES, payload: newTotalMines });

  return (
    <GameInfoContext.Provider
      value={{
        totalRows: state.totalRows,
        totalCols: state.totalCols,
        totalMines: state.totalMines,
        setTotalRows,
        setTotalCols,
        setTotalMines,
      }}
    >
      {props.children}
    </GameInfoContext.Provider>
  );
};

export default GameInfoState;
