// import Boot from "./phaser/scenes/Boot";
// import Game from "./phaser/scenes/GameScene";
// import GameOver from "./phaser/scenes/GameOver";
// import MainMenu from "./phaser/scenes/MainMenu";
// import Preloader from "./phaser/scenes/Preloader";

import React, {useState} from "react";
import "./styles/gameUI.css"; 
import PhaserGame from "./components/PhaserGame";
import GameScene from "./phaser/scenes/GameScene";

const GameUI = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

// Button click handlers
const handleLogin = async (e) => {
  e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", { username, password });
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful");
    } catch (error) {
      setMessage("Invalid credentials");
    }
  };
 

const handleCreateAccount = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:5000/register", { username, password });
    setMessage("Account created successfully");
  } catch (error) {
    setMessage("Error creating account");
  }
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
        <PhaserGame currentActiveScene={GameScene}>

        </PhaserGame>
      </main>

      {showLoginForm && (
        <div className="login-overlay">
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Login
              </button>
            </form>
            <h2>Create Account</h2>
            <form onSubmit={handleCreateAccount}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Create Account
              </button>
            </form>
            {message && <p className="message">{message}</p>}
            <button
              className="close-button"
              onClick={() => setShowLoginForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

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