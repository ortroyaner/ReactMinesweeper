import React, { useState, useContext } from "react";
import GameInfoContext from "../../context/GameInfo/GameInfoContext";

const GameInfoForm = () => {
  const gameInfoContext = useContext(GameInfoContext);

  const [totalRows, setTotalRows] = useState(gameInfoContext.totalRows);
  const [totalCols, setTotalCols] = useState(gameInfoContext.totalCols);
  const [totalMines, setTotalMines] = useState(gameInfoContext.totalMines);

  const onSubmit = (e) => {
    e.preventDefault();
    if (totalRows === "") {
      //alertContext.setAlert('Please enter something', 'light');
    } else {
      gameInfoContext.setTotalRows(parseInt(totalRows));
      gameInfoContext.setTotalCols(parseInt(totalCols));
      gameInfoContext.setTotalMines(parseInt(totalMines));
    }
  };

  const onChangeRows = (e) => setTotalRows(e.target.value);
  const onChangeCols = (e) => setTotalCols(e.target.value);
  const onChangeMines = (e) => setTotalMines(e.target.value);

  return (
    <form onSubmit={onSubmit} className='form-inline mt-2 mt-md-0'>
      <div className='form-row col-sm-10 ml-auto'>
        <div className='form-group col-sm-3'>
          <label htmlFor='totalRowsInput' className='text-light mr-2'>
            Rows:
          </label>
          <input
            id='totalRowsInput'
            className='form-control mr-sm-2 col-sm-5'
            type='number'
            value={totalRows}
            onChange={onChangeRows}
          />
        </div>
        <div className='form-group col-sm-3'>
          <label htmlFor='totalColsInput' className='text-light mr-2'>
            Columns:
          </label>
          <input
            id='totalColsInput'
            className='form-control mr-sm-2 col-sm-5'
            type='number'
            value={totalCols}
            onChange={onChangeCols}
          />
        </div>
        <div className='form-group col-sm-3'>
          <label htmlFor='totalMinesInput' className='text-light mr-2'>
            Mines:
          </label>
          <input
            id='totalMinesInput'
            className='form-control mr-sm-2 col-sm-5'
            type='number'
            value={totalMines}
            onChange={onChangeMines}
          />
        </div>
        <button className='btn btn-success my-2 my-sm-0 mr-3' type='submit'>
          New Game
        </button>
      </div>
    </form>
  );
};

export default GameInfoForm;
