import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameUI from "./gameUI.jsx";
import Header from "./components/Header"; // Uncomment if needed
import Footer from "./components/Footer"; // Uncomment if needed
import Left from "./components/Left";

function App() {
  return (
    <Router>
      <Header />
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Left section added here */}
        <Left />

        {/* Right section (Routes) */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<GameUI />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
