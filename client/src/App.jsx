import React, { useState } from "react";
import Phaser from "phaser";
import PhaserGame from "./components/PhaserGame";

// This is the main entry point for the React application. It imports the PhaserGame component and sets up the main game UI.
function App() {
  // The sprite can only be moved in the MainMenu Scene
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef();
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

  const changeScene = () => {
    const scene = phaserRef.current.scene;

    if (scene) {
      scene.changeScene();
    }
  };

  const moveSprite = () => {
    const scene = phaserRef.current.scene;

    if (scene && scene.scene.key === "MainMenu") {
      // Get the update logo position
      scene.moveLogo(({ x, y }) => {
        setSpritePosition({ x, y });
      });
    }
  };

  const addSprite = () => {
    const scene = phaserRef.current.scene;

    if (scene) {
      // Add more stars
      const x = Phaser.Math.Between(64, scene.scale.width - 64);
      const y = Phaser.Math.Between(64, scene.scale.height - 64);

      //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
      const star = scene.add.sprite(x, y, "star");

      //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
      //  You could, of course, do this from within the Phaser Scene code, but this is just an example
      //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
      scene.add.tween({
        targets: star,
        duration: 500 + Math.random() * 1000,
        alpha: 0,
        yoyo: true,
        repeat: -1,
      });
    }
  };

  // Event emitted from the PhaserGame component
  const currentScene = (scene) => {
    setCanMoveSprite(scene.scene.key !== "MainMenu");
  };

  return (
    <div id="app">
      <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
      <div>
        <div>
          <button className="button" onClick={changeScene}>
            Change Scene
          </button>
        </div>
        <div>
          <button
            disabled={canMoveSprite}
            className="button"
            onClick={moveSprite}
          >
            Toggle Movement
          </button>
        </div>
        <div className="spritePosition">
          Sprite Position:
          <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
        </div>
        <div>
          <button className="button" onClick={addSprite}>
            Add New Sprite
          </button>
        </div>
      </div>
    </div>
  );
}

// The components below represent the main game UI for the Build-A-Terror game.
// It includes a header, main content area with two panels (build your monster and battle field), and a footer.
// The UI is styled using custom CSS classes for a unique look and feel.
const GameUI = () => {
  // Button click handlers
  const handleStartGame = () => {
    alert("Start Game clicked!");
  };
  const handleBattleClick = () => {
    alert("Entering Battle... Prepare for combat! ⚔️");
    // You can replace this with navigation or game logic later
  };

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Button click handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful");
    } catch (error) {
      setMessage("Invalid credentials");
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      setMessage("Account created successfully");
    } catch (error) {
      setMessage("Error creating account");
    }
  };

  return (
    <div className="">
      {/* Header Section */}
      <header className="game-header">
        <p>Build-A-Terror Workshop</p>
        <div className="header-buttons">
          <button className="button" onClick={handleLogin}>
            Login
          </button>
          <button className="button" onClick={handleStartGame}>
            Start Game
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container">
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
        <PhaserGame currentActiveScene={GameScene}></PhaserGame>
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

export default { GameUI, App };
