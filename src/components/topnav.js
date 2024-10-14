import React from 'react';

function TopNav({ toggleNav }) {
  return (
    <div className="topnav">
      <span className="toggle-btn" onClick={toggleNav}>☰</span>
      <div className="brand">LearnLink</div>
      <div className="nav-right">
        <button className="login-btn">Sign In</button>
        <a href="profile.html"><div className="profile-img"></div></a>
      </div>
    </div>
  );
}

export default TopNav;
