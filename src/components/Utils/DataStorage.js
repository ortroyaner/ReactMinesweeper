export const getGameFreezeFromDS = () =>
  localStorage.getItem("gameFreeze") === "true";

export const getRemainingFlagsFromDS = () =>
  parseInt(localStorage.getItem("remainingFlags"));

export const getNumberOfCorrectFlagsFromDS = () =>
  parseInt(localStorage.getItem("numberOfCorrectFlags"));

export const setGameFreezeToDS = (newValue) =>
  localStorage.setItem("gameFreeze", newValue);

export const setRemainingFlagsToDS = (newValue) =>
  localStorage.setItem("remainingFlags", newValue);

export const setNumberOfCorrectFlagsToDS = (newValue) =>
  localStorage.setItem("numberOfCorrectFlags", newValue);

export const clearDS = () => {
  localStorage.clear();
};
