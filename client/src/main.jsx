import React from "react";
import * as ReactDOM from "react-dom/client";
import GameUI from "./gameUI";
import Phaser from "phaser";
import "./output.css"; 
import "./index.jsx";


// Expose React for debugging
window.React = React;
window.ReactDOM = ReactDOM;
window.Phaser = Phaser; // Expose Phaser

// Mount React
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <GameUI />
    </React.StrictMode>
);
