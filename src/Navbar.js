import React from 'react';
import './Navbar.css';
import logo from './images/logo_courses.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Courses" />
      </div>

      <ul className="nav-links">
        <li><a href="#home" className="nav-button">Home</a></li>
        <li><a href="#modules" className="nav-button">Modules</a></li>
        <li><a href="#join" className="join-button">Join</a></li>
        <li><a href="#login" className="login-button">Log In</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
