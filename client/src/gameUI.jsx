import React from "react";
import "./styles/gameUI.css"; 


const GameUI = () => {

// Button click handlers
const handleLogin = () => {
  alert("Login clicked!");
};  
const handleStartGame = () => {
  alert("Start Game clicked!");
};
const handleBattleClick = () => {
  alert("Entering Battle... Prepare for combat! ⚔️");
  // You can replace this with navigation or game logic later
};

  return (
    <div className="">
      {/* Header Section */}
      <header className="game-header">
        <p>Build-A-Terror Workshop</p>
        <div className="header-buttons">
          <button className="button" onClick={handleLogin}>Login</button>
          <button className="button" onClick={handleStartGame}>Start Game</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow grid grid-cols-2 gap-4 p-8">
        {/* Left Panel */}
        <section className="left-container">
          <p className="text-ancientBone">Build Your Monster</p>
        </section>

        {/* Right Panel */}
        <section className="right-container">
          <button className="battle-button" onClick={handleBattleClick}>
            Battle An Opponent
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="game-footer">
        <p>© 2025 Build-A-Terror. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default GameUI; 

// This component represents the main game UI for the Build-A-Terror game.
// It includes a header, main content area with two panels (Inventory and Gacha Summons), and a footer.
// The UI is styled using custom CSS classes for a unique look and feel.