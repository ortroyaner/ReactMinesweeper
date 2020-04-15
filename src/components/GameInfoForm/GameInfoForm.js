import React, { useState, useContext } from "react";
import GameInfoContext from "../../context/GameInfo/GameInfoContext";

const GameInfoForm = () => {
  const gameInfoContext = useContext(GameInfoContext);

  const [totalRows, setTotalRows] = useState(gameInfoContext.getTotalRows());
  const [totalCols, setTotalCols] = useState(gameInfoContext.getTotalCols());
  const [totalMines, setTotalMines] = useState(gameInfoContext.getTotalMines());

  const onSubmit = (e) => {
    e.preventDefault();
    gameInfoContext.setTotalRows(parseInt(totalRows));
    gameInfoContext.setTotalCols(parseInt(totalCols));
    gameInfoContext.setTotalMines(parseInt(totalMines));
    localStorage.removeItem("board");
    gameInfoContext.setBoardTimestamp(new Date().getTime());
  };

  const onChangeRows = (e) => setTotalRows(e.target.value);
  const onChangeCols = (e) => setTotalCols(e.target.value);
  const onChangeMines = (e) => setTotalMines(e.target.value);

  return (
    <form onSubmit={onSubmit}>
      <div className='row'>
        <div className='col-md-8 col-centered mx-auto'>
          <div className='row'>
            <div className='col-md-3'>
              <div className='input-group mb-1'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <i className='fa fa-align-justify' aria-hidden='true' />
                  </span>
                </div>
                <input
                  id='totalRowsInput'
                  className='form-control'
                  type='number'
                  min='1'
                  max='300'
                  value={totalRows}
                  onChange={onChangeRows}
                  aria-label='Rows'
                />
              </div>
            </div>
            <div className='col-md-3'>
              <div className='input-group mb-1'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <i
                      className='fa fa-align-justify fa-rotate-90'
                      aria-hidden='true'
                    />
                  </span>
                </div>
                <input
                  id='totalColsInput'
                  className='form-control'
                  type='number'
                  min='1'
                  max='300'
                  value={totalCols}
                  onChange={onChangeCols}
                  aria-label='Cols'
                />
              </div>
            </div>

            <div className='col-md-3'>
              <div className='input-group mb-1'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <i className='fa fa-bomb' aria-hidden='true' />
                  </span>
                </div>
                <input
                  id='totalMinesInput'
                  className='form-control'
                  type='number'
                  min='1'
                  max={totalRows * totalCols}
                  value={totalMines}
                  onChange={onChangeMines}
                  aria-label='Mines'
                />
              </div>
            </div>
            <div className='col-md-3 mb-1'>
              <button className='btn btn-success btn-block' type='submit'>
                New Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default GameInfoForm;
