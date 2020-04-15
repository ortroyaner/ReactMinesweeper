import React from "react";

export const DEFAULT_TOTAL_ROWS = 9;
export const DEFAULT_TOTAL_COLS = 9;
export const DEFAULT_TOTAL_MINES = 10;

export const CELL_SIZE = 30;

export const SUCCESS_MESSAGE = {
  header: "Mazal Tov!",
  content: (
    <span>
      You did it!
      <i className='fa fa-trophy ml-1' />
    </span>
  ),
  type: "success",
  timeout: null,
};

export const MINE_MESSAGE = {
  header: "Oy Vey!",
  content: (
    <span>
      It's a mine
      <i className='fa fa-bomb ml-1' />
    </span>
  ),
  type: "danger",
  timeout: null,
};

export const FLAG_MESSAGE = {
  header: "Out Of Flags!",
  content: (
    <span>
      Try to remove a flag before adding a new one
      <i className='fa fa-flag ml-1' />
    </span>
  ),
  type: "secondary",
  timeout: 5000,
};
