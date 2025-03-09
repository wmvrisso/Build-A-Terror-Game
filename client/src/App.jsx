import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// TODO: uncomment once we decide if we want to have seperate header/footer components
// import Header from './components/Header'
// import Footer from './components/Footer'
import GameUI from "./gameUI";
import "./input.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* need to include other pathways if there are any */}
        {/* TODO: figure out which one of the files is going to be the main page */}
        <GameUI />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
