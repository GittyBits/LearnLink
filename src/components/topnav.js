import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function TopNav({ toggleNav }) {
  return (
    <div className="topnav">
      <span className="toggle-btn" onClick={toggleNav}>☰</span>
      <Link to="/" className="brand">LearnLink</Link>
      <div className="nav-right">
        <Link to="/signin"><button className="login-btn">Sign In</button></Link>
        <Link to="/profile"><div className="profile-img"></div></Link>
      </div>
    </div>
  );
}

export default TopNav;
