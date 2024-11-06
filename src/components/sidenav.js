import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from React Router

function SideNav({ isOpen }) {
  return (
    <div id="mySidenav" className="sidenav" style={{ width: isOpen ? '12%' : '0' }}>
      <Link to="/"><i className="fas fa-home"></i> Home</Link>   {/* Link to Home */}
      <Link to="/starred"><i className="fas fa-file-alt"></i> Starred Documents</Link>   {/* Link to Browse */}
      <Link to="/videohub"><i className="fas fa-video"></i> VideoHub</Link>  {/* Placeholder for VideoHub */}
      <Link to="/editor"><i className="fas fa-edit"></i> Editor</Link>  {/* Placeholder for Editor */}
      <Link to="/upload"><i className="fas fa-upload"></i> Publish</Link>  {/* Link to Upload */}
      <Link to="/browse"><i className="fas fa-search"></i> Browse</Link>  {/* Link to Browse */}
      <Link to="/document"><i className="fas fa-search"></i> DocumentView</Link>  {/* Link to Browse */}
      <Link to="/documentedit"><i className="fas fa-search"></i> DocumentEdit</Link>  {/* Link to Browse */}
      <div>
        <a href="#">Contact Us</a>
        <p> &copy; LearnLink</p>
      </div>
    </div>
  );
}

export default SideNav;
