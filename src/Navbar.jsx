import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Navbar.css';
import logo from './images/logo_courses.png';
import userPic from './images/3d_avatar_8.png';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideButtons = location.pathname === "/login";

  // Check if there is a user in localStorage
  const user = localStorage.getItem('user');

  const handleSignOut = () => {
    localStorage.removeItem('user'); // Remove user data from local storage
    toast("You logged out!");
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/" className="nav-button">
          <img src={logo} alt="Courses" />
        </Link>
      </div>

        <ul className="nav-links">
    
          {user ? (
            // If there is a user, show Sign Out and User profile
            <>
              <li>
                <Link to="/home" className="nav-button">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/modules" className="nav-button">
                  Modules
                </Link>
              </li>
              <li>
                <Link to="/" onClick={handleSignOut} className="nav-button">
                  Sign Out
                </Link>
              </li>
              <li>
              <Link to="/userAccount" className="nav-button">
                  <img src={userPic} alt="User" className="user-profile-pic" />
                </Link>
              </li>
            </>
          ) : (
            // If there is no user, show Join and Login buttons
            <>
              <li>
                <Link to="/" className="nav-button">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/modules" className="nav-button">
                  Modules
                </Link>
              </li>
              <li>
                <Link to="/join" className="join-button">
                  Join
                </Link>
              </li>
              <li>
                <Link to="/login" className="login-button">
                  Log in
                </Link>
              </li>
            </>
          )}

        </ul>
    </nav>
  );
}

export default Navbar;
