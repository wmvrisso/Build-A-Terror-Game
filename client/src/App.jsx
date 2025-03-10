import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// TODO: uncomment once we decide if we want to have seperate header/footer components
// import Header from './components/Header'
// import Footer from './components/Footer'
import GameUI from "./gameUI.jsx";
//import "./App.css";  TODO: uncomment once App.css file is pushed to directory

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* TODO: plug-in any other route paths */}
        {/* TODO: figure out which page is the main page -- gameUI.jsx? */}
        <Route path="/" element={<GameUI />} />
        {/* <Route path="/" element={} />
        <Route path="/" element={} />
        <Route path="/" element={} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
