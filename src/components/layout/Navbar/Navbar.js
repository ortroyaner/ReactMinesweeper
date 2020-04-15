import React from "react";
import GameInfoForm from "../../GameInfoForm/GameInfoForm";
// import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
      <a className='navbar-brand' href='#'>
        <i className='fa fa-bomb' /> ReactJS Minesweeper
      </a>
      <button
        className='navbar-toggler collapsed'
        type='button'
        data-toggle='collapse'
        data-target='#navbarCollapse'
        aria-controls='navbarCollapse'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='navbar-collapse collapse' id='navbarCollapse'>
        <GameInfoForm />
        <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>
          <i className='fa fa-eye' /> Reveal All Cells
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
