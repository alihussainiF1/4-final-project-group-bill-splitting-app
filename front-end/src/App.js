// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Bill from "./Bill";
import Account from "./Account"; // <-- Import the Account component

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Routes>
            <Route path="/bill" element={<Bill />} />
            <Route path="/account" element={<Account />} /> {/* <-- Add this line for the Account route */}
            <Route path="/" element={<div><p>Edit <code>src/App.js</code> and save to reload.</p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a></div>} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
