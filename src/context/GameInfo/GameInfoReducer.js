import { SET_TOTAL_ROWS, SET_TOTAL_COLS, SET_TOTAL_MINES } from "../types";

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
  }
};
