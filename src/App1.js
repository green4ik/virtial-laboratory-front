import React from 'react';
import './App.css';
import "@fontsource/mulish";
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Appp() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Navbar залишається завжди видимим */}

        {/* Основний контент, що змінюється */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Base />} />
            <Route path="/home" element={<Home />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Base() {
  return  <div className="main-content">
          <p className="main-heading">Virtual laboratory</p>
          </div>;
}

function Modules() {
  return <h1>Modules Page</h1>;
}

function Join() {
  return <h1>Join Page</h1>;
}

function Login() {
  return <h1>Login Page</h1>;
}

export default Appp;
