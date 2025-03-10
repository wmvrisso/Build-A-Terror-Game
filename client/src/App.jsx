import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// TODO: uncomment once we decide if we want to have seperate header/footer components
// import Header from './components/Header'
// import Footer from './components/Footer'
import GameUI from "./gameUI.jsx";
import "./App.css"; 

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* TODO: figure out which page is the main page -- gameUI.jsx? */}
        <Route path="/" element={<GameUI />} />
        {/* TODO: plug-in any other route paths */}
        {/* <Route path="/" element={} />
        <Route path="/" element={} />
        <Route path="/" element={} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
