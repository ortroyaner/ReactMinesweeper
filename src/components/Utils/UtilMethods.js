const initBoardCells = (board, totalRows, totalCols, totalMines) => {
  for (let i = 0; i < totalRows; i++) {
    board.push([]);
    for (let j = 0; j < totalCols; j++) {
      board[i].push({
        cellRow: i,
        cellCol: j,
        isRevealed: false,
        isMine: false,
        isFlagged: false,
        isLostTrigger: false,
        missedMark: false,
        mineNeighbours: 0,
      });
    }
  }
};

const setMines = (board, totalRows, totalCols, totalMines) => {
  const setNeighboursMines = (board) => {
    const countNeighboursMines = (row, col) => {
      if (board[row][col].isMine) {
        return -1;
      }
      let totalNeighboursMines = 0;
      for (let xOffSet = -1; xOffSet <= 1; xOffSet++) {
        let cellRow = row + xOffSet;
        if (cellRow < 0 || cellRow >= totalRows) continue;
        for (let yOffSet = -1; yOffSet <= 1; yOffSet++) {
          let cellCol = col + yOffSet;
          if (cellCol < 0 || cellCol >= totalCols) continue;
          if (board[cellRow][cellCol].isMine) {
            totalNeighboursMines++;
          }
        }
      }
      return totalNeighboursMines;
    };

    board.map((row, i) =>
      row.map(
        (_, j) =>
          (board[i][j] = {
            ...board[i][j],
            mineNeighbours: countNeighboursMines(i, j),
          })
      )
    );
  };
  let mineCounter = 0;
  while (mineCounter < totalMines) {
    const randomRow = Math.floor(Math.random() * totalRows);
    const randomCol = Math.floor(Math.random() * totalCols);
    const cell = board[randomRow][randomCol];
    if (!cell.isMine) {
      board[randomRow][randomCol] = {
        ...cell,
        isMine: true,
      };
      mineCounter++;
    }
    setNeighboursMines(board);
  }
};

export const createBoard = (totalRows, totalCols, totalMines) => {
  let board = [];
  initBoardCells(board, totalRows, totalCols, totalMines);
  setMines(board, totalRows, totalCols, totalMines);
  return board;
};
