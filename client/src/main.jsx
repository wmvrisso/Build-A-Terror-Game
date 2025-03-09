import React from "react";
import ReactDOM from "react-dom/client";
import GameUI from "./gameUI";
import "./output.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <GameUI />
    </React.StrictMode>
);