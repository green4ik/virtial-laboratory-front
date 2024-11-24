import React from 'react';
import { Link } from 'react-router-dom'; // Використовуємо Link
import './Navbar.css';
import logo from './images/logo_courses.png';
import userPic from './images/3d_avatar_8.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
      <Link to="/" className="nav-button"><img src={logo} alt="Courses" /></Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/home" className="nav-button">Home</Link></li>
        <li><Link to="/modules" className="nav-button">Modules</Link></li>
        <li><Link to="/" className="nav-button">Sign Out</Link></li>
        <li><Link to="/" className="nav-button"> <img src={userPic} alt="User" className="user-profile-pic" /></Link></li>
        {/* <li><Link to="/join" className="join-button">Join</Link></li> */}
        {/* <li><Link to="/login" className="login-button">Log In</Link></li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
