import React, { useState } from 'react';
import TopNav from './components/topnav';
import SideNav from './components/sidenav';
import Hero from './components/hero';
import Features from './components/feautures';
import './App.css';

function App() {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  // Toggle the sidebar open/close
  const toggleNav = () => {
    setSideNavOpen(prevState => !prevState);
  };

  return (
    <div className="App">
      <TopNav toggleNav={toggleNav} />
      <SideNav isOpen={sideNavOpen} />
      <div className={`main-content ${sideNavOpen ? 'shifted' : ''}`}>
        <Hero />
        <Features />
      </div>
    </div>
  );
}

export default App;
