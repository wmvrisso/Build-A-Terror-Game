import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// import Boot from "./phaser/scenes/Boot";
// import Game from "./phaser/scenes/GameScene";
// import GameOver from "./phaser/scenes/GameOver";
// import MainMenu from "./phaser/scenes/MainMenu";
// import Preloader from "./phaser/scenes/Preloader";
// import React from "react";
// import * as ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import Phaser from "phaser";

// console.log("🚀 Initializing Game..."); //debug line to check if index.js is even being run.

// // Expose React for debugging
// window.React = React;
// window.ReactDOM = ReactDOM;

// // Phaser Game Config
// const config = {
//   type: Phaser.AUTO,
//   width: 1024,
//   height: 768,
//   parent: "game-container",
//   backgroundColor: "#028af8",
//   scale: {
//     mode: Phaser.Scale.FIT,
//     autoCenter: Phaser.Scale.CENTER_BOTH,
//   },
//   scene: [Boot, Preloader, MainMenu, Game, GameOver],
// };

// // Ensure Phaser initializes only once
// if (!window.phaserGame) {
//   console.log("Initializing Phaser...");
//   window.phaserGame = new Phaser.Game(config);
//   console.log("Phaser Initialized:", window.phaserGame);
// } else {
//   console.warn("Phaser already initialized.");
// }

// // ✅ Debugging: Check if Phaser is correctly assigned
// setTimeout(() => {
//   console.log("🔍 Debug Phaser Object:", window.phaserGame);
// }, 1000);

// Mount React
// const container = document.getElementById("root");

// // Ensure React is only mounted once
// if (!container.__reactRoot) {
//     const root = ReactDOM.createRoot(container);
//     root.render(
//         <React.StrictMode>
//             <App />
//         </React.StrictMode>
//     );
//     container.__reactRoot = root; // Store reference to avoid duplicate mounts
// } else {
//     console.warn("React is already mounted.");
// }


// export default window.phaserGame;
