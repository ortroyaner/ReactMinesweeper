import {
  SET_TOTAL_ROWS,
  SET_TOTAL_COLS,
  SET_TOTAL_MINES,
  SET_BOARD_TIMESTAMP,
  SET_IS_REVEAL_MODE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_TOTAL_ROWS:
      return {
        ...state,
        totalRows: action.payload,
      };
    case SET_TOTAL_COLS:
      return {
        ...state,
        totalCols: action.payload,
      };
    case SET_TOTAL_MINES:
      return {
        ...state,
        totalMines: action.payload,
      };
    case SET_BOARD_TIMESTAMP:
      return {
        ...state,
        boardTimestamp: action.payload,
      };
    case SET_IS_REVEAL_MODE:
      return {
        ...state,
        isRevealMode: action.payload,
      };
    default:
      return;
  }
};
