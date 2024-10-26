import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all existing components
import TopNav from './components/topnav';
import SideNav from './components/sidenav';
import Hero from './components/hero';
import Features from './components/features';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Upload from './components/Upload';
import Browse from './components/Browse';
import DocumentView from './components/DocumentView';
import VideoHub from './components/VideoHub';
import Editor from './components/Editor';

import './App.css';

function App() {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const HomePage = () => (
    <div className="main-content">
      <Hero />
      <Features />
    </div>
  );

  return (
    <Router>
      <div className="App">
        <TopNav toggleNav={toggleNav} />
        <SideNav isOpen={sideNavOpen} />
        <div className={`main-content ${sideNavOpen ? 'shifted' : ''}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/starred" element={<div>Starred Page Placeholder</div>} />
            <Route path="/videohub" element={<VideoHub />} />
            {/* Replace the placeholder with the Editor component */}
            <Route path="/editor" element={<Editor />} />
            <Route path="/document" element={<DocumentView />} />
            <Route path="*" element={<div>404 Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

