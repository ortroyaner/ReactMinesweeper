import React from "react";
import Navbar from "./components/layout/Navbar/Navbar";
import GameBoard from "./components/GameBoard/GameBoard";
import GameInfoState from "./context/GameInfo/GameInfoState";
import "./MinesweeperApp.css";

const MinesweeperApp = () => {
  const setGameInfo = () => {};
  return (
    <GameInfoState>
      <div className='minesweeperApp'>
        <Navbar />
        <div className='container jumbotron text-center mt-5'>
          <div className='container game-board-container'>
            <GameBoard />
          </div>
        </div>
      </div>
    </GameInfoState>
  );
};

export default MinesweeperApp;
