export const getGameFreezeFromDS = () =>
  localStorage.getItem("gameFreeze") === "true";

export const getRemainingFlagsFromDS = () =>
  parseInt(localStorage.getItem("remainingFlags"));

export const getNumberOfCorrectFlagsFromDS = () =>
  parseInt(localStorage.getItem("numberOfCorrectFlags"));

export const getTotalRowsFromDS = () =>
  parseInt(localStorage.getItem("totalRows"));

export const getTotalColsFromDS = () =>
  parseInt(localStorage.getItem("totalCols"));

export const getTotalMinesFromDS = () =>
  parseInt(localStorage.getItem("totalMines"));

export const getBoardTimestampFromDS = () =>
  localStorage.getItem("boardTimestamp");

export const getIsRevealModeFromDS = () =>
  localStorage.getItem("isRevealMode") === "true";

export const setGameFreezeToDS = (newValue) =>
  localStorage.setItem("gameFreeze", newValue);

export const setRemainingFlagsToDS = (newValue) =>
  localStorage.setItem("remainingFlags", newValue);

export const setNumberOfCorrectFlagsToDS = (newValue) =>
  localStorage.setItem("numberOfCorrectFlags", newValue);

export const setTotalRowsToDS = (newTotalRows) =>
  localStorage.setItem("totalRows", newTotalRows);

export const setTotalColsToDS = (newTotalCols) =>
  localStorage.setItem("totalCols", newTotalCols);

export const setTotalMinesToDS = (newTotalMines) =>
  localStorage.setItem("totalMines", newTotalMines);

export const setBoardTimestampToDS = (newTimestamp) =>
  localStorage.setItem("boardTimestamp", newTimestamp);

export const setIsRevealModeToDS = (newIsRevealMode) =>
  localStorage.setItem("isRevealMode", newIsRevealMode);

export const clearDS = () => {
  localStorage.clear();
};
