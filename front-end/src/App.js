import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Event from "./components/Event";
import './index.css';
import './App.css';
import logo from './logo.svg';
import Login from "./components/Login";
import Navbar from "./components/Navbar"; // Import the Navbar component
import Home from "./components/Home"; // Import your Home component
import Bill from "./Bill";
import Account from "./Account"; // <-- Import the Account component

function App() {

  // used to keep track of which specific event the user choose to see
  const [event, setEvent] = useState({})

  return (

  <div className="container">
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<Event event={event} />} />
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
          <Navbar />
        </header>
      </div>
    </Router>
  </div>

  );
}

export default App;
