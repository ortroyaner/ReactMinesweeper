import React from "react";
import Navbar from "./components/layout/Navbar/Navbar";
import GameBoard from "./components/GameBoard/GameBoard";
import GameInfoState from "./context/GameInfo/GameInfoState";
import "./MinesweeperApp.css";
import GameInfoForm from "./components/GameInfoForm/GameInfoForm";

const MinesweeperApp = () => {
  return (
    <GameInfoState>
      <div className='minesweeperApp'>
        <Navbar />
        <div className='container mt-3'>
          <GameInfoForm />
        </div>
        <div className='container jumbotron text-center mt-3 py-4 dark-background'>
          <div className='container game-board-container'>
            <GameBoard />
          </div>
        </div>
      </div>
    </GameInfoState>
  );
};

export default MinesweeperApp;
