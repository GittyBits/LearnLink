import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TopNav from './components/topnav';
import SideNav from './components/sidenav';
import Hero from './components/hero';
import Features from './components/features';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Upload from './components/Upload';  // Import Upload Page Component
import Browse from './components/Browse';  // Import Browse Page Component
import './App.css';

function App() {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  // Toggle the sidebar open/close
  const toggleNav = () => {
    setSideNavOpen(prevState => !prevState);
  };

  // HomePage component to render Hero and Features
  const HomePage = () => (
    <div className="main-content">
      <Hero />
      <Features />
    </div>
  );

  return (
    <Router>
      <div className="App">
        {/* Top Navigation */}
        <TopNav toggleNav={toggleNav} />

        {/* Side Navigation */}
        <SideNav isOpen={sideNavOpen} />

        {/* Main Content Area */}
        <div className={`main-content ${sideNavOpen ? 'shifted' : ''}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />           {/* Home Route */}
            <Route path="/signin" element={<SignIn />} />       {/* Sign In Route */}
            <Route path="/SignUp" element={<SignUp />} />       {/* Sign In Route */}
            <Route path="/profile" element={<Profile />} />     {/* Profile Route */}
            <Route path="/upload" element={<Upload />} />       {/* Upload Page Route */}
            <Route path="/browse" element={<Browse />} />       {/* Browse Page Route */}
            <Route path="/starred" element={<div>Satrred Page Placeholder</div>}/>    
            <Route path="/videohub" element={<div>VideoHub Page Placeholder</div>} />
            <Route path="/editor" element={<div>Editor Page Placeholder</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
