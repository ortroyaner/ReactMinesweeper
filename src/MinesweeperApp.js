import React from "react";
import Navbar from "./components/layout/Navbar/Navbar";
import GameBoard from "./components/GameBoard/GameBoard";
import GameInfoState from "./context/GameInfo/GameInfoState";
import "./MinesweeperApp.css";
import GameInfoForm from "./components/GameInfoForm/GameInfoForm";
import HowToPlay from "./components/layout/HowToPlay/HowToPlay";
import { clearDS } from "./components/Utils/DataStorage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    clearDS();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='container'>
          <h1 className='text-white'>Something went wrong.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

const MinesweeperApp = () => {
  return (
    <ErrorBoundary>
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
          <HowToPlay />
        </div>
      </GameInfoState>
    </ErrorBoundary>
  );
};

export default MinesweeperApp;
