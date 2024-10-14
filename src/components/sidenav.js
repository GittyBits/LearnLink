import React from 'react';

function SideNav({ isOpen }) {
  return (
    <div id="mySidenav" className="sidenav" style={{ width: isOpen ? '12%' : '0' }}>
      <a href="#"><i className="fas fa-home"></i> Home</a>
      <a href="#"><i className="fas fa-file-alt"></i> Shared Documents</a>
      <a href="#"><i className="fas fa-video"></i> VideoHub</a>
      <a href="#"><i className="fas fa-edit"></i> Editor</a>
      <a href="#"><i className="fas fa-upload"></i> Publish</a>
      <a href="#"><i className="fas fa-search"></i> Browse</a>
      <div>
        <a href="#">Contact Us</a>
        <p> &copy; LearnLink</p>
      </div>
    </div>
  );
}

export default SideNav;
