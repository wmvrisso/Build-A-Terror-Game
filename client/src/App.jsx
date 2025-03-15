import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameUI from "./gameUI.jsx";


 
// import Left from "./components/Left";

import Header from "./components/Header"; // Uncomment if needed
import Footer from "./components/Footer"; // Uncomment if needed



const App = () => {
  return (

    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<GameUI />} />
      </Routes>
      <Footer />
    </Router>

  );
};

export default App;
