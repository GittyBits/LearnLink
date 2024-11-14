import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; 

function SideNav({ isOpen, setIsOpen }) {
  const location = useLocation();

  // Close sidenav when navigating to Sign In or Sign Up
  useEffect(() => {
    if (location.pathname === "/signin" || location.pathname === "/signup") {
      setIsOpen(false);  // Close sidenav when on Sign In or Sign Up page
    }
  }, [location, setIsOpen]); 

  return (
    <div id="mySidenav" className="sidenav" style={{ width: isOpen ? '12%' : '0' }}>
      <Link to="/"><i className="fas fa-home"></i> Home</Link>   
      <Link to="/starred"><i className="fas fa-file-alt"></i> Starred Documents</Link>
      <Link to="/videohub"><i className="fas fa-video"></i> VideoHub</Link>
      <Link to="/upload"><i className="fas fa-upload"></i> Publish</Link>
      <Link to="/browse"><i className="fas fa-search"></i> Browse</Link>
      <Link to="/document"><i className="fas fa-search"></i> DocumentView</Link>
      <Link to="/documentedit"><i className="fas fa-search"></i> DocumentEdit</Link>
      <div>
        <a href="#">Contact Us</a>
        <p> &copy; LearnLink</p>
      </div>
    </div>
  );
}

export default SideNav;
