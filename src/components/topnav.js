import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TopNav({ toggleNav }) {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');  // Check if user is logged in
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove auth token from localStorage
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <div className="topnav">
      <span className="toggle-btn" onClick={toggleNav}>☰</span>
      <Link to="/" className="brand">LearnLink</Link>
      <div className="nav-right">
        {/* Only show the "Sign In" link if the user is not authenticated */}
        {!isAuthenticated() ? (
          <>
            <Link to="/signin"><button className="login-btn">Sign In</button></Link>
            <Link to="/signup"><button className="signup-btn">Sign Up</button></Link>
          </>
        ) : (
          <>
            {/* If authenticated, show the "Log Out" button */}
            <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            <Link to="/profile"><div className="profile-img"></div></Link>
          </>
        )}
      </div>
    </div>
  );
}

export default TopNav;
